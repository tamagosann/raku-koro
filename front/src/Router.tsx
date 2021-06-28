import { Route, Switch } from "react-router-dom";
import { Graph1, Graph2, Graph3 } from "./templates";

const Router = () => {
  return (
    <Switch>
      <Route exact path={"(/)?"} component={Graph1} />
      <Route exact path={"/graph-2"} component={Graph2} />
      <Route exact path={"/graph-3"} component={Graph3} />
    </Switch>
  );
};

export default Router;
