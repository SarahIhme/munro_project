import React from "react";
import "semantic-ui-css/semantic.min.css";
import Login from "./Login";
import Register from "./Register";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Munros from "./Munros.js";
import GeneralMunros from "./GeneralMunros";
import GeneralMunroButton from "./GeneralMunroButton";
import Logout from "./Logout";
import {
  Redirect,
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import MunroButton from "./MunroButton";
import { useCookies } from "react-cookie";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  return (
    <Router>
      <div style={{ float: "center", margin: "1rem" }}>
        {cookies["jwt-token"] ? (
          <div>
            <Link to="/munros">
              <MunroButton />
            </Link>
            <Logout onClick={console.log("Would like logout behaviour")} />
          </div>
        ) : (
          <div>
            <Link to="/login">
              <Login />
            </Link>
            <Link to="/register">
              <Register />
            </Link>
            <Link to="/munros/general">
              <GeneralMunroButton />
            </Link>
          </div>
        )}
        <Switch>
          <Route exact path="/">
            <Redirect to="/login" />
          </Route>
          <Route exact path="/munros">
            <Munros />
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
