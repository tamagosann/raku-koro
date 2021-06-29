import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import axios from "axios";
import { auth } from "../../firebase";

export interface UserDatatype {
  uid: string;
  username: string;
  prefecture: string;
}
export interface UserState {
  value: UserDatatype | null;
  status: "idle" | "loading" | "failed";
}

const initialState: UserState = {
  value: null,
  status: "idle",
};

//ログイン
export const loginAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    auth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res);
      return res;
    });
  }
);

//ログアウト
export const logoutAsync = createAsyncThunk(
  "user/login",
  async ({ email, password }: { email: string; password: string }) => {
    auth.signInWithEmailAndPassword(email, password).then((res) => {
      console.log(res);
      return res;
    });
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  //非同期なしReducer
  reducers: {},
  //　非同期ありReducer
  extraReducers: (builder) => {
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    builder.addCase(logoutAsync.fulfilled, (state) => {
      state.status = "idle";
      state.value = initialState.value;
    });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;
