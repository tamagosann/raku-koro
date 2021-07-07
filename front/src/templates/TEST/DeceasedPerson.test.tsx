import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import DeceasedPerson from "../DeceasedPerson";
import userEvent from "@testing-library/user-event";

describe("DeceasedPerson", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DeceasedPerson />
        </BrowserRouter>
      </Provider>
    );
  });

  test("toggle graph", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DeceasedPerson />
        </BrowserRouter>
      </Provider>
    );
    //日別にグラフを変える
    const DailyToggleButton = screen.getByRole("button", { name: "日別" });
    userEvent.click(DailyToggleButton);
    const dailyTitle = screen.getByText("死亡者数推移（日別）");
    expect(dailyTitle).toBeInTheDocument();

    //累計に戻す
    const TotalToggleButton = screen.getByRole('button', { name: "累計" })
    userEvent.click(TotalToggleButton);
    const totalTitle = screen.getByText("死亡者数推移（累計）");
    expect(totalTitle).toBeInTheDocument();
  });
});

//これで95パーセント