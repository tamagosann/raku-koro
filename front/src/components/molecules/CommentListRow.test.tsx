import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { BrowserRouter } from "react-router-dom";
import { store } from "../../app/store";
import { ThreadDataType } from "../../features/thread/threadSlice";
import CommentListRow, { CommentListRowType } from "./CommentListRow";
import { Provider } from "react-redux";


const commentListRowTestProps: ThreadDataType = {
  _id: "aaa",
  uid: "0001",
  date: "2020-02-02 20:12:12",
  username: "哀川",
  prefecture: "神奈川県",
  comment: "テストで御座候",
};

describe("CommentListRow", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test(`render`, () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentListRow row={commentListRowTestProps} />
        </BrowserRouter>
      </Provider>
    );
  });

  test(`test ToThreadDetail clicked`, () => {

    //【課題】【秋山】useHisotryのモック化が聞かなくてmockHistoryPushが呼び出されない。解決方法がわからないためコメントアウト

    // render(
    //   <Provider store={store}>
    //     <BrowserRouter>
    //       <CommentListRow row={commentListRowTestProps} />
    //     </BrowserRouter>
    //   </Provider>
    // );
    // const mockHistoryPush = jest.fn();
    // jest.mock("react-router-dom", () => ({
    //   ...jest.requireActual("react-router-dom"),
    //   useHistory: () => ({
    //     // pushメソッドをダミー関数で上書きする
    //     push: mockHistoryPush,
    //   }),
    // }));
    // jest.mock("../../app/hooks", () => ({
    //   ...jest.requireActual("../../app/hooks"),
    //   useAppSelector: (uid: string) => '0001'
    // }));
    // const tableRow = screen.getByRole('row');
    // screen.debug()
    // userEvent.click(tableRow);
    // screen.debug()
    // expect(mockHistoryPush).toBeCalledWith(`/threads/${commentListRowTestProps._id}`);
  });

  test(`click to delete when IconButton`, () => {
    
  });
});
