import { FC } from "react";
import { Container, Paper } from "@material-ui/core";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import { ThreadForm } from "../molecules";
import { UserInfoForm } from "../molecules";
const useStyles = makeStyles(() =>
  createStyles({
    formlayout: {
      marginTop: 30,
    },
  })
);
interface Props {
  type: "userinfo" | "threadinfo";
}
const FormLayout: FC<Props> = ({ type }) => {
  const classes = useStyles();
  return (
    <Container maxWidth={"sm"} component={Paper} className={classes.formlayout}>
      {type === "userinfo" && <UserInfoForm />}
      {type === "threadinfo" && <ThreadForm />}
    </Container>
  );
};

export default FormLayout;
