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
  日付: string;
  単日PCR検査陽性者数: number;
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      日付: '',
      単日PCR検査陽性者数: 0,
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchDailyDethAsync = createAsyncThunk(
  'deilyCorona/fetchDeilyCorona',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get(
        'https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv'
      )
      .then((response) => {
        console.log(response)
        const fetch_daily_deth = Papa.parse(response.data, { 
          header: true,  
          dynamicTyping: true,
          encoding: 'Shift-JIS',
          skipEmptyLines: true,
        });
        // 取得したデータだけを取り出す
        const fetch_daily_deth_data =
          fetch_daily_deth.data as Array<Data>;
          console.log('日毎死亡者')
          console.log(fetch_daily_deth_data)
        // 取り出したデータを格納する
        fetchData.data = fetch_daily_deth_data;
      });
    return fetchData;
  }
);

export const dailyDethSlice = createSlice({
  name: 'dailyDeth',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchDailyDethAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchDailyDethAsync.fulfilled,
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
export const selectDailyDeth= (state: RootState) => state.dailyDeth;

export default dailyDethSlice.reducer;