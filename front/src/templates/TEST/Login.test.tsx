import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider, useSelector } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../";

describe("Login", () => {
  it("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
  });
});

//useEffect問題、react-hook-form動かない問題
//stmtsは85パーセント
