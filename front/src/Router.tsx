import { Route, Switch } from "react-router-dom";
import { NationwideData } from "./pages/NationwideData";
import {
  Graph1,
  InfectedPerson,
  BedOccupancyRate,
  PrefectureDailyInfention,
  Login,
  Register,
} from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Graph1} />
      <Route exact path={"/nationwide"} component={NationwideData} />
      <Route exact path={"/bed-usage-rate"} component={BedOccupancyRate} />
      <Route exact path={"/every_prefecture"} component={PrefectureDailyInfention} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/register"} component={Register} />
    </Switch>
  );
};

export default Router;
