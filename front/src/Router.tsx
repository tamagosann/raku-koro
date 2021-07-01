import { Route, Switch } from "react-router-dom";
import {
  Graph1,
  Graph2,
  InfectedPerson,
  DeceasedPerson,
  Login,
  Register,
  UserInfo,
  ThreadInfo
} from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Graph1} />
      <Route exact path={"/graph-2"} component={Graph2} />
      <Route exact path={"/graph-3"} component={InfectedPerson} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/graph-5"} component={DeceasedPerson} />
      <Route exact path={"/userinfo"} component={UserInfo} />
      <Route exact path={"/thread/:thread_id"} component={ThreadInfo} />
    </Switch>
  );
};

export default Router;
