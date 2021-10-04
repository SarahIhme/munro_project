import React, { useState } from "react";
import { Button, Form } from "semantic-ui-react";

const RegisterPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function registerUser() {
    fetch(`http://localhost:3001/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });
  }

  return (
    <Form onSubmit={() => registerUser()}>
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
      <Button type="submit">Register</Button>
    </Form>
  );
};

export default RegisterPage;
