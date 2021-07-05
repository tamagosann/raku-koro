import React, { FC } from "react";
import { ExtendButtonBase, TableRow } from "@material-ui/core";
import { deleteThreadAsync, ThreadDataType } from "../../features/thread/threadSlice";
import { useHistory } from "react-router-dom";
import { useCallback } from "react";
import CommentTableCell from "../atoms/CommentTableCell";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { selectUid } from "../../features/user/userSlice";
import { IconButton } from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete'

export type CommentListRowType = {
  row: ThreadDataType;
};

const CommentListRow: FC<CommentListRowType> = ({ row }) => {
  const history = useHistory();
  const uid = useAppSelector(selectUid);
  const dispatch = useAppDispatch()

  //rowがクリックされた時の処理
  //ここに編集ページへのルーティングを書く
  const handleClick = useCallback(
    (_id: string): void => {
      history.push(`/threads/${_id}`);
    },
    [history]
  );

  const deleteThreadClicked = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, _id: string): void => {
      e.stopPropagation();
      if (!window.confirm("本当に消去しますか？")) {
        return;
      }
      dispatch(deleteThreadAsync(_id));
    },
    []
  );


  //valueのところでにanyを使っている理由：IconButtonの型が上手く噛み合わなかったから
  return (
    <TableRow
      hover
      onClick={() => handleClick(row._id)}
      tabIndex={-1}
    >
      <CommentTableCell value={row.date} />
      <CommentTableCell value={row.prefecture} />
      <CommentTableCell value={row.username} />
      <CommentTableCell value={row.comment} />
      <CommentTableCell
        value={
          uid === row.uid ? (
            <IconButton onClick={(e) => deleteThreadClicked(e, row._id)} >
              <DeleteIcon />
            </IconButton>
          ) as any : null
        }
      />
    </TableRow>
  );
};

export default CommentListRow;
