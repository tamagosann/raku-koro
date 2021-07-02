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
import EqualizerIcon from "@material-ui/icons/Equalizer";
import TimelineIcon from "@material-ui/icons/Timeline";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import BarChartIcon from "@material-ui/icons/BarChart";
import MultilineChartIcon from "@material-ui/icons/MultilineChart";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import InfoIcon from '@material-ui/icons/Info';
import AssignmentIcon from '@material-ui/icons/Assignment';

export type icon =
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
  | "NewAccount"
  | "BarGrph1"
  | "BarGrph2"
  | "LineGrph1"
  | "LineGrph2"
  | "LineGrph3"
  | "CircleGrph"
  | string;
interface Props {
  icon: icon;
  color?: "inherit" | "primary" | "secondary" | "action" | "disabled" | "error";
  onClick?: () => void;
  disabled?: boolean;
}

export const IconButtonSelect: FC<Props> = ({
  icon,
  color,
  onClick,
  disabled,
}) => {
  return (
    <IconButton onClick={onClick} disabled={disabled}>
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
      {icon === "BarGrph1" && <EqualizerIcon color={color} />}
      {icon === "BarGrph2" && <BarChartIcon color={color} />}
      {icon === "LineGrph1" && <TimelineIcon color={color} />}
      {icon === "LineGrph2" && <MultilineChartIcon color={color} />}
      {icon === "LineGrph3" && <ShowChartIcon color={color} />}
      {icon === "CircleGrph" && <DonutLargeIcon color={color} />}
      {icon === "About" && <InfoIcon color={color} />}
      {icon === "Asign" && <AssignmentIcon color={color} />}
    </IconButton>
  );
};
