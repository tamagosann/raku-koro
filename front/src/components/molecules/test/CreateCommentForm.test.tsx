import { render, screen } from "@testing-library/react";
import { CreateCommentForm } from "..";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const testUser = {
  _id: "sssss",
  uid: "aaaaaa",
  username: "テスト太郎",
  prefecture: "大阪府",
};

const testErrorMsg = "テストエラー";

describe("CreateCommentForm", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <CreateCommentForm user={testUser} errorMsg={testErrorMsg} />
      </Provider>
    );
  });
  test("必要なタグが表示されていることを確認する", () => {
    expect(screen.getAllByRole("textbox")).toHaveLength(2);
    expect(screen.getAllByRole("button")[1].textContent).toBe("投稿");
  });
});
