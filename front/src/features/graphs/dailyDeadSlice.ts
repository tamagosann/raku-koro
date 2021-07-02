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
  export const fetchDailyDeadAsync = createAsyncThunk(
    'Dead/fetchDead',
    async () => {
      let fetchData: GraphState = { ...initialState };
      await axios
        .get(
          'https://www3.nhk.or.jp/n-data/opendata/coronavirus/nhk_news_covid19_prefectures_daily_data.csv'
        )
        .then((response) => {
          const fetch_daily_dead = Papa.parse(response.data, {
            // csvヘッダーをプロパティに変更
            header: true,
            // 文字列を数値に変換
            dynamicTyping: true,
            // 文字化け防止
            encoding: 'Shift-JIS',
            // エラーを取り除く
            skipEmptyLines: true,
            transformHeader: function (header:string): string {
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
          const fetch_daily_dead_data =
            fetch_daily_dead.data as Array<Data>;
          // 取り出したデータを格納する
          fetchData.data = fetch_daily_dead_data;
        });
      return fetchData;
    }
  );
  
  export const dailyDeadSlice = createSlice({
    name: 'dailyDead',
    initialState,
    // 非同期処理を行わないreducerはこっち
    reducers: {},
    //非同期処理を行うreducerはこっちfulfilledを使う
    extraReducers: (builder) => {
      builder
        // loadingを実現するためのstatusを「loading」変更
        .addCase(fetchDailyDeadAsync.pending, (state) => {
          const clonedState = { ...state };
          clonedState.status = 'loading';
          return clonedState;
        })
        // 完了を表現するためのstatusを「success」変更
        .addCase(
          fetchDailyDeadAsync.fulfilled,
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
  export const selectDailyDead = (state: RootState) => state.dailyDead;
  export const selectDailyDeadStatus = (state: RootState) => state.dailyDead.status;
  
  export default dailyDeadSlice.reducer;
  