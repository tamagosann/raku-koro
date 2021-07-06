import { Route, Switch } from "react-router-dom";
import {
  InfectedPerson,
  BedOccupancyRate,
  About,
  InformationCorona,
  PcrPositiveRate,
} from "./templates";
import { PrefectureData, NationwideData } from "./pages";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={InformationCorona} />
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/infected-person"} component={InfectedPerson} />
      <Route exact path={"/bed-usage-rate"} component={BedOccupancyRate} />
      <Route exact path={"/every_prefecture"} component={PrefectureData} />
      <Route exact path={"/nationwide"} component={NationwideData} />
      <Route exact path={"/pcr-rate"} component={PcrPositiveRate} />
    </Switch>
  );
};

export default Router;
