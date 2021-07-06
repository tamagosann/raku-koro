import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Container, Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router";
import { IconButtonSelect } from "../atoms/IconButtonSelect";
import ClosableDrawer from "./ClosableDrawer";
import { icon } from "../atoms/IconButtonSelect";
import logo from "../../assets/img/logo.png";

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
  method: () => void;
}

const Header: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
  const [toggle, setToggle] = useState(false);
  const headers = [
    {
      text: "全国",
      icon: "LineGrph1",
      method: () => history.push("/nationwide"),
    },
    {
      text: "都道府県",
      icon: "LineGrph1",
      method: () => history.push("/every_prefecture"),
    },
    {
      text: "病床使用率",
      icon: "CircleGrph",
      method: () => history.push("/bed-usage-rate"),
    },
    {
      text: "PCR検査",
      icon: "BarGrph1",
      method: () => history.push("/pcr-rate"),
    },
  ];
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
              {headers.map((head, index) => (
                <div
                  className={classes.graphs}
                  key={index}
                  style={{ marginRight: 10, marginLeft: 10 }}
                >
                  <Grid container direction={"column"}>
                    <div style={{ textAlign: "center" }}>
                      <IconButtonSelect
                        icon={head.icon}
                        onClick={head.method}
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <small>{head.text}</small>
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
