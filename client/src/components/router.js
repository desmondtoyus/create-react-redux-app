import React from "react";
import { Route, Switch} from "react-router-dom";
import MainWrapper from "./MainWrapper";

import About from "../pages/about";
import Home from "../pages/home";
import NotFound from "../pages/notfound";
import createHistory from 'history/createBrowserHistory'
const history = createHistory()
const Router = () => (
  <MainWrapper history={history}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
          <Route exact path="*" component={NotFound} />
        </Switch>
  </MainWrapper>
);

export default Router;