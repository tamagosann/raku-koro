import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { Threads } from "../index";
import userEvent from "@testing-library/user-event";

describe("Threads", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Threads />
        </BrowserRouter>
      </Provider>
    );
    //selectを開く
    const selectButton = screen.getByRole("button", { name: "都道府県 全て" });
    userEvent.click(selectButton);
    //optionを選択
    const prefectureButton = screen.getByRole("option", { name: "北海道" });
    userEvent.click(prefectureButton);
  });
  test("select Prefecture", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Threads />
        </BrowserRouter>
      </Provider>
    );
    //selectを開く
    const selectButton = screen.getByRole("button", { name: "都道府県 全て" });
    userEvent.click(selectButton);
    //optionを選択
    const prefectureButton = screen.getByRole("option", { name: "北海道" });
    userEvent.click(prefectureButton);
  });
});

//stmts94.29パーセント
