import React from "react";
import { cleanup, render ,screen} from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { PrefectureDailyInfention } from "../index";

describe("PrefectureDairyInfection", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <PrefectureDailyInfention />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getAllByRole('heading')[0].textContent).toBe("Loading...");
    screen.debug();
  });
});

//useEffectとloading問題
//Stmtsは73.33
