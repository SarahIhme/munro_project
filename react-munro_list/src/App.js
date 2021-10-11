import React from "react";
import "semantic-ui-css/semantic.min.css";
import NavBar from "./NavBar";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Munros from "./Munros.js";
import GeneralMunros from "./GeneralMunros";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  return (
    <Router>
      <div style={{ float: "center", margin: "1rem" }}>
        <NavBar />
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/munros">
            {cookies["jwt-token"] ? <Munros /> : <Redirect to="/login" />}
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
          <Route exact path="/munros/general">
            <GeneralMunros />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
