import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { Header } from "../index";
import userEvent from "@testing-library/user-event";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

describe("Header", () => {
  const testUser = {
    _id: "sssss",
    uid: "aaaaaa",
    username: "テスト太郎",
    prefecture: "大阪府",
  };
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("表示テスト(ログインあり)", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={testUser} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText(/テスト太郎/)).toBeInTheDocument();
    expect(screen.getAllByRole("button")).toHaveLength(7);
  });
  test("表示テスト(ログインなし)", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={null} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(8);
  });
  test("タイトルロゴの動作確認", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={testUser} />
        </BrowserRouter>
      </Provider>
    );
    let link = screen.getByRole("img").parentNode;
    expect(fireEvent.click(link)).toBe(true);
  });
  test("Aboutリンクの動作確認", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={null} />
        </BrowserRouter>
      </Provider>
    );
    let About = screen.getByText("About");
    expect(fireEvent.click(About)).toBe(true);
  });
  test("ユーザー名リンクの動作確認", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={testUser} />
        </BrowserRouter>
      </Provider>
    );
    let username = screen.getByText(/テスト太郎/);
    expect(fireEvent.click(username)).toBe(true);
  });
  //要修正
  test("ボタンたちの動作確認(ログインなし)", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={null} />
        </BrowserRouter>
      </Provider>
    );
    let button = screen.getAllByRole("button")[0];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[1];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[2];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[3];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[4];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[5];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[6];
    expect(fireEvent.click(button)).toBe(true);
  });
  test("ボタンたちの動作確認(ログインあり)", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Header userData={testUser} />
        </BrowserRouter>
      </Provider>
    );
    let button = screen.getAllByRole("button")[0];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[1];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[2];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[3];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[4];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[5];
    expect(fireEvent.click(button)).toBe(true);
    button = screen.getAllByRole("button")[6];
    expect(fireEvent.click(button)).toBe(true);
  });
});
