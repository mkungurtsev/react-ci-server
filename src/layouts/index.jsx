import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Root from "./root";
import BuildHistory from "./build-history";
import Settings from "./settings";

const Routes = () => (
  <Router>
    <Root>
      <Switch>
        <Route exact path="/">
          <BuildHistory />
        </Route>
        <Route path="/settings">
          <Settings />
        </Route>
      </Switch>
    </Root>
  </Router>
);

export default Routes;
