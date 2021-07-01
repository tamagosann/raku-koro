import { Container } from "@material-ui/core";
import { FormLayout } from "../components/organisms";

const UserInfo = () => {
  return (
    <Container maxWidth="md">
      <FormLayout type={"userinfo"} />
      {/* 投稿テーブル */}
    </Container>
  );
};
export default UserInfo;
