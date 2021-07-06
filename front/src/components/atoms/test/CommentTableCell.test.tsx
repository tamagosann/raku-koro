import { cleanup, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CommentTableCell from "../CommentTableCell";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

const mockFunc = jest.fn();

const commetListTestPropsArray: [string, number, any, null] = [
  "ストリングです",
  0,
  <IconButton onClick={(e) => mockFunc()} data-testid="icon-button">
    <DeleteIcon />
  </IconButton>,
  null,
];

describe("CommentList", () => {
  //毎回レンダリング画面を空にする
  afterEach(() => {
     cleanup();
  });

  test(`render`, () => {
    commetListTestPropsArray.forEach((commentListTestProps) => {
      render(<CommentTableCell value={commentListTestProps} />);
    });
  });

  test(`click when IconButton`, () => {
    render(<CommentTableCell value={commetListTestPropsArray[2]} />);
    const iconButton = screen.getByTestId('icon-button');
    userEvent.click(iconButton)
    userEvent.click(iconButton)
    userEvent.click(iconButton)
    expect(mockFunc.mock.calls.length).toBe(3)
  });
});
