import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container } from "@material-ui/core";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router";
import { logout } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice";
import { IconButtonSelect } from "../atoms/IconButtonSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 1,
    },
    mr20: {
      marginRight: 10,
    },
    menu: {
      [theme.breakpoints.down("xs")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
  })
);

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const userData = useAppSelector(selectUser);
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" noWrap onClick={() => history.push("/")}>
              ラクラクコロナ
            </Typography>
            <div className={classes.grow} />
            <Typography>{userData?.username}</Typography>
            <IconButtonSelect
              icon={"List"}
              onClick={() => history.push("/threads")}
            />
            <IconButtonSelect
              icon={"NewAccount"}
              onClick={() => history.push("/register")}
            />
            <IconButtonSelect
              icon={"Login"}
              onClick={() => history.push("/login")}
            />
            <IconButtonSelect
              icon={"Logout"}
              onClick={() => {
                logout();
              }}
            />
          </Toolbar>
        </Container>
      </AppBar>
    </div>
  );
};
export default Header;
