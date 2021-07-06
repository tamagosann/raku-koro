import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../../app/store";
import CommentList, { CommentListProps } from "../CommentList";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const commentListMockProps: CommentListProps = {
  label: "テスト様掲示板",
  rows: [
    {
      _id: "aaa",
      uid: "0001",
      date: "2020-02-02 20:12:12",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "最初は2ページ目にあるはず",
    },
    {
      _id: "bbb",
      uid: "0001",
      date: "2020-02-02 20:12:13",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "テストで御座候",
    },
    {
      _id: "ccc",
      uid: "0001",
      date: "2020-02-02 20:12:13",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "テストで御座候",
    },
    {
      _id: "ddd",
      uid: "0001",
      date: "2020-02-02 20:12:15",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "テストで御座候",
    },
    {
      _id: "eee",
      uid: "0001",
      date: "2020-02-02 20:12:16",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "テストで御座候",
    },
    {
      _id: "fff",
      uid: "0001",
      date: "2020-02-02 20:12:17",
      username: "哀川",
      prefecture: "神奈川県",
      comment: "最初は1ページ目にあるはず",
    },
  ],
};

describe("CommentList", () => {
  afterEach(() => {
    cleanup();
  });
  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentList {...commentListMockProps} />
        </BrowserRouter>
      </Provider>
    );
  });

  test("ページネーションの動作", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentList {...commentListMockProps} />
        </BrowserRouter>
      </Provider>
    );
    const pageNationButtonToNext = screen.getByRole("button", {
      name: "Next page",
    });
    userEvent.click(pageNationButtonToNext);
    const page2Comment = screen.getByText("最初は2ページ目にあるはず");
    expect(page2Comment).toBeInTheDocument();
  });
  test("ページネーションの表示数切り替えの動作確認", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentList {...commentListMockProps} />
        </BrowserRouter>
      </Provider>
    );
    const pageNationNumSelectButton = screen.getByRole("button", {
      name: "Rows per page: 5",
    });
    userEvent.click(pageNationNumSelectButton);

    const pageNationNum = screen.getByRole("option", { name: "10" });
    userEvent.click(pageNationNum);

    const page2Comment = screen.getByText("最初は2ページ目にあるはず");
    expect(page2Comment).toBeInTheDocument();
  });
  test("ソート機能の動作確認", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CommentList {...commentListMockProps} />
        </BrowserRouter>
      </Provider>
    );

    const sortButton = screen.getByRole("button", {
      name: "投稿日 sorted descending",
    });
    userEvent.click(sortButton);

    const page2Comment = screen.getByText("最初は2ページ目にあるはず");
    expect(page2Comment).toBeInTheDocument();
  });
});
