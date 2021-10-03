import React from "react";
import "semantic-ui-css/semantic.min.css";
import Login from "./Login";
import Register from "./Register";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import Munros from "./Munros.js";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div>
        <div style={{ float: "right", margin: "1rem" }}>
          <Link to="/login">
            <Login />
          </Link>
          <Link to="/register">
            <Register />
          </Link>
        </div>
        <Switch>
          <Route exact path="/">
            <Munros />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/register">
            <RegisterPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
