import React, { useCallback, FC } from "react";
import Drawer from "@material-ui/core/Drawer";
import { makeStyles } from "@material-ui/styles";
import {
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { useAppSelector } from "../../app/hooks";
import { selectUser } from "../../features/user/userSlice";
import { IconButtonSelect } from "../atoms/IconButtonSelect";
import { headerItems } from "./Header";

const useStyles = makeStyles({
  container: {
    width: 200,
  },
});

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  headers: {
    logins: headerItems[];
    logouts: headerItems[];
    graphs: headerItems[];
  };
}

const ClosableDrawer: FC<Props> = ({ toggle, setToggle, headers }) => {
  const classes = useStyles();
  const user = useAppSelector(selectUser);
  const closeToggle = useCallback(
    (e) => {
      if (e.type === "keydown" && (e.key === "Tab" || e.key === "Shift")) {
        return;
      }
      setToggle(!toggle);
    },
    [setToggle, toggle]
  );
  return (
    <Drawer
      variant="temporary"
      anchor="right"
      open={toggle}
      onClose={(e) => closeToggle(e)}
      ModalProps={{ keepMounted: true }}
    >
      <div className={classes.container}>
        <List>
          {user
            ? headers.logins.map((login) => (
                <>
                  <ListItem button onClick={login.method}>
                    <ListItemIcon>
                      <IconButtonSelect
                        icon={login.icon}
                        disabled={true}
                        color={"action"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={login.text} />
                  </ListItem>
                  <Divider />
                </>
              ))
            : headers.logouts.map((logout) => (
                <>
                  <ListItem button onClick={logout.method}>
                    <ListItemIcon>
                      <IconButtonSelect
                        icon={logout.icon}
                        disabled={true}
                        color={"action"}
                      />
                    </ListItemIcon>
                    <ListItemText primary={logout.text} />
                  </ListItem>
                  <Divider />
                </>
              ))}
          {headers.graphs.map((graph) => (
            <>
              <ListItem button onClick={graph.method}>
                <ListItemIcon>
                  <IconButtonSelect
                    icon={graph.icon}
                    disabled={true}
                    color={"action"}
                  />
                </ListItemIcon>
                <ListItemText primary={graph.text} />
              </ListItem>
              <Divider />
            </>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default ClosableDrawer;
