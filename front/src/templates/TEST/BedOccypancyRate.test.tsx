import React from "react";
import { cleanup, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import BedOccupancyRate from "../BedOccupancyRate";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import { GraphState } from "../../features/graphs/bedOccupancyRateSlice";

const mockState: GraphState = {
  data: [
    {
      pcr_positive: 0,
      injured: 0,
      secure_bed: 0,
      use_bed_rate: "",
      inpatient: 0,
      source: "",
      update: "",
      home_recuperator: 0,
      prefecture: "",
      pref_code: 0,
      injured_bed: 0,
      use_injured_bed_rate: "",
    },
  ],
  status: "success",
};

describe("BedOccypancyRate", () => {
  let container: any;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
    container = null;
  });

  test("render", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <BedOccupancyRate />
        </BrowserRouter>
      </Provider>
    );
  });

  test("useEffect", () => {
    act(() => {
      ReactDOM.render(
        <Provider store={store}>
          <BrowserRouter>
            <BedOccupancyRate />
            <p>aaaa</p>
          </BrowserRouter>
        </Provider>,
        container
      );
    });
    // jest.mock("../../app/hooks", () => ({
    //   useAppSelector: jest.fn().mockReturnValue(mockState),
    // }));

    // expect(screen.findByText("都道府県別病床使用率")).toBeInTheDocument();

    // jest.mock("react-redux", () => ({
    //   useSelector: jest.fn().mockImplementation((selector) => selector()),
    // }));

    screen.debug();
  });
});

//useEffect問題
//stmts66.67パーセント
