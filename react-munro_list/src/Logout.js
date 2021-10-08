import React from "react";
import "semantic-ui-css/semantic.min.css";
import { Button } from "semantic-ui-react";
import { useCookies } from "react-cookie";

const Logout = () => {
  return (
    <Button basic color="violet">
      Logout
    </Button>
  );
};

export default Logout;
