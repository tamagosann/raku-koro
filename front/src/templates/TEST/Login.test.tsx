import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { Provider,useSelector } from "react-redux";
import { useAppSelector } from "../../app/hooks";
import { store } from "../../app/store";
import { BrowserRouter } from "react-router-dom";
import { Login } from "../";

describe("Login", () => {
  jest.mock("react-redux");
  const useSelectorMock = useSelector as jest.Mock<number>;
  beforeEach(() => {
    useSelectorMock.mockReturnValue(10);
  });

  it("render", () => {
    // const mockHistoryPush = jest.fn();
    // jest.mock("react-router-dom", () => ({
    //   useHistory: () => ({ push: mockHistoryPush }),
    // }));
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Login />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByTestId("error"))
    screen.debug(screen.getByTestId("error"))
    const routingButton = screen.getByRole("button", { name: "ログイン" });
    // fireEvent.click(routingButton);
    // screen.debug(routingButton);
    // expect(mockHistoryPush).toBeCalled();
  });
});

//useEffect問題、react-hook-form動かない問題
//stmtsは85パーセント
