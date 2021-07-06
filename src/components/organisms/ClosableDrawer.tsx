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
import { IconButtonSelect } from "../atoms/IconButtonSelect";
import { headerItems } from "./Header";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  container: {
    width: 200,
  },
});

interface Props {
  toggle: boolean;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
  headers: headerItems[];
}

const ClosableDrawer: FC<Props> = ({ toggle, setToggle, headers }) => {
  const classes = useStyles();
  const history = useHistory();
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
          {headers.map((logout, index) => (
            <div key={index}>
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
            </div>
          ))}
          <ListItem button onClick={() => history.push("about")}>
            <ListItemIcon>
              <IconButtonSelect
                icon={"About"}
                disabled={true}
                color={"action"}
              />
            </ListItemIcon>
            <ListItemText primary={"ABOUT"} />
          </ListItem>
          <Divider />
        </List>
      </div>
    </Drawer>
  );
};
export default ClosableDrawer;
