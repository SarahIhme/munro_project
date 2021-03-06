import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useCookies } from "react-cookie";
import { useHistory } from "react-router-dom";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  function submitPassword() {
    fetch(`http://localhost:3001/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) => {
      setCookie("jwt-token", "Bearer " + response.headers.get("Authorization"));
      history.push("/munros");
    });
  }

  return (
    <div>
      <Form onSubmit={() => submitPassword()}>
        <Form.Field>
          <label>Username</label>
          <input
            placeholder="Username"
            onChange={(event) => setUsername(event.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </Form.Field>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default LoginPage;
