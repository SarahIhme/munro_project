const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "munros",
  password: "postgres",
});

const getMunros = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM munros", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const updateMunroCompleted = (body) => {
  return new Promise(function (resolve, reject) {
    const { munro_id, completed } = body;
    console.log(`Updating Munro completion: ${munro_id} is ${completed}`);
    pool.query(
      "UPDATE munros SET completed = $2 WHERE munro_id = $1 RETURNING *",
      [munro_id, completed],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`A new todo has been added added`);
      }
    );
  });
};

module.exports = {
  getMunros,
  updateMunroCompleted,
};
