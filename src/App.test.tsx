import React from "react";
import { cleanup, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { BrowserRouter } from "react-router-dom"; 
import App from "./App";


describe("App.tsx", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
     cleanup();
  });
  
  test("render App.tsx", () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    );
  });

});
