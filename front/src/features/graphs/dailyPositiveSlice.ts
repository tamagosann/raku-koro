import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import Papa from 'papaparse';

interface Data {
  daily_pcr: number;
  daily_positive: number;
  date: string;
  daily_recovery: number;
  daily_hospitalization: number;
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      daily_pcr: 0,
      daily_positive: 0,
      date: '',
      daily_recovery: 0,
      daily_hospitalization: 0,
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchDailyPositiveAsync = createAsyncThunk(
  'positive/fetchPositive',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get('https://www.stopcovid19.jp/data/mhlw_go_jp/opendata/covid19.csv')
      .then((response) => {
        const fetch_daily_positive = Papa.parse(response.data, {
          // csvヘッダーをプロパティに変更
          header: true,
          // 文字列を数値に変換
          dynamicTyping: true,
          // 文字化け防止
          encoding: 'Shift-JIS',
          // エラーを取り除く
          skipEmptyLines: true,
          transformHeader: function (header: string): string {
            if (header === 'PCR 検査実施件数') {
              return 'daily_pcr';
            } else if (header === 'PCR 検査陽性者数') {
              return 'daily_positive';
            } else if (header === '日付') {
              return 'date';
            } else if (header === '退院、療養解除となった者') {
              return 'daily_recovery';
            } else if (header === '入院治療を要する者') {
              return 'daily_hospitalization';
            } else {
              return 'default';
            }
          },
        });
        // 取得したデータだけを取り出す
        const fetch_daily_positive_data =
          fetch_daily_positive.data as Array<Data>;
        // 取り出したデータを格納する
        fetchData.data = fetch_daily_positive_data;
      });
    return fetchData;
  }
);

export const dailyPositiveSlice = createSlice({
  name: 'dailyPositive',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchDailyPositiveAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchDailyPositiveAsync.fulfilled,
        (state, action: PayloadAction<GraphState>) => {
          const clonedState: GraphState = { ...state };
          clonedState.status = 'success';
          clonedState.data = action.payload.data as Array<Data>;
          return clonedState;
        }
      );
  },
});

// export const { increment, decrement, incrementByAmount } = graph1Slice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectDailyPositive = (state: RootState) => state.dailyPositive;

export default dailyPositiveSlice.reducer;
