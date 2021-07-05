import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';
import Papa from 'papaparse';

interface Data {
  date: string;
  count_first_or_mid_general: number;
  count_second_or_full_general:number;
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
       date: '',
       count_first_or_mid_general: 0,
       count_second_or_full_general:0
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchVaccinationAsync = createAsyncThunk(
  'vaccination/fetchVaccination',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get(
        'https://vrs-data.cio.go.jp/vaccination/opendata/latest/summary_by_date.csv'
      )
      .then((response) => {
        console.log(response)
        const fetch_vaccination= Papa.parse(response.data, { 
          header: true,  
          dynamicTyping: true,
          encoding: 'Shift-JIS',
          skipEmptyLines: true,
        });
        // 取得したデータだけを取り出す
        const fetch_vaccination_data =
        fetch_vaccination.data as Array<Data>;
          console.log('ワクチン')
          console.log(fetch_vaccination_data)
        // 取り出したデータを格納する
        fetchData.data = fetch_vaccination_data;
      });
    return fetchData;
  }
);

export const vaccinationSlice = createSlice({
  name: 'vaccination',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchVaccinationAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchVaccinationAsync.fulfilled,
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
export const selectVaccination= (state: RootState) => state.vaccination;
export const selectVaccinationStatus= (state: RootState) => state.vaccination.status;

export default vaccinationSlice.reducer;
