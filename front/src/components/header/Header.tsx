import React, { useState, FC, useCallback } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router";
import { logout } from "../../features/user/userAPI";
import { UserDataType } from "../../features/user/userSlice";
import { IconButtonSelect } from "../atoms/IconButtonSelect";
import ClosableDrawer from "./ClosableDrawer";
import { icon } from "../atoms/IconButtonSelect";
import logo from "../../assets/img/logo.png";

const headers = {
  logins: [{ text: "ログアウト", icon: "Logout", link: "" }],
  logouts: [
    { text: "ログイン", icon: "Login", link: "/login" },
    {
      text: "新規登録",
      icon: "NewAccount",
      link: "/register",
    },
  ],
  graphs: [
    {
      text: "全国",
      icon: "LineGrph1",
      link: "/nationwide",
    },
    {
      text: "都道府県",
      icon: "LineGrph1",
      link: "/every_prefecture",
    },
    {
      text: "病床使用率",
      icon: "CircleGrph",
      link: "/bed-usage-rate",
    },
    {
      text: "PCR検査",
      icon: "BarGrph1",
      link: "/pcr-rate",
    },
    {
      text: "掲示板",
      icon: "Asign",
      link: "/threads",
    },
  ],
};

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
      [theme.breakpoints.down("sm")]: {
        display: "none",
      },
    },
  })
);

export interface headerItems {
  text: string;
  icon: icon;
  link: string;
}
interface Props {
  userData: UserDataType | null;
}

const Header: FC<Props> = ({ userData }) => {
  const classes = useStyles();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const handleClick = (link: string) => {
    history.push(link);
  };
  return (
    <div className={classes.grow}>
      <AppBar position="fixed" style={{ background: "#fd7e00" }}>
        <Container maxWidth="lg">
          <Toolbar>
            <Typography
              variant="h6"
              noWrap
              onClick={() => history.push("/")}
              style={{ cursor: "pointer" }}
            >
              <img
                src={logo}
                alt="logo"
                width="60px"
                style={{ verticalAlign: "middle" }}
              />
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
                    <div style={{ textAlign: "center" }}>
                      <IconButtonSelect
                        icon={graph.icon}
                        onClick={() => handleClick(graph.link)}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <small>{graph.text}</small>
                    </div>
                  </Grid>
                </div>
              ))}
            </>
            <div className={classes.grow} />
            <Typography
              className={classes.userName}
              onClick={() => history.push("/about")}
              style={{ cursor: "pointer" }}
            >
              {" "}
              About
            </Typography>
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
                      onClick={() => logout()}
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
                      onClick={() => history.push(logout.link)}
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
      <ClosableDrawer
        toggle={toggle}
        setToggle={setToggle}
        headers={headers}
        userData={userData}
      />
    </div>
  );
};
export default Header;
