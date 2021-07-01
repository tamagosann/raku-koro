import { Route, Switch } from "react-router-dom";
import {
  Graph1,
  InfectedPerson,
  BedOccupancyRate,
  Login,
  Register,
  UserInfo,
  ThreadInfo,
} from './templates';
import { PrefectureData } from './pages/PrefectureData';
import { NationwideData } from "./pages/NationwideData";

const Router = () => {
  return (
    <Switch>
      <Route exact path={'(/)?'} component={Graph1} />
      <Route exact path={'/nationwide'} component={NationwideData} />
      <Route exact path={'/bed-usage-rate'} component={BedOccupancyRate} />
      <Route exact path={'/every_prefecture'} component={PrefectureData} />
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/register'} component={Register} />
      <Route exact path={'/userinfo'} component={UserInfo} />
      <Route exact path={'/thread/:thread_id'} component={ThreadInfo} />
    </Switch>
  );
};

export default Router;
