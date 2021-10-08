import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { useCookies } from "react-cookie";

const Logout = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);
  return (
    <Button basic color="violet" onClick={() => removeCookie("jwt-token")}>
      Logout
    </Button>
  );
};

export default Logout;
