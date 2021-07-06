import { render, screen } from "@testing-library/react";
import { LoadingPage } from "../";

describe("LoadinPage", () => {
  beforeEach(() => {
    render(<LoadingPage />);
  });
  test("表示されていることを確認する", () => {
    expect(screen.getByRole("img")).toBeInTheDocument();
    expect(screen.getByRole("heading").textContent).toBe("now Loading ....");
  });
});
