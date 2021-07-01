import { Route, Switch } from 'react-router-dom';
import {
  Graph1,
  InfectedPerson,
  BedOccupancyRate,
  Login,
  Register,
} from './templates';
import { PrefectureData } from './pages/PrefectureData';

const Router = () => {
  return (
    <Switch>
      <Route exact path={'(/)?'} component={Graph1} />
      <Route exact path={'/infected-person'} component={InfectedPerson} />
      <Route exact path={'/bed-usage-rate'} component={BedOccupancyRate} />
      <Route exact path={'/every_prefecture'} component={PrefectureData} />
      <Route exact path={'/login'} component={Login} />
      <Route exact path={'/register'} component={Register} />
    </Switch>
  );
};

export default Router;
