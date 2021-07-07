import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { Register } from "../index";
import userEvent from "@testing-library/user-event";
import { act } from "react-test-renderer";

describe("Register", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });
  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
  });
  test("submit", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Register />
        </BrowserRouter>
      </Provider>
    );
  });
});

//useEffect問題
//Stmts85.71パーセント
