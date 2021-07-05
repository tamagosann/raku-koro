import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { EmailInput } from "../EmailInput";
import { useForm, FieldValues } from "react-hook-form";

const mockFunc = jest.fn();

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: { email: "aaa@aaa.co" },
  });
  return (
    <form onSubmit={handleSubmit(mockFunc)}>
      <EmailInput control={control} error={props.error} />
    </form>
  );
};

describe("EmailInput", () => {
  afterEach(() => {
    cleanup();
  });
  test("文字が入力されていない場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "required" }} />);
    expect(
      screen.getByText("メールアドレスを入力してください")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("メールの形式と違った場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "pattern" }} />);
    expect(screen.getByText("形式が違います")).toBeInTheDocument();
    // screen.debug();
});
test("インプットが正常に動いているかどうか", () => {
    render(<MockFormCmponent error={{}} />);
    userEvent.type(screen.getByRole("textbox"), ".jp");
    expect(screen.getByRole("textbox")).toHaveValue("aaa@aaa.co.jp");
    // screen.debug();
  });
});
