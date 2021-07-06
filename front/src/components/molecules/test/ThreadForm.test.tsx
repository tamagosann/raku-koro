import { render, screen } from "@testing-library/react";
import ThreadForm from "../ThreadForm";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { datetimeToString } from "../../../common/functions";

const testId = "sssss";
const testUser = {
  _id: "sssss",
  uid: "aaaaaa",
  username: "テスト太郎",
  prefecture: "大阪府",
};
const testThread = [
  {
    _id: "sssss",
    date: datetimeToString(new Date()),
    uid: "aaaaaa",
    username: "テスト太郎",
    prefecture: "大阪府",
    comment: "テストコメントです",
  },
  {
    _id: "xxxxxx",
    date: datetimeToString(new Date()),
    uid: "bbbbbbb",
    username: "テスト二郎",
    prefecture: "北海道",
    comment: "テストコメント２です",
  },
];

const testErrorMsg = "テストエラー";

describe("ThreadForm", () => {
  test("コンポーネント表示テスト", () => {
    render(
      <Provider store={store}>
        <Router>
          <ThreadForm
            user={testUser}
            thread={testThread}
            errorMsg={testErrorMsg}
            threadId={testId}
          />
        </Router>
      </Provider>
    );
    expect(screen.getByText("テストエラー")).toBeInTheDocument();
    expect(screen.getAllByRole("textbox")[0]).toHaveValue("テスト太郎");
    expect(screen.getAllByRole("textbox")[1]).toHaveValue("テストコメントです");
    expect(screen.getAllByRole("button")[0].textContent).toBe("大阪府");
  });
  test("ユーザーがnullの表示テスト", () => {
    render(
      <Provider store={store}>
        <Router>
          <ThreadForm
            user={null}
            thread={testThread}
            errorMsg={testErrorMsg}
            threadId={testId}
          />
        </Router>
      </Provider>
    );
  });
});
