import { render, screen } from "@testing-library/react";
import { Auth } from "..";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

describe("Auth", () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Auth>
            <div>テスト</div>
          </Auth>
        </Router>
      </Provider>
    );
  });
  test("表示されていることを確認する", () => {
    expect(screen.getByRole("generic")).toBeInTheDocument();
  });
});
