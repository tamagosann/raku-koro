import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchThread,
  updateThread,
  createThread,
  deleteThread,
} from "./threadAPI";

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
}

//初期値
const initialState: ThreadState = {
  value: null,
  status: "loading",
};

//掲示板全ての取得処理
export const fetchThreadAsync = createAsyncThunk<ThreadDataType[] | null>(
  "thread/fetchdata",
  async () => {
    try {
      const thread = await fetchThread();
      if (thread) {
        return thread;
      } else {
        throw new Error("サーバーへの接続に失敗しました");
      }
    } catch (e) {
      alert(e.message);
      return null;
    }
  }
);

//新規投稿処理
export const createThreadAsync = createAsyncThunk<
  ThreadDataType | null,
  ThreadDataType
>("thread/create", async (data) => {
  try {
    const threadData = await createThread(data);
    if (threadData) {
      return threadData;
    } else {
      throw new Error("サーバーへの接続に失敗しました");
    }
  } catch (e) {
    alert(e.message);
    return null;
  }
});

//投稿内容更新処理
export const updateThreadAsync = createAsyncThunk<
  ThreadDataType | null,
  ThreadDataType
>("thread/update", async (data) => {
  try {
    const threadData = await updateThread(data);
    if (threadData) {
      return threadData;
    } else {
      throw new Error("サーバーへの接続に失敗しました");
    }
  } catch (e) {
    alert(e.message);
    return null;
  }
});

//投稿内容削除処理
export const deleteThreadAsync = createAsyncThunk<string | null, string>(
  "thread/delete",
  async (_id) => {
    try {
      const threadData = await deleteThread(_id);
      if (threadData?._id === _id) {
        console.log(threadData);
        return _id;
      } else {
        throw new Error("サーバーへの接続に失敗しました");
      }
    } catch (e) {
      alert(e.message);
      return null;
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
  },
  //　非同期処理を行うreducerはこっち　fulfilledを使う
  extraReducers: (builder) => {
    //取得
    builder.addCase(fetchThreadAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      state.value = action.payload;
    });
    //追加
    builder.addCase(createThreadAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (state.value && action.payload) {
        let newState = [...state.value, action.payload];
        state.value = newState;
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
    //削除
    builder.addCase(deleteThreadAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(deleteThreadAsync.fulfilled, (state, action) => {
      state.status = "idle";
      if (state.value && action.payload) {
        let newState = state.value.filter((val) => val._id !== action.payload);
        state.value = newState;
      }
    });
  },
});

export const { unSetThread } = threadSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectThread = (state: RootState) => state.thread.value;
export const selectThreadStatus = (state: RootState) => state.thread.status;

export default threadSlice.reducer;
