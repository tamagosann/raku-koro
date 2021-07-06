import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UserNameInput } from "../UserNameInput";
import { useForm, FieldValues } from "react-hook-form";

const mockFunc = jest.fn();

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: { username: "テスト" },
  });
  return (
    <form onSubmit={handleSubmit(mockFunc)}>
      <UserNameInput control={control} error={props.error} />
    </form>
  );
};

describe("UserNameInput", () => {
  afterEach(() => {
    cleanup();
  });
  test("文字が入力されていない場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "required" }} />);
    expect(
      screen.getByText("ユーザー名を入力してください")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("文字に空白が含まれている場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "pattern" }} />);
    expect(screen.getByText("空白を含めないでください")).toBeInTheDocument();
    // screen.debug();
  });
  test("インプットが正常に動いているかどうか", () => {
    render(<MockFormCmponent error={{}} />);
    userEvent.type(screen.getByRole("textbox"), "ユーザー");
    expect(screen.getByRole("textbox")).toHaveValue("テストユーザー");
  });
});
