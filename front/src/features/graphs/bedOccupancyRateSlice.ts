import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

interface Data {
  pcr_positive: number
  injured: number
  secure_bed: number
  use_bed_rate: string
  inpatient: number
  source: string
  update: string
  home_recuperator: number
  prefecture: string
  pref_code: number
  injured_bed: number
  use_injured_bed_rate: string
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      pcr_positive: 0,
  injured: 0,
  secure_bed: 0,
  use_bed_rate: '',
  inpatient: 0,
  source: '',
  update: '',
  home_recuperator: 0,
  prefecture: '',
  pref_code: 0,
  injured_bed: 0,
  use_injured_bed_rate: ''
    },
  ],
  status: 'loading',
};

//非同期処理はこの形で処理<>内の型は
export const fetchBedOccupancyRateAsync = createAsyncThunk(
  'bedOccupancyRate/fetchBedOccupancyRate',
  async () => {
    let fetchData: GraphState = { ...initialState };
    await axios
      .get(
        'https://www.stopcovid19.jp/data/covid19japan_beds/latest.json'
      )
      .then((response) => {
        const fetch_beb_occupansy_rate = response
          // 取得したデータだけを取り出す
        const fetch_beb_occupansy_rate_data =
        fetch_beb_occupansy_rate.data;
        console.log('病床使用率')
        console.log(fetch_beb_occupansy_rate_data)

        const tranceData = []
        for (let i = 0; i < fetch_beb_occupansy_rate_data.length; i++) {
          tranceData.push({
            pcr_positive: Number(fetch_beb_occupansy_rate_data[i]["PCR検査陽性者数"]),
            injured: Number(fetch_beb_occupansy_rate_data[i]["うち重症者数"]),
            secure_bed: Number(fetch_beb_occupansy_rate_data[i]["入院患者受入確保病床"]),
            use_bed_rate: fetch_beb_occupansy_rate_data[i]["入院患者病床使用率"],
            inpatient: Number(fetch_beb_occupansy_rate_data[i]["入院者数"]),
            source: fetch_beb_occupansy_rate_data[i]["出典"],
            update: fetch_beb_occupansy_rate_data[i]["更新日"],
            home_recuperator: Number(fetch_beb_occupansy_rate_data[i]["自宅療養者数"]),
            prefecture: fetch_beb_occupansy_rate_data[i]["都道府県名"],
            pref_code: Number(fetch_beb_occupansy_rate_data[i]["都道府県番号"]),
            injured_bed: Number(fetch_beb_occupansy_rate_data[i]["重症患者受入確保病床数"]),
            use_injured_bed_rate: fetch_beb_occupansy_rate_data[i]["重症患者病床使用率"]
          });

          
          
}

        // 取り出したデータを格納する
        fetchData.data = tranceData;
      });
    return fetchData;
  }
);

export const bedOccupancyRateSlice = createSlice({
  name: 'bedOccupancyRate',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchBedOccupancyRateAsync.pending, (state) => {
        const clonedState = { ...state };
        clonedState.status = 'loading';
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchBedOccupancyRateAsync.fulfilled,
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
export const selectBedOccupancyRate = (state: RootState) => state.bedOccupancyRate;

export default bedOccupancyRateSlice.reducer;
