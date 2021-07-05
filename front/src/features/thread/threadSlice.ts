import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchThread,
  updateThread,
  createThread,
  deleteThread,
} from "./threadAPI";
import { translateErrorMsg } from "../../common/functions";

export interface ThreadDataType {
  _id: string;
  date: string;
  uid: string | null;
  username: string | null;
  prefecture: string | null;
  comment: string | null;
}
export interface ThreadState {
  value: ThreadDataType[] | null;
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
const initialState: ThreadState = {
  value: [],
  status: "idle",
  errorMsg: null,
};

//掲示板全ての取得処理
export const fetchThreadAsync = createAsyncThunk<
  ThreadDataType[],
  {},
  ThunkConfig
>("thread/fetchdata", async ({}, { rejectWithValue, dispatch }) => {
  try {
    const thread = await fetchThread();
    dispatch(unSetThreadErrorMsg());
    return thread;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//新規投稿処理
export const createThreadAsync = createAsyncThunk<
  ThreadDataType,
  ThreadDataType,
  ThunkConfig
>("thread/create", async (data, { rejectWithValue, dispatch }) => {
  try {
    const threadData = await createThread(data);
    dispatch(unSetThreadErrorMsg());
    return threadData;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//投稿内容更新処理
export const updateThreadAsync = createAsyncThunk<
  ThreadDataType,
  ThreadDataType,
  ThunkConfig
>("thread/update", async (data, { rejectWithValue, dispatch }) => {
  try {
    const threadData = await updateThread(data);
    dispatch(unSetThreadErrorMsg());
    return threadData;
  } catch (e) {
    return rejectWithValue({ errorMsg: e.message });
  }
});

//投稿内容削除処理
export const deleteThreadAsync = createAsyncThunk<string, string, ThunkConfig>(
  "thread/delete",
  async (_id, { rejectWithValue, dispatch }) => {
    try {
      await deleteThread(_id);
      dispatch(unSetThreadErrorMsg());
      return _id;
    } catch (e) {
      return rejectWithValue({ errorMsg: e.message });
    }
  }
);

export const threadSlice = createSlice({
  name: "thread",
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {
    unSetThread: (state) => {
      return (state = initialState);
    },
    unSetThreadErrorMsg: (state) => {
      state.errorMsg = null;
      return state;
    },
  },
  //　非同期処理を行うreducerはこっち　fulfilledを使う
  extraReducers: (builder) => {
    //掲示板データ取得
    builder.addCase(fetchThreadAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    builder.addCase(fetchThreadAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //追加
    builder.addCase(createThreadAsync.pending, (state) => {
      //statusをidleにすることで都道府県のフィルタが解除されるのを防ぐ
      state.status = "idle";
    });
    builder.addCase(createThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (state.value && action.payload) {
        let newState = [...state.value, action.payload];
        state.value = newState;
      }
    });
    builder.addCase(createThreadAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //更新
    builder.addCase(updateThreadAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(updateThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (state.value && action.payload) {
        let threadId = action.payload._id;
        let newState = state.value.map((val) => {
          if (val._id === threadId) {
            return action.payload!;
          }
          return val!;
        });
        state.value = newState;
      }
    });
    builder.addCase(updateThreadAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
    //削除
    builder.addCase(deleteThreadAsync.pending, (state) => {
      //statusをidleにすることで都道府県のフィルタが解除されるのを防ぐ
      state.status = "idle";
    });
    builder.addCase(deleteThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (state.value && action.payload) {
        let newState = state.value.filter((val) => val._id !== action.payload);
        state.value = newState;
      }
    });
    builder.addCase(deleteThreadAsync.rejected, (state, action) => {
      state.status = "idle";
      if (action.payload) {
        state.errorMsg = translateErrorMsg(action.payload.errorMsg);
      }
    });
  },
});

export const { unSetThread, unSetThreadErrorMsg } = threadSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectThread = (state: RootState) => state.thread.value;
export const selectThreadStatus = (state: RootState) => state.thread.status;
export const selectThreadErrorMsg = (state: RootState) => state.thread.errorMsg;

export default threadSlice.reducer;
