import React from "react";
import { cleanup, render } from "@testing-library/react";
import Inner from "../Inner";


describe("DeceasedPerson", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(
      <Inner>
        <p>テスト</p>
      </Inner>
    );
  });
});
