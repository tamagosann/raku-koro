import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import { login, fetchUserData, register, logout } from "./userAPI";
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
  { uid: string },
  any
>("user/fetchUserData", async ({ uid }) => {
  try {
    const userData = await fetchUserData(uid);
    if (userData) {
      return userData;
    } else {
      throw new Error("サーバーへの接続に失敗しました");
    }
  } catch (e) {
    alert(e.message);
    logout();
    return null;
  }
});

//新規登録
export const registerAsync = createAsyncThunk<
  UserDataType | null,
  RegisterType
>("user/register", async ({ username, email, password, prefecture }) => {
  try {
    let server = await axios.get("http://localhost:3001/users").then((res) => {
      return res;
    });
    if (server.data.status !== "OK") {
      throw new Error("サーバーへの接続に失敗しました");
    } else {
      const userData = await register(
        email!,
        password!,
        username!,
        prefecture!
      );
      if (userData) {
        return userData;
      } else {
        throw new Error("サーバーへの接続に失敗しました");
      }
    }
  } catch (e) {
    alert(e.message);
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
