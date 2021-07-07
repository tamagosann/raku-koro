import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import Papa from 'papaparse';

export interface Data {
  daily_infection: number;
  total_infection: number;
  daily_dead: number;
  total_dead: number;
  date: string;
  pref_code: number;
  pref_name: string;
}
export interface GraphState {
  data: Data[];
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      daily_infection: 0,
      total_infection: 0,
      daily_dead: 0,
      total_dead: 0,
      date: '',
      pref_code: 1,
      pref_name: '',
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchDailyInfectionAsync = createAsyncThunk<
  GraphState,
  void,
  { state: RootState }
>('infection/fetchInfection', async () => {
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
        transformHeader: function (header: string): string{
          if (header === '各地の感染者数_1日ごとの発表数') {
            return 'daily_infection';
          } else if (header === '各地の感染者数_累計') {
            return 'total_infection';
          } else if (header === '各地の死者数_1日ごとの発表数') {
            return 'daily_dead';
          } else if (header === '各地の死者数_累計') {
            return 'total_dead';
          } else if (header === '日付') {
            return 'date';
          } else if (header === '都道府県コード') {
            return 'pref_code';
          } else if (header === '都道府県名') {
            return 'pref_name';
          } else {
            return 'default';
          }
        },
      });
      // 取得したデータだけを取り出す
      const fetch_daily_infection_data = fetch_daily_infection.data as Data[];
      // 取り出したデータを格納する
      fetchData.data = fetch_daily_infection_data;
    });
  return fetchData;
});

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
        const clonedState: GraphState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchDailyInfectionAsync.fulfilled,
        (state, action: PayloadAction<GraphState>) => {
          const clonedState: GraphState = { ...state };
          clonedState.status = 'success';
          clonedState.data = action.payload.data;
          return clonedState;
        }
      );
  },
});

//useAppSelectorで呼び出したいデーターをここで定義
export const selectDailyInfection = (state: RootState) => state.dailyInfection;
export const selectDailyInfectionStatus = (state: RootState) => state.dailyInfection.status;

export default dailyInfectionSlice.reducer;
