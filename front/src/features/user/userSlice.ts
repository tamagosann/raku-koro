import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { login, fetchUserData, register } from "./userAPI";
export interface UserDataType {
  uid: string | null;
  username: string | null;
  prefecture: string | null;
}
export interface UserState {
  value: UserDataType | null;
  status: "idle" | "loading" | "failed";
}
export interface RegisterType {
  username?: string;
  email?: string;
  password?: string;
  prefecture?: string;
}

//初期値
const initialState: UserState = {
  value: null,
  status: "idle",
};

//ログイン
export const fetchUserDataAsync = createAsyncThunk<
  UserDataType | null,
  { uid: string }
>("user/fetchUserData", async ({ uid }) => {
  const userData = await fetchUserData(uid);
  if (userData) {
    return userData;
  } else {
    return null;
  }
});

//新規登録
export const registerAsync = createAsyncThunk<
  UserDataType | null,
  RegisterType
>("user/register", async ({ username, email, password, prefecture }) => {
  const userData = await register(email!, password!, username!, prefecture!);
  if (userData) {
    return userData;
  } else {
    return null;
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  //非同期なしReducer
  reducers: {
    unSetUser: (state) => {
      return (state = initialState);
    },
  },
  //　非同期ありReducer
  extraReducers: (builder) => {
    builder.addCase(fetchUserDataAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserDataAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    builder.addCase(registerAsync.pending, (state) => {
      console.log("status pending");
      state.status = "loading";
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
  },
});

export const { unSetUser } = userSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectUser = (state: RootState) => state.user.value;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
