import { Route, Switch } from "react-router-dom";
import { Graph1, Graph2, InfectedPerson, Login,Register } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Graph1} />
      <Route exact path={"/graph-2"} component={Graph2} />
      <Route exact path={"/graph-3"} component={InfectedPerson} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/register"} component={Register} />
    </Switch>
  );
};

export default Router;