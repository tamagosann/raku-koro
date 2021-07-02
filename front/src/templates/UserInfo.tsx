import { Container } from "@material-ui/core";
import { useMemo } from "react";
import { FormLayout } from "../components/organisms";
import { CommentList } from "../components/commentList";
import { selectThread, ThreadDataType } from "../features/thread/threadSlice";
import { useAppSelector } from "../app/hooks";
import { selectUid } from "../features/user/userSlice";

const UserInfo = () => {
  const threadsData = useAppSelector(selectThread);
  const uid = useAppSelector(selectUid);

  const userThreadsData = useMemo((): ThreadDataType[] => {
    if (threadsData && uid) {
      let newThreadsData = threadsData.filter((thread) => thread.uid === uid);
      return newThreadsData;
    }
    return [];
  }, [threadsData, uid]);

  return (
    <Container maxWidth="md">
      <FormLayout type={"userinfo"} />
      {userThreadsData.length !== 0 ? (
        <CommentList label={"ユーザー投稿一覧"} rows={userThreadsData} />
      ) : (
        <h3>投稿がありません</h3>
      )}
    </Container>
  );
};
export default UserInfo;
