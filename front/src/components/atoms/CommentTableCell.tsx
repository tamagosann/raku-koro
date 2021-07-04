import { FC } from "react";
import { TableCell } from "@material-ui/core";
import { ExtendButtonBase } from "@material-ui/core";
import { IconButtonTypeMap } from "@material-ui/core";

export type CommentTableCellProps = {
  value: string | number | ExtendButtonBase<IconButtonTypeMap<{}, "button">> | null
}

const CommentTableCell: FC<CommentTableCellProps> = ({value}) => {
  return <TableCell align="right">{value}</TableCell>;
};

export default CommentTableCell;
