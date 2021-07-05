import { FC } from "react";
import { Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ThreadForm } from "../molecules";
import { UserInfoForm } from "../molecules";
import { CreateCommentForm } from "../molecules";
import { useAppSelector } from "../../app/hooks";
import { selectUser, selectUserErrorMsg } from "../../features/user/userSlice";
import {
  selectThread,
  selectThreadErrorMsg,
} from "../../features/thread/threadSlice";

const useStyles = makeStyles(() =>
  createStyles({
    formlayout: {
      marginTop: 30,
    },
  })
);
interface Props {
  type: "userinfo" | "threadinfo" | "createcomment";
  id?: string;
}
const FormLayout: FC<Props> = ({ type, id }) => {
  const classes = useStyles();
  const user = useAppSelector(selectUser);
  const thread = useAppSelector(selectThread);
  const threadErrorMsg = useAppSelector(selectThreadErrorMsg);
  const userErrorMsg = useAppSelector(selectUserErrorMsg);
  return (
    <Container maxWidth={"md"} component={Paper} className={classes.formlayout}>
      {type === "userinfo" && (
        <UserInfoForm user={user} errorMsg={userErrorMsg} />
      )}
      {type === "threadinfo" && (
        <ThreadForm
          user={user}
          thread={thread}
          errorMsg={threadErrorMsg}
          threadId={id!}
        />
      )}
      {type === "createcomment" && (
        <CreateCommentForm user={user} errorMsg={threadErrorMsg} />
      )}
    </Container>
  );
};

export default FormLayout;
