import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

export interface Data {
  date: string;
  npatients: number;
  adpatients: number;
}
export interface GraphState {
  data: Data[];
  status: "success" | "loading" | "failed";
}

const initialState: GraphState = {
  data: [
    {
      date: "",
      npatients: 0,
      adpatients: 0,
    },
  ],
  status: "loading",
};

//非同期処理はこの形で処理<>内の型は
export const fetchTotalCoronaAsync = createAsyncThunk<
  GraphState,
  void,
  { state: RootState }
>("totalCorona/fetchTotalCorona", async () => {
  let fetchData: GraphState = { ...initialState };
  await axios
    .get("https://data.corona.go.jp/converted-json/covid19japan-npatients.json")
    .then((response) => {
      const fetch_total_corona = response;
      // 取得したデータだけを取り出す
      const fetch_total_corona_data = fetch_total_corona.data;
      // 取り出したデータを格納する
      fetchData.data = fetch_total_corona_data;
    });
    return fetchData;
  }
);

export const totalCoronaSlice = createSlice({
  name: "totalCorona",
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchTotalCoronaAsync.pending, (state) => {
        const clonedState: GraphState = { ...state };
        clonedState.status = "loading";
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchTotalCoronaAsync.fulfilled,
        (state, action: PayloadAction<GraphState>) => {
          const clonedState: GraphState = { ...state };
          clonedState.status = "success";
          clonedState.data = action.payload.data as Array<Data>;
          return clonedState;
        }
      );
  },
});

// export const { increment, decrement, incrementByAmount } = graph1Slice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectTotalCorona = (state: RootState) => state.totalCorona;
export const selectTotalCoronaStatus = (state: RootState) => state.totalCorona.status;

export default totalCoronaSlice.reducer;
