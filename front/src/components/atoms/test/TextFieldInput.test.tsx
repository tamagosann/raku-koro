import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { TextFieldInput } from "../TextFieldInput";
import { useForm, FieldValues } from "react-hook-form";

const mockFunc = jest.fn();

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: { comment: "テスト投稿" },
  });
  return (
    <form onSubmit={handleSubmit(mockFunc)}>
      <TextFieldInput control={control} error={props.error} />
    </form>
  );
};

describe("TextFieldInput", () => {
  afterEach(() => {
    cleanup();
  });
  test("文字が入力されていない場合", () => {
    render(<MockFormCmponent error={{ type: "required" }} />);
    expect(screen.getByText("コメントを入力してください")).toBeInTheDocument();
    // screen.debug();
  });
  test("文字が50文字以上の場合", () => {
    render(<MockFormCmponent error={{ type: "maxLength" }} />);
    expect(
      screen.getByText("コメントは50字以内で入力してください")
    ).toBeInTheDocument();
    // screen.debug();
  });
  test("インプットが正常に動いているかどうか", () => {
    render(<MockFormCmponent error={{}} />);
    userEvent.type(screen.getByRole("textbox"), "ああああ");
    expect(screen.getByRole("textbox")).toHaveValue("テスト投稿ああああ");
  });
});
