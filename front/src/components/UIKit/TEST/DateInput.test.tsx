import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import DateInput, { DateInputProps } from "../DateInput";

describe("TextInput test", () => {
  const mockProps: DateInputProps = {
    fullWidth: true,
    label: "日付",
    required: true,
    value: "2020-08-08",
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => {},
  };

  afterEach(() => {
    cleanup();
  });

  test("render", () => {
    render(<DateInput {...mockProps} />);
    const inputElement = screen.getByText(mockProps.label);
    expect(inputElement).toBeInTheDocument();
  });

});
