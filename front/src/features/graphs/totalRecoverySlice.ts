import {createAsyncThunk,createSlice,PayloadAction} from '@reduxjs/toolkit'
import { RootState } from '../../app/store';
import axios from 'axios';
import Papa from 'papaparse';

interface Data {
  日付: string;
  退院療養解除となった者: number;
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      日付: '',
      退院療養解除となった者: 0 
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchTotalRecoveryAsync = createAsyncThunk(
  'infection/fetchInfection',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get(
        'https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv'
      )
      .then((response) => {
        const fetch_Total_Recovery = Papa.parse(response.data, {
          // csvヘッダーをプロパティに変更
          header: true,
          // 文字列を数値に変換
          dynamicTyping: true,
          // 文字化け防止
          encoding: 'Shift-JIS',
          // エラーを取り除く
          skipEmptyLines: true,
        });
        // 取得したデータだけを取り出す
        const fetch_Total_Recovery_data =
        fetch_Total_Recovery.data as Array<Data>;
        console.log("退院")
        console.log(fetch_Total_Recovery_data)
        // 取り出したデータを格納する
        fetchData.data = fetch_Total_Recovery_data;
      });
    return fetchData;
  }
);

export const totalRecoverySlice = createSlice({
  name: 'totalRecovery',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchTotalRecoveryAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchTotalRecoveryAsync.fulfilled,
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
export const selectTotalRecovery = (state: RootState) => state.totalRecovery;

export default totalRecoverySlice.reducer;
