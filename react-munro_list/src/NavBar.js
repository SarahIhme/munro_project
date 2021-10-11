import React from "react";
import "semantic-ui-css/semantic.min.css";
import Login from "./Login";
import Register from "./Register";
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

const NavBar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  return (
    <div>
      {cookies["jwt-token"] ? (
        <div>
          <Link to="/munros">
            <MunroButton />
          </Link>
          <Logout />
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
    </div>
  );
};

export default NavBar;
