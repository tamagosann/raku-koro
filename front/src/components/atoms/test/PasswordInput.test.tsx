import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PasswordInput } from "../PasswordInput";
import { useForm, FieldValues } from "react-hook-form";

const mockFunc = jest.fn();

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: { password: "ssssssss" },
  });
  return (
    <form onSubmit={handleSubmit(mockFunc)}>
      <PasswordInput control={control} error={props.error} />
    </form>
  );
};

describe("PasswordInput", () => {
  afterEach(() => {
    cleanup();
  });
  test("文字が入力されていない場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "required" }} />);
    expect(
      screen.getByText("パスワードを入力してください")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("文字の長さが8以下の場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "minLength" }} />);
    expect(
      screen.getByText("パスワードは8文字以上10文字以内で入力して下さい")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("文字の長さが10を超える場合場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "maxLength" }} />);
    expect(
      screen.getByText("パスワードは8文字以上10文字以内で入力して下さい")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("使用可能もじ以外を指定した場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "pattern" }} />);
    expect(
      screen.getByText(
        "パスワードは半角英数字と記号「!@#$%^&*()_+-=[]{};:?,.」のみ使用可能です"
      )
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("インプットが正常に動いているかどうか", () => {
    render(<MockFormCmponent error={{}} />);
    let input = screen.getByText("パスワード").nextElementSibling?.firstChild;
    userEvent.type(input, "aa");
    expect(input).toHaveValue("ssssssssaa");
  });
});
