import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  current,
} from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import axios from 'axios';

interface Data {
都道府県番号: '',
都道府県名: '',
PCR検査陽性者数: '',
入院者数: '',
入院患者フェーズ: string,
入院患者受入即応病床数: '',
入院患者受入確保病床: '',
入院患者病床使用率: '',
入院率: '',
うち重症者数: '',
重症者フェーズ: '',
重症患者受入即応病床数: '',
重症患者受入確保病床数: '',
重症患者病床使用率: '',
宿泊療養者数: '',
宿泊療養フェーズ: '',
宿泊施設受入即応室数: '',
宿泊施設受入可能室数: string
宿泊療養施設居室使用率: '',
自宅療養者数: '',
うち社会福祉施設等療養者数: '',
療養先調整中の人数: '',
うち入院先調整中の人数: '',
更新日: '',
出典: string
}
export interface GraphState {
  data: Array<Data>;
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      都道府県番号: '',
      都道府県名: '',
      PCR検査陽性者数: '',
      入院者数: '',
      入院患者フェーズ: '',
      入院患者受入即応病床数: '',
      入院患者受入確保病床: '',
      入院患者病床使用率: '',
      入院率: '',
      うち重症者数: '',
      重症者フェーズ: '',
      重症患者受入即応病床数: '',
      重症患者受入確保病床数: '',
      重症患者病床使用率: '',
      宿泊療養者数: '',
      宿泊療養フェーズ: '',
      宿泊施設受入即応室数: '',
      宿泊施設受入可能室数: '',
      宿泊療養施設居室使用率: '',
      自宅療養者数: '',
      うち社会福祉施設等療養者数: '',
      療養先調整中の人数: '',
      うち入院先調整中の人数: '',
      更新日: '',
      出典: '',
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
        fetch_beb_occupansy_rate.data as Array<Data>;
        console.log('病床使用率')
        console.log(fetch_beb_occupansy_rate_data)
        // 取り出したデータを格納する
        fetchData.data = fetch_beb_occupansy_rate_data;
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
