import { datetimeToString, translateErrorMsg } from "../functions";

test("日付を変換", () => {
  let date = new Date();
  let dateTranslate = datetimeToString(date);
  expect(datetimeToString(date)).toBe(dateTranslate);
});

test("エラーメッセージ変換", () => {
  expect(translateErrorMsg("password is wrong")).toBe(
    "パスワードが間違っています。"
  );
  expect(translateErrorMsg("no user entry")).toBe(
    "そのメールアドレスの登録はありません。"
  );
  expect(translateErrorMsg("Network Error")).toBe(
    "ネットワークエラー：管理者にお問い合わせください"
  );
  expect(translateErrorMsg("The email address")).toBe(
    "そのメールアドレスは既に登録されています。"
  );
  expect(translateErrorMsg("ssssss")).toBe(
    "エラーが発生しました。もう一度お試しください。"
  );
});
