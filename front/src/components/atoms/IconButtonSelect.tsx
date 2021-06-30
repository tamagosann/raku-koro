import { FC } from "react";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import HistoryIcon from "@material-ui/icons/History";
import MeetingRoomIcon from "@material-ui/icons/MeetingRoom";
import MeetingRoomOutlinedIcon from "@material-ui/icons/MeetingRoomOutlined";
import SearchIcon from "@material-ui/icons/Search";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import EditIcon from "@material-ui/icons/Edit";
import FormatListBulletedIcon from "@material-ui/icons/FormatListBulleted";
import PersonAddIcon from "@material-ui/icons/PersonAdd";
interface Props {
  icon:
    | "Menu"
    | "Admin"
    | "Cart"
    | "History"
    | "Login"
    | "Logout"
    | "Search"
    | "Arrow"
    | "Edit"
    | "List"
    | "NewAccount";
  color?: "inherit" | "primary" | "secondary" | "action" | "disabled" | "error";
  onClick: () => void;
}

export const IconButtonSelect: FC<Props> = ({ icon, color, onClick }) => {
  return (
    <IconButton onClick={onClick}>
      {icon === "Menu" && <MenuIcon color={color} />}
      {icon === "Admin" && <SupervisorAccountIcon color={color} />}
      {icon === "Cart" && <ShoppingCartIcon color={color} />}
      {icon === "History" && <HistoryIcon color={color} />}
      {icon === "Login" && <MeetingRoomIcon color={color} />}
      {icon === "Logout" && <MeetingRoomOutlinedIcon color={color} />}
      {icon === "Search" && <SearchIcon color={color} />}
      {icon === "Arrow" && <ArrowBackIcon color={color} />}
      {icon === "Edit" && <EditIcon color={color} />}
      {icon === "List" && <FormatListBulletedIcon color={color} />}
      {icon === "NewAccount" && <PersonAddIcon color={color} />}
    </IconButton>
  );
};
