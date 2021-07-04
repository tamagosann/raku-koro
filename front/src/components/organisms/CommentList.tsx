import React, { FC } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
  Paper,
  Typography,
  TableSortLabel,
  TableRow,
  TablePagination,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from "@material-ui/core";
import CommentListRow from '../molecules/CommentListRow'
import { getComparator } from '../../common/functions'
import { ThreadDataType } from "../../features/thread/threadSlice";

export interface CommentListEachDataType {
  _id: string;
  uid: string;
  date: string;
  prefecture: string;
  username: string;
  comment: string;
  delete: string;
}

export type CommentListOrder = "asc" | "desc";

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
  disablePadding: boolean;
  id: keyof CommentListEachDataType;
  label: string;
  numeric: boolean;
}

const headCells: HeadCell[] = [
  {
    id: "date",
    numeric: false,
    disablePadding: true,
    label: "投稿日",
  },
  { id: "prefecture", numeric: true, disablePadding: false, label: "都道府県" },
  {
    id: "username",
    numeric: true,
    disablePadding: false,
    label: "ユーザーネーム",
  },
  {
    id: "comment",
    numeric: true,
    disablePadding: false,
    label: "コメント内容",
  },
  { id: "delete", numeric: true, disablePadding: false, label: "消去ボタン" },
];

interface EnhancedTableProps {
  classes: ReturnType<typeof useStyles>;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof CommentListEachDataType
  ) => void;
  order: CommentListOrder;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { classes, order, orderBy, onRequestSort } = props;
  const createSortHandler =
    (property: keyof CommentListEachDataType) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={"right"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
    },
    paper: {
      width: "100%",
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    visuallyHidden: {
      border: 0,
      clip: "rect(0 0 0 0)",
      height: 1,
      margin: -1,
      overflow: "hidden",
      padding: 0,
      position: "absolute",
      top: 20,
      width: 1,
    },
    marginTooltip: {
      textAlign: "center",
      padding: "20px",
    },
  })
);

export type CommentListProps = {
  label: string;
  rows: ThreadDataType[];
};

const CommentList: FC<CommentListProps> = ({ label, rows }) => {
  const classes = useStyles();
  const [order, setOrder] = React.useState<CommentListOrder>("desc");
  const [orderBy, setOrderBy] = React.useState<keyof CommentListEachDataType>("date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  //ソートボタンが押された時の処理
  const handleRequestSort = (
    event: React.MouseEvent<unknown>,
    property: keyof CommentListEachDataType
  ) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
    setPage(0);
  };

  //ページネーション
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  //ページネーション
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={classes.root}>
      {rows.length !== 0 ? (
        <Paper className={classes.paper}>
          <Typography
            variant="h6"
            id="tableTitle"
            component="div"
            className={classes.marginTooltip}
          >
            {label}
          </Typography>
          <TableContainer>
            <Table
              className={classes.table}
              aria-labelledby="tableTitle"
              size={"medium"}
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                classes={classes}
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <TableBody>
                {stableSort<any>(rows, getComparator(order, orderBy))
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: ThreadDataType) => {
                    return (
                      <CommentListRow key={row._id} row={row} />
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      ) : (
        <h3>投稿がありません</h3>
      )}
    </div>
  );
};

export default CommentList;
