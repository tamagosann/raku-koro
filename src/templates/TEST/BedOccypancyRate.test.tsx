import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { BedOccupancyRate } from "../index";

describe("BedOccupancyRate", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render BedOccupancyRate", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BedOccupancyRate />
        </BrowserRouter>
      </Provider>
    );
  });
});
