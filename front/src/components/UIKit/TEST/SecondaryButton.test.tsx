import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { SecondaryButton } from "../../atoms/index";

describe("SecondaryButton test", () => {
  const sampleText = "戻る";
  const MockFunc = jest.fn();

  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    const component = render(
      <SecondaryButton label={sampleText} onClick={MockFunc} />
    );
    const linkElement = screen.getByText(sampleText);
    expect(linkElement).toBeInTheDocument();
  });

  test("click:SecondaryButton", () => {
    render(<SecondaryButton label={sampleText} onClick={MockFunc} />);
    const button = screen.getByText(sampleText);
    fireEvent.click(button);
    expect(MockFunc.mock.calls.length).toBe(1);
  });
});
