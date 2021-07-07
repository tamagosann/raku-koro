import reducer, {
  userSlice,
  loginAsync,
  fetchUserDataAsync,
  registerAsync,
  updateUserAsync,
  UserState,
  unSetUser,
  unSetUserErrorMsg,
} from "../userSlice";

describe("userSlice(extraReducer)", () => {
  const initialState: UserState = {
    value: null,
    status: "loading",
    errorMsg: null,
  };
  const SuccessData: UserState = {
    value: {
      _id: "1111",
      uid: "ssss",
      username: "テスト太郎",
      prefecture: "大阪府",
    },
    status: "idle",
    errorMsg: null,
  };
  const RejectData: UserState = {
    value: null,
    status: "idle",
    errorMsg: "Network",
  };
  const LoadingData: UserState = {
    value: null,
    status: "loading",
    errorMsg: null,
  };
  describe("loginAsync", () => {
    it("成功時", () => {
      const action = {
        type: loginAsync.fulfilled,
        payload: SuccessData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "loading",
        errorMsg: null,
      });
    });
    it("処理中", () => {
      const action = {
        type: loginAsync.pending,
        payload: LoadingData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "loading",
        errorMsg: null,
      });
    });
    it("失敗時", () => {
      const action = {
        type: loginAsync.rejected,
        payload: RejectData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "idle",
        errorMsg: "ネットワークエラー：管理者にお問い合わせください",
      });
    });
  });
  describe("registerAsync", () => {
    it("成功時", () => {
      const action = {
        type: registerAsync.fulfilled,
        payload: SuccessData.value,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: {
          _id: "1111",
          uid: "ssss",
          username: "テスト太郎",
          prefecture: "大阪府",
        },
        status: "idle",
        errorMsg: null,
      });
    });
    it("処理中", () => {
      const action = {
        type: registerAsync.pending,
        payload: LoadingData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "loading",
        errorMsg: null,
      });
    });
    it("失敗時", () => {
      const action = {
        type: registerAsync.rejected,
        payload: RejectData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "idle",
        errorMsg: "ネットワークエラー：管理者にお問い合わせください",
      });
    });
  });
  describe("fetchUserDataAsync", () => {
    it("成功時", () => {
      const action = {
        type: fetchUserDataAsync.fulfilled,
        payload: SuccessData.value,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: {
          _id: "1111",
          uid: "ssss",
          username: "テスト太郎",
          prefecture: "大阪府",
        },
        status: "idle",
        errorMsg: null,
      });
    });
    it("処理中", () => {
      const action = {
        type: fetchUserDataAsync.pending,
        payload: LoadingData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "loading",
        errorMsg: null,
      });
    });
    it("失敗時", () => {
      const action = {
        type: fetchUserDataAsync.rejected,
        payload: RejectData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "idle",
        errorMsg: "ネットワークエラー：管理者にお問い合わせください",
      });
    });
  });
  describe("updateUserAsync", () => {
    it("成功時", () => {
      const action = {
        type: updateUserAsync.fulfilled,
        payload: SuccessData.value,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: {
          _id: "1111",
          uid: "ssss",
          username: "テスト太郎",
          prefecture: "大阪府",
        },
        status: "idle",
        errorMsg: null,
      });
    });
    it("処理中", () => {
      const action = {
        type: updateUserAsync.pending,
        payload: LoadingData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "loading",
        errorMsg: null,
      });
    });
    it("失敗時", () => {
      const action = {
        type: updateUserAsync.rejected,
        payload: RejectData,
      };
      const state = reducer(initialState, action);
      expect(state).toEqual({
        value: null,
        status: "idle",
        errorMsg: "ネットワークエラー：管理者にお問い合わせください",
      });
    });
  });
});

describe("userSlice(普通のReducer)", () => {
  const initialState: UserState = {
    value: null,
    status: "idle",
    errorMsg: null,
  };
  it("unSetUser", () => {
    const action = { type: unSetUser.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      value: null,
      status: "idle",
      errorMsg: null,
    });
  });
  it("unSetUserErrorMsg", () => {
    const action = { type: unSetUserErrorMsg.type };
    const state = reducer(initialState, action);
    expect(state).toEqual({
      value: null,
      status: "idle",
      errorMsg: null,
    });
  });
});
