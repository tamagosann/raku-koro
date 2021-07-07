import { fireEvent, render, screen } from "@testing-library/react";
import ClosableDrawer from "../ClosableDrawer";
import { store } from "../../../app/store";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import userEvent from "@testing-library/user-event";

const mocFn = jest.fn();
const testUser = {
  _id: "sssss",
  uid: "aaaaaa",
  username: "テスト太郎",
  prefecture: "大阪府",
};
const testHeaders = {
  logins: [
    {
      text: "ログアウト",
      icon: "Logout",
      link: "",
    },
  ],
  logouts: [
    { text: "ログイン", icon: "Login", link: "/login" },
    {
      text: "新規登録",
      icon: "NewAccount",
      link: "/register",
    },
  ],
  graphs: [
    {
      text: "全国",
      icon: "LineGrph1",
      link: "/nationwide",
    },
    {
      text: "都道府県",
      icon: "LineGrph1",
      link: "/every-prefecure",
    },
    {
      text: "病床使用率",
      icon: "CircleGrph",
      link: "/deb-usage-rate",
    },
    {
      text: "PCR検査",
      icon: "BarGrph1",
      link: "/pcr-rate",
    },
    {
      text: "掲示板",
      icon: "Asign",
      link: "/thread",
    },
  ],
};

describe("ClosableDrawer", () => {
  beforeEach(() => {});
  test("ユーザーがログインしている場合", () => {
    render(
      <Provider store={store}>
        <Router>
          <ClosableDrawer
            toggle={true}
            setToggle={mocFn()}
            headers={testHeaders}
            userData={testUser}
          />
        </Router>
      </Provider>
    );
    // screen.debug();
  });
  test("ユーザーがログアウトの場合", () => {
    render(
      <Provider store={store}>
        <Router>
          <ClosableDrawer
            toggle={false}
            setToggle={mocFn()}
            headers={testHeaders}
            userData={null}
          />
        </Router>
      </Provider>
    );
    // screen.debug()
  });
  test("リンク表示", () => {
    render(
      <Provider store={store}>
        <Router>
          <ClosableDrawer
            toggle={true}
            setToggle={mocFn()}
            headers={testHeaders}
            userData={null}
          />
        </Router>
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(16);
    let button =
      screen.getAllByRole("button")[0].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[2].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[4].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[6].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[8].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[10].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[12].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[14].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
  });
  test("リンク表示", () => {
    render(
      <Provider store={store}>
        <Router>
          <ClosableDrawer
            toggle={true}
            setToggle={mocFn()}
            headers={testHeaders}
            userData={testUser}
          />
        </Router>
      </Provider>
    );
    expect(screen.getAllByRole("button")).toHaveLength(14);
    let button =
      screen.getAllByRole("button")[0].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[2].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[4].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[6].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[8].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[10].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
    button =
      screen.getAllByRole("button")[12].firstElementChild?.firstElementChild;
    expect(fireEvent.click(button)).toBe(true);
  });
  test("トグルボタン動作確認", () => {
    const mocFn = jest.fn();
    render(
      <Provider store={store}>
        <Router>
          <ClosableDrawer
            toggle={true}
            setToggle={mocFn}
            headers={testHeaders}
            userData={testUser}
          />
        </Router>
      </Provider>
    );
    let drawer = screen.getByRole("presentation").firstElementChild;
    userEvent.click(drawer);
    expect(mocFn).toHaveBeenCalled();
  });
});
