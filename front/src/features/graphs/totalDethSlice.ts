import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";

export interface DethData {
  date: string;
  ndeaths: number;
}
export interface GraphState {
  data: DethData[];
  status: 'success' | 'loading' | 'failed';
}

const initialState: GraphState = {
  data: [
    {
      date: "",
      ndeaths: 0,
    },
  ],
  status: "loading",
};

//非同期処理はこの形で処理<>内の型は
export const fetchTotalDethAsync = createAsyncThunk<
  GraphState,
  void,
  { state: RootState }
>("totalDeth/fetchTotalDeth", async () => {
  let fetchData: GraphState = { ...initialState };
  await axios
    .get("https://data.corona.go.jp/converted-json/covid19japan-ndeaths.json")
    .then((response) => {
      const fetch_total_deth = response
        // 取得したデータだけを取り出す
      const fetch_total_deth_data =
      fetch_total_deth.data;
      // 取り出したデータを格納する
      fetchData.data = fetch_total_deth_data;
      // console.log(fetchData.data);
    });
  return fetchData;
  }
);

export const totalDethSlice = createSlice({
  name: "totalDeth",
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {},
  //非同期処理を行うreducerはこっちfulfilledを使う
  extraReducers: (builder) => {
    builder
      // loadingを実現するためのstatusを「loading」変更
      .addCase(fetchTotalDethAsync.pending, (state) => {
        const clonedState: GraphState = { ...state };
        clonedState.status = "loading";
        return clonedState;
      })
      // 完了を表現するためのstatusを「success」変更
      .addCase(
        fetchTotalDethAsync.fulfilled,
        (state, action: PayloadAction<GraphState>) => {
          const clonedState: GraphState = { ...state };
          clonedState.status = 'success';
          clonedState.data = action.payload.data;
          return clonedState;
        }
      );
  },
});

// export const { increment, decrement, incrementByAmount } = graph1Slice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectTotalDeth = (state: RootState) => state.totalDeth;

export default totalDethSlice.reducer;
