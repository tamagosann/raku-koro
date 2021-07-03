import { FC, useMemo } from "react";
import { FormLayout } from "../components/organisms";
import { CommentList } from "../components/commentList";
import {
  selectThread,
  selectThreadErrorMsg,
  ThreadDataType,
} from "../features/thread/threadSlice";
import { useAppSelector } from "../app/hooks";
import { selectUid } from "../features/user/userSlice";
import { Inner } from "../components/inner";

const UserInfo: FC = () => {
  const threadsData = useAppSelector(selectThread);
  const uid = useAppSelector(selectUid);
  const errorMsg = useAppSelector(selectThreadErrorMsg);

  const userThreadsData = useMemo((): ThreadDataType[] => {
    if (threadsData && uid) {
      let newThreadsData = threadsData.filter((thread) => thread.uid === uid);
      return newThreadsData;
    }
    return [];
  }, [threadsData, uid]);

  return (
    <Inner>
      {errorMsg ? (
        <p style={{ color: "red" }}>{errorMsg}</p>
      ) : (
        <>
          <FormLayout type={"userinfo"} />
          {userThreadsData.length !== 0 ? (
            <CommentList label={"ユーザー投稿一覧"} rows={userThreadsData} />
          ) : (
            <h3>投稿がありません</h3>
          )}
        </>
      )}
    </Inner>
  );
};
export default UserInfo;
