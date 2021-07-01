import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Grid } from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { useHistory } from "react-router";
import { logout } from "../../features/user/userAPI";
import { selectUser } from "../../features/user/userSlice";
import { IconButtonSelect } from "../atoms/IconButtonSelect";
import ClosableDrawer from "./ClosableDrawer";
import { icon } from "../atoms/IconButtonSelect";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    grow: {
      flexGrow: 0.5,
    },
    mr20: {
      marginRight: 10,
    },
    menu: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    graphs: {
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
    drawer: {
      [theme.breakpoints.up("md")]: {
        display: "none",
      },
    },
    userName: {
      "&:hover": {
        color: "red",
      },
    },
  })
);

export interface headerItems {
  text: string;
  icon: icon;
  method: () => void;
}

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const userData = useAppSelector(selectUser);
  const [toggle, setToggle] = useState(false);
  const headers = {
    logins: [
      { text: "掲示板", icon: "List", method: () => history.push("/threads") },
      { text: "ログアウト", icon: "Logout", method: () => logout() },
    ],
    logouts: [
      { text: "ログイン", icon: "Login", method: () => history.push("/login") },
      {
        text: "新規登録",
        icon: "NewAccount",
        method: () => history.push("/register"),
      },
    ],
    graphs: [
      { text: "グラフ1", icon: "LineGrph1", method: () => history.push("/") },
      { text: "グラフ2", icon: "LineGrph2", method: () => history.push("/") },
      { text: "グラフ3", icon: "LineGrph3", method: () => history.push("/") },
      { text: "グラフ4", icon: "CircleGrph", method: () => history.push("/") },
      { text: "グラフ5", icon: "BarGrph1", method: () => history.push("/") },
      { text: "グラフ6", icon: "BarGrph2", method: () => history.push("/") },
    ],
  };
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" noWrap onClick={() => history.push("/")}>
              ラクラクコロナ
            </Typography>
            <div className={classes.grow} />
            <>
              {headers.graphs.map((graph, index) => (
                <div
                  className={classes.graphs}
                  key={index}
                  style={{ marginRight: 10, marginLeft: 10 }}
                >
                  <Grid container direction={"column"}>
                    <Grid item>
                      <IconButtonSelect
                        icon={graph.icon}
                        onClick={graph.method}
                      />
                    </Grid>
                    <Grid item>
                      <small>{graph.text}</small>
                    </Grid>
                  </Grid>
                </div>
              ))}
            </>
            <div className={classes.grow} />
            {userData ? (
              <>
                <Typography
                  className={classes.userName}
                  onClick={() => history.push("/userinfo")}
                >
                  {" "}
                  {userData?.username} さん
                </Typography>
                {headers.logins.map((login, index) => (
                  <div className={classes.menu} key={index}>
                    <IconButtonSelect
                      icon={login.icon}
                      onClick={login.method}
                    />
                  </div>
                ))}
              </>
            ) : (
              <>
                {headers.logouts.map((logout, index) => (
                  <div className={classes.menu} key={index}>
                    <IconButtonSelect
                      icon={logout.icon}
                      onClick={logout.method}
                    />
                  </div>
                ))}
              </>
            )}
            <div className={classes.drawer}>
              <IconButtonSelect
                icon={"Menu"}
                onClick={() => setToggle(!toggle)}
              />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <ClosableDrawer toggle={toggle} setToggle={setToggle} headers={headers} />
    </div>
  );
};
export default Header;
