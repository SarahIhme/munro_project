const express = require("express");
const app = express();
const port = 3001;

const jwt = require("express-jwt");
const { sign } = require("jsonwebtoken");

const { createHash } = require("crypto");

const jwtSecretKey = "Munros are really great";

app.use(
  jwt({
    secret: jwtSecretKey,
    algorithms: ["HS256"],
    requestProperty: "auth",
  }).unless({
    path: ["/users/login", "/users/register", "/munros/general"],
  })
);

const munro_model = require("./munro_model");
const user_model = require("./user_model");

app.use(express.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Access-Control-Allow-Headers"
  );
  next();
});

app.get("/", (req, res) => {
  munro_model
    .getMunrosWithUser(req.auth.username)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.get("/munros/general", (req, res) => {
  munro_model
    .getMunrosWithoutUser()
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.put("/munros", (req, res) => {
  console.log(req.body);
  munro_model
    .updateMunroCompleted(req.auth.username, req.body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});

app.post("/users/register", (req, res) => {
  const { username, password } = req.body;
  // generate hash from plain password
  const hashedPassword = createHash("sha256")
    .update(password)
    .digest()
    .toString("hex");

  user_model.user_exists(username).then((user) => {
    if ((user.length = 0)) {
      console.log(user);
      console.log("Here");
      res.status(401).send({
        message: "Name already exists.",
        username,
      });
    } else {
      // change to insert in DB not session variable
      console.log("There");
      user_model.register_user({ username, hashedPassword });
      munro_model.addUserMunros(username);
      res.status(200).send({
        message: "Account created.",
      });
    }
  });
});

app.post("/users/login", async (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;

  // generate hash from plain password
  const hashedPassword = createHash("sha256")
    .update(password)
    .digest()
    .toString("hex");

  // find user from db with matching email & hashedPassword
  const logged_in_user = await user_model.check_user_credentials({
    username,
    hashedPassword,
  });

  if (logged_in_user.length > 0) {
    // generate JWT token with user credentials as encrypted payload
    const token = sign({ username }, jwtSecretKey, {
      algorithm: "HS256",
    });

    console.log(token);
    // expose Authorization header to return to client
    res.header("Access-Control-Expose-Headers", "Authorization");
    res.header("Authorization", token);
    res.status(200).send({
      message: "Login successful.",
      username: { username },
    });
  } else {
    res.status(401).send({
      message: "Wrong email or password.",
    });
  }
});
