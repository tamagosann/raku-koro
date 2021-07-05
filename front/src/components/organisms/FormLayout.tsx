import { FC } from "react";
import { Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ThreadForm } from "../molecules";
import { UserInfoForm } from "../molecules";
import { CreateCommentForm } from "../molecules";

const useStyles = makeStyles(() =>
  createStyles({
    formlayout: {
      marginTop: 30,
    },
  })
);
interface Props {
  type: "userinfo" | "threadinfo" | "createcomment";
}
const FormLayout: FC<Props> = ({ type }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={"md"} component={Paper} className={classes.formlayout}>
      {type === "userinfo" && <UserInfoForm />}
      {type === "threadinfo" && <ThreadForm />}
      {type === "createcomment" && <CreateCommentForm />}
    </Container>
  );
};

export default FormLayout;
