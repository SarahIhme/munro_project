import React from "react";
import "semantic-ui-css/semantic.min.css";
import Login from "./Login";
import Register from "./Register";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Munros from "./Munros.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import MunroButton from "./MunroButton";

function App() {
  return (
    <Router>
      <div style={{ float: "center", margin: "1rem" }}>
        <Link to="/login">
          <Login />
        </Link>
        <Link to="/register">
          <Register />
        </Link>
        <Link to="/">
          <MunroButton />
        </Link>
        <Switch>
          <Route exact path="/">
            <Munros />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
