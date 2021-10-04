const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "munros",
  password: "postgres",
});

const getMunrosWithUser = (user) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM munros, completed WHERE completed.username = $1 AND completed.munro_id=munros.munro_id",
      [user],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows);
      }
    );
  });
};

const getMunrosWithoutUser = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM munros", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const updateMunroCompleted = (username, body) => {
  return new Promise(function (resolve, reject) {
    const { munro_id, completed } = body;
    console.log(`Updating Munro completion: ${munro_id} is ${completed}`);
    pool.query(
      "UPDATE completed SET completed = $2 WHERE munro_id = $1 AND username = $3 RETURNING *",
      [munro_id, completed, username],
      (error, results) => {
        if (error) {
          console.log(error);
          reject(error);
        }
        resolve(`A munro has been completed`);
      }
    );
  });
};

const addUserMunros = (user) => {
  return new Promise(function (resolve, reject) {
    console.log(`Adding Munro completion: ${user}`);
    full_values = "";
    for (let i = 0; i < 281; i++) {
      full_values = full_values + `('${user}', ${i}, False),`;
    }
    full_values = full_values + `('${user}', 282, False)`;
    console.log(full_values);
    pool.query(
      "INSERT INTO completed(username, munro_id, completed) VALUES " +
        full_values,
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new user with completed has been added`);
      }
    );
  });
};

module.exports = {
  getMunrosWithUser,
  getMunrosWithoutUser,
  updateMunroCompleted,
  addUserMunros,
};
