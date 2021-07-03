import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../../app/store";
import {
  login,
  fetchUserData,
  register,
  logout,
  updateUserData,
} from "./userAPI";
import { SERVER_URI, USERS_TABLE_URI } from "../../apis/mongoDB";
export interface UserDataType {
  _id?: string;
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
    let server = await axios
      .get(`${SERVER_URI + USERS_TABLE_URI}`)
      .then((res) => {
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
      if (userData !== "userexist" && userData !== null) {
        return userData;
      } else if (userData === "userexist") {
        throw new Error("すでに登録があります");
      } else {
        throw new Error("登録データがありません");
      }
    }
  } catch (e) {
    alert(e.message);
    return null;
  }
});

//ユーザー情報更新処理
export const updateUserAsync = createAsyncThunk<
  UserDataType | null,
  UserDataType
>("user/update", async ({ _id, uid, username, prefecture }) => {
  try {
    const userData = await updateUserData(_id!, uid!, username!, prefecture!);
    if (userData) {
      return userData;
    } else {
      throw new Error("サーバーへの接続に失敗しました");
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
      state.status = "loading";
      console.log(state.value);
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
      console.log(state.value);
    });
    builder.addCase(updateUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
  },
});

export const { unSetUser } = userSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectUser = (state: RootState) => state.user.value;
export const selectUid = (state: RootState) => state.user.value?.uid;
export const selectUserStatus = (state: RootState) => state.user.status;

export default userSlice.reducer;
