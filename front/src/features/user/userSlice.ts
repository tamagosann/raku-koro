import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  login,
  fetchUserData,
  register,
  logout,
  updateUserData,
  connectionTest,
  registerUserData,
} from "./userAPI";
import { translateErrorMsg } from "../../common/functions";

export interface UserDataType {
  _id?: string;
  uid: string | null;
  username: string | null;
  prefecture: string | null;
}
export interface RegisterType {
  username?: string;
  email?: string;
  password?: string;
  prefecture?: string;
}
export interface UserState {
  value: UserDataType | null;
  status: "idle" | "loading" | "failed";
  errorMsg: string | null;
}
interface ThunkConfig {
  state: RootState;
  rejectValue: {
    errorMsg: string;
  };
}
//初期値
const initialState: UserState = {
  value: null,
  status: "idle",
  errorMsg: null,
};

//ログイン
export const loginAsync = createAsyncThunk<
  undefined,
  { email: string; password: string },
  ThunkConfig
>("user/login", async ({ email, password }, { rejectWithValue, dispatch }) => {
  try {
    await login(email, password);
    dispatch(unSetErrorMsg());
  } catch (e) {
    if (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
});

//DBからユーザー情報の取得
export const fetchUserDataAsync = createAsyncThunk<
  UserDataType,
  { uid: string },
  ThunkConfig
>("user/fetchUserData", async ({ uid }, { rejectWithValue, dispatch }) => {
  try {
    let userData = await fetchUserData(uid);
    dispatch(unSetErrorMsg());
    return userData;
  } catch (e) {
    logout();
    return rejectWithValue({ errorMsg: e.message });
  }
});

//新規登録
export const registerAsync = createAsyncThunk<
  UserDataType,
  RegisterType,
  ThunkConfig
>(
  "user/register",
  async (
    { username, email, password, prefecture },
    { rejectWithValue, dispatch }
  ) => {
    try {
      await connectionTest();
      let uid = await register(email!, password!);
      let userData = await registerUserData(uid, username!, prefecture!);
      dispatch(unSetErrorMsg());
      return userData;
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
);

//ユーザー情報更新処理
export const updateUserAsync = createAsyncThunk<
  UserDataType,
  UserDataType,
  ThunkConfig
>(
  "user/update",
  async ({ _id, uid, username, prefecture }, { rejectWithValue, dispatch }) => {
    try {
      let userData = await updateUserData(_id!, uid!, username!, prefecture!);
      dispatch(unSetErrorMsg());
      return userData;
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  //非同期なしReducer
  reducers: {
    unSetUser: (state) => {
      return (state = initialState);
    },
    unSetErrorMsg: (state) => {
      state.errorMsg = null;
      return state;
    },
  },
  //　非同期ありReducer
  extraReducers: (builder) => {
    //ログイン
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAsync.fulfilled, (state) => {
      state.status = "loading";
      state.errorMsg = null;
    });
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //ユーザーデータ取得
    builder.addCase(fetchUserDataAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchUserDataAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.errorMsg = null;
      state.value = action.payload;
    });
    builder.addCase(fetchUserDataAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //新規登録
    builder.addCase(registerAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(registerAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    builder.addCase(registerAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //ユーザー情報更新
    builder.addCase(updateUserAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateUserAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    builder.addCase(updateUserAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
  },
});

export const { unSetUser, unSetErrorMsg } = userSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectUser = (state: RootState) => state.user.value;
export const selectUid = (state: RootState) => state.user.value?.uid;
export const selectUserStatus = (state: RootState) => state.user.status;
export const selectUserErrorMsg = (state: RootState) => state.user.errorMsg;

export default userSlice.reducer;
