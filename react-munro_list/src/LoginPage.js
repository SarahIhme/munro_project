import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";
import { useCookies } from "react-cookie";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [cookies, setCookie, removeCookie] = useCookies(["jwt-token"]);

  function submitPassword() {
    fetch(`http://localhost:3001/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    }).then((response) =>
      setCookie("jwt-token", response.headers.get("Authorization"))
    );
  }

  return (
    <Form onSubmit={() => submitPassword()}>
      np
      <Form.Field>
        <label>Username</label>
        <input
          name="username"
          id="username"
          placeholder="Username"
          onChange={(event) => setUsername(event.target.value)}
        />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          name="password"
          id="password"
          placeholder="Password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Form.Field>
      <Button type="submit">Login</Button>
    </Form>
  );
};

export default LoginPage;
