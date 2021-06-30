import { Route, Switch } from "react-router-dom";
import { Graph1, Graph2, Graph3, Login,Register } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Graph1} />
      <Route exact path={"/graph-2"} component={Graph2} />
      <Route exact path={"/graph-3"} component={Graph3} />
      <Route exact path={"/login"} component={Login} />
      <Route exact path={"/register"} component={Register} />
    </Switch>
  );
};

export default Router;