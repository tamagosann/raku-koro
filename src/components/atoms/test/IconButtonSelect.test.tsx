import { render, screen, cleanup } from "@testing-library/react";
import { IconButtonSelect } from "../IconButtonSelect";

describe("IconButtonSelect", () => {
  afterEach(() => {
    cleanup();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Menu"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Admin"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Search"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Arrow"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"List"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"CircleGrph"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"LineGrph1"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"LineGrph2"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"LineGrph3"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"BarGrph1"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"BarGrph2"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"NewAccount"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"About"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Asign"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Login"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Logout"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Cart"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"Edit"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
  test("表示されていることを確認する", () => {
    render(<IconButtonSelect icon={"History"} color={"primary"} />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });
});
