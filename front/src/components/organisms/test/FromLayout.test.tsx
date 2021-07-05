import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { store } from "../../../app/store";
import { ThreadDataType } from "../../../features/thread/threadSlice";
import FormLayout from "../FormLayout";
import { Provider } from "react-redux";
describe("FormLayout", () => {
    //毎回レンダリング画面を空にする
    afterEach(() => {
        cleanup();
    })
}