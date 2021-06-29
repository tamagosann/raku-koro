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
  各地の感染者数_1日ごとの発表数: number;
  各地の感染者数_累計: number;
  各地の死者数_1日ごとの発表数: number;
  各地の死者数_累計: number;
  日付: string;
  都道府県コード: number;
  都道府県名: string;
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      各地の感染者数_1日ごとの発表数: 0,
      各地の感染者数_累計: 0,
      各地の死者数_1日ごとの発表数: 0,
      各地の死者数_累計: 0,
      日付: '',
      都道府県コード: 0,
      都道府県名: '',
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchDailyInfectionAsync = createAsyncThunk(
  'infection/fetchInfection',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get(
        'https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv'
      )
      .then((response) => {
        const fetch_daily_infection = Papa.parse(response.data, {
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
        const fetch_daily_infection_data =
          fetch_daily_infection.data as Array<Data>;
        // 取り出したデータを格納する
        fetchData.data = fetch_daily_infection_data;
      });
    return fetchData;
  }
);

export const dailyInfectionSlice = createSlice({
  name: 'dailyInfection',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchDailyInfectionAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchDailyInfectionAsync.fulfilled,
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
export const selectDailyInfection = (state: RootState) => state.dailyInfection;

export default dailyInfectionSlice.reducer;
