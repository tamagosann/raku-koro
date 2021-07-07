import reducer, { createThreadAsync, deleteThreadAsync, fetchThreadAsync, ThreadDataType, ThreadState, updateThreadAsync } from '../threadSlice';

describe('Reducer Redux Toolkit', () => {
  describe('Thread', () => {
    const initialState: ThreadState = {
      value: [],
      status: "idle",
      errorMsg: null,
    };

    const ThreadDataMock: ThreadDataType = {
      _id: "aaa",
      date: "2020-02-02",
      uid: "0001",
      username: "相方",
      prefecture: "神奈川",
      comment: "テストでござる",
    }

    const threadMock = [
      ThreadDataMock,ThreadDataMock,ThreadDataMock
    ]

    it('fetch（Rejected）', () => {
      const action = {
        type: fetchThreadAsync.rejected,
        payload: { errorMsg: "エラーです" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: "エラーが発生しました。もう一度お試しください。",
      });
    });
    it('fetch（fullfilled）', () => {
      const action = {
        type: fetchThreadAsync.fulfilled,
        payload: threadMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: threadMock,
        status: 'idle',
        errorMsg: null,
      });
    });
    it('fetch（pending）', () => {
      const action = {
        type: fetchThreadAsync.pending,
        payload: {},
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({...initialState, status: 'loading'});
    });
    //create
    it('create（pending）', () => {
      const action = {
        type: createThreadAsync.pending,
        payload: {},
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({...initialState, status: 'idle'});
    });
    it('create（fullfilled）', () => {
      const action = {
        type: createThreadAsync.fulfilled,
        payload: ThreadDataMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [ThreadDataMock],
        status: 'idle',
        errorMsg: null,
      });
    });
    it('create（Rejected）', () => {
      const action = {
        type: createThreadAsync.rejected,
        payload: { errorMsg: "エラーです" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: "エラーが発生しました。もう一度お試しください。",
      });
    });
    //update
    it('update（pending）', () => {
      const action = {
        type: updateThreadAsync.pending,
        payload: {},
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({...initialState, status: 'loading'});
    });
    it('update（fullfilled）', () => {
      const action = {
        type: updateThreadAsync.fulfilled,
        payload: ThreadDataMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: null,
      });
    });
    it('update（Rejected）', () => {
      const action = {
        type: updateThreadAsync.rejected,
        payload: { errorMsg: "エラーです" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: "エラーが発生しました。もう一度お試しください。",
      });
    });
    //delete
    it('delete（pending）', () => {
      const action = {
        type: deleteThreadAsync.pending,
        payload: {},
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({...initialState, status: 'idle'});
    });
    it('delete（fullfilled）', () => {
      const action = {
        type: deleteThreadAsync.fulfilled,
        payload: ThreadDataMock,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: null,
      });
    });
    it('delete（Rejected）', () => {
      const action = {
        type: deleteThreadAsync.rejected,
        payload: { errorMsg: "エラーです" },
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: [],
        status: 'idle',
        errorMsg: "エラーが発生しました。もう一度お試しください。",
      });
    });
  });
  

});
