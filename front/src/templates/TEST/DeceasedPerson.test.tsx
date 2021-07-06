import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { DeceasedPerson } from "../index";

describe("DeceasedPerson", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render DeceasedPerson", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DeceasedPerson />
        </BrowserRouter>
      </Provider>
    );
  });
});
