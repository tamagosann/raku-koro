import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { TextInput } from "../index";

describe("TextInput test", () => {
  const mockProps = {
    fullWidth: true,
    label: "モック",
    multiline: false,
    required: true,
    rows: 1,
    type: "text",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
    defaultValue: '変更前'
  };

  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(<TextInput {...mockProps} />);
    const inputElement = screen.getByText(mockProps.label);
    expect(inputElement).toBeInTheDocument();
  });
});
