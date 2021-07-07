import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import InfectedPerson from "../InfectedPerson";
import userEvent from "@testing-library/user-event";

describe("DeceasedPerson", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("renders learn react link", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <InfectedPerson />
        </BrowserRouter>
      </Provider>
    );
  });

  test("toggle graph", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <InfectedPerson />
        </BrowserRouter>
      </Provider>
    );
    //日別にグラフを変える

    const DailyToggleButton = screen.getByRole("button", { name: "日別" });
    userEvent.click(DailyToggleButton);
    const dailyTitle = screen.getByText("感染者数推移（日別）");
    expect(dailyTitle).toBeInTheDocument();

    //累計に戻す
    const TotalToggleButton = screen.getByRole("button", { name: "累計" });
    userEvent.click(TotalToggleButton);
    const totalTitle = screen.getByText("感染者数推移（累計）");
    expect(totalTitle).toBeInTheDocument();
  });
});

//これで95パーセント