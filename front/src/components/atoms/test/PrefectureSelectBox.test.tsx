import {
  cleanup,
  fireEvent,
  render,
  screen,
  within,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { PrefectureSelectBox } from "../PrefectureSelectBox";
import { useForm, FieldValues } from "react-hook-form";

const mockFunc = jest.fn();

const MockFormCmponent = (props: any) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues: { prefecture: "東京都" },
  });
  return (
    <form onSubmit={handleSubmit(mockFunc)}>
      <PrefectureSelectBox control={control} error={props.error} />
    </form>
  );
};

describe("PrefectureSelectBox", () => {
  afterEach(() => {
    cleanup();
  });
  test("文字が入力されていない場合正しくエラーが表示されているか", () => {
    render(<MockFormCmponent error={{ type: "required" }} />);
    expect(screen.getByText("都道府県を選択してください")).toBeInTheDocument();
    // screen.debug();
  });

  test("インプットが正常に動いているかどうか", () => {
    render(<MockFormCmponent error={{}} />);
    const selectNode = screen.getByRole("button").nextElementSibling;
    fireEvent.change(selectNode, { target: { value: "北海道" } });
    expect(selectNode).toHaveValue("北海道");
    // screen.debug();
  });
});
