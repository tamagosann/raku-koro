import { Route, Switch } from "react-router-dom";
import {
  InfectedPerson,
  BedOccupancyRate,
  Login,
  Register,
  UserInfo,
  Threads,
  ThreadInfo,
  About
} from './templates';
import { PrefectureData } from './pages/PrefectureData';
import { NationwideData } from "./pages/NationwideData";
import { InformationCorona } from "./templates/informationCorona";
import PcrPositiveRate from "./templates/PcrPositiveRate";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={InformationCorona} />
      <Route exact path={"/about"} component={About} />
      <Route exact path={"/infected-person"} component={InfectedPerson} />
      <Route exact path={"/bed-usage-rate"} component={BedOccupancyRate} />
      <Route exact path={"/every_prefecture"} component={PrefectureData} />
      <Route exact path={'/nationwide'} component={NationwideData} />
      <Route exact path={'/pcr-rate'} component={PcrPositiveRate} />
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/register'} component={Register} />
      <Route exact path={'/userinfo'} component={UserInfo} />
      <Route exact path={"/threads"} component={Threads} />
      <Route exact path={"/threads/:thread_id"} component={ThreadInfo} />
    </Switch>
  );
};

export default Router;
