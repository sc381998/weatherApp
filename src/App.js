import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "./styles.css";
import Home from "./components/Home";
import Login from "./components/Login";

import Nomatch from "./components/Nomatch";
export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} />
        <Route
          exact
          path="/"
          render={(props) => <Home display={true} {...props} />}
        />
        <Route component={Nomatch} />
      </Switch>
    </BrowserRouter>
  );
}
