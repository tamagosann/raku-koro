import { CommentListOrder } from "../components/organisms/CommentList";

//日時を〇〇-〇〇-〇〇　〇〇：〇〇：〇〇で出すやつ
export const datetimeToString = (date: Date): string => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2) +
    " " +
    ("00" + date.getHours()).slice(-2) +
    ":" +
    ("00" + date.getMinutes()).slice(-2) +
    ":" +
    ("00" + date.getSeconds()).slice(-2)
  );
};


///////////////////////
//ここからCommentList用//
///////////////////////

//コメントリスト用、ソート時に比較するやつ
export function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

//コメントリスト用 比較するファンクション
export function getComparator<Key extends keyof any>(
  order: CommentListOrder,
  orderBy: Key
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string }
) => number {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}