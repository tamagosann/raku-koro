import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface UserState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: UserState = {
  value: 0,
  status: 'idle',
};

//非同期処理はこの形で処理　<>内の型は
export const incrementAsync = createAsyncThunk<any,any,{ state: RootState }>(
  'user/fetchCount',
  async (amount: number) => {
    const response = "dammy"
    // The value we return becomes the `fulfilled` action payload
    return response
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // 非同期処理を行わないreducerはこっち
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
  //　非同期処理を行うreducerはこっち　fulfilledを使う
  extraReducers: (builder) => {
    builder
      .addCase(incrementAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.value += action.payload;
      });
  },
});

export const { increment, decrement, incrementByAmount } = userSlice.actions;

//useAppSelectorで呼び出したいデーターをここで定義
export const selectCount = (state: RootState) => state.counter.value;

export default userSlice.reducer;

