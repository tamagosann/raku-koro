import { render, screen } from "@testing-library/react";
import UserInfoForm from "../UserInfoForm";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

const testUser = {
  _id: "sssss",
  uid: "aaaaaa",
  username: "テスト太郎",
  prefecture: "大阪府",
};

const testErrorMsg = "テストエラーメッセージ";

describe("UserInfoForm", () => {
  test("コンポーネントの表示", () => {
    render(
      <Provider store={store}>
        <UserInfoForm user={testUser} errorMsg={testErrorMsg} />
      </Provider>
    );
    screen.debug();
    expect(screen.getByText("テストエラーメッセージ")).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toHaveValue("テスト太郎")
    expect(screen.getAllByRole("button")[0].textContent).toBe("大阪府")
  });
  test("props:userがnullの時", () => {
    render(
      <Provider store={store}>
        <UserInfoForm user={null} errorMsg={testErrorMsg} />
      </Provider>
    );
  });
  test("props:errorMsgがnullの時", () => {
    render(
      <Provider store={store}>
        <UserInfoForm user={testUser} errorMsg={null} />
      </Provider>
    );
  });
});
