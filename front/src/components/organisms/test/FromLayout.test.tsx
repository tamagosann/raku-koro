import { cleanup, render } from "@testing-library/react";
import { store } from "../../../app/store";
import FormLayout from "../FormLayout";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

describe("FormLayout", () => {
  afterEach(() => {
    cleanup();
  });
  test("指定したコンポーネントが表示されていることを確認する", () => {
    render(
      <Provider store={store}>
        <Router>
          <FormLayout type={"userinfo"} />
        </Router>
      </Provider>
    );
  });
  test("指定したコンポーネントが表示されていることを確認する", () => {
    render(
      <Provider store={store}>
        <Router>
          <FormLayout type={"threadinfo"} id={"sssss"}/>
        </Router>
      </Provider>
    );
  });
  test("指定したコンポーネントが表示されていることを確認する", () => {
    render(
      <Provider store={store}>
        <Router>
          <FormLayout type={"createcomment"} />
        </Router>
      </Provider>
    );
  });
});
