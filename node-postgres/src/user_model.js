const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "munros",
  password: "postgres",
});

const user_exists = (user_name) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "EXISTS(SELECT user_name FROM users WHERE user_name =='" +
        user_name +
        "')",
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const register_user = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, password } = body;
    pool.query(
      "INSERT INTO users (user_name, password) VALUES ($1, $2) RETURNING *",
      [username, password],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new user has been added`);
      }
    );
  });
};

const check_user_credentials = (body) => {
  return new Promise(function (resolve, reject) {
    const { username, hashedPassword } = body;
    pool.query(
      "SELECT * FROM users WHERE user_name = $1 AND password = $2",
      [username, hashedPassword],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

module.exports = {
  user_exists,
  register_user,
  check_user_credentials,
};
