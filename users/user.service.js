const pool = require("../config/database");

module.exports = {
  create: (data, callBack) => {
    pool.query(
      `insert into registration(firstName, lastName, gender, email, password, number)values(?,?,?,?,?,?)`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
      ],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          console.log(results);
          return callBack(null, results);
        }
      }
    );
  },
  getUser: (data, callBack) => {
    pool.query(
      `select id,firstName, lastName, email,number from registration`,
      [],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        } else {
          return callBack(results);
        }
      }
    );
  },
  getUserById: (id, callBack) => {
    pool.query(
      `select id,first_name,last_name,email,number from registration where id=?`,
      [id],
      (error, results, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, results);
      }
    );
  },
  updateUser: (data, callBack) => {
    pool.query(
      `update registration set firstName=?, lastName=?,gender=?, email=?, password=?,number=? where id=?`,
      [
        data.first_name,
        data.last_name,
        data.gender,
        data.email,
        data.password,
        data.number,
        data.id,
      ],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]); // if error occurs then remove the array0 = [0]
      }
    );
  },
  deleteUser: (data, callBack) => {
    pool.query(
      `delete from registration where id=?`,
      [data.id],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]);
      }
    );
  },
  getUserByEmail: (email, callBack) => {
    pool.query(
      `select * from registration where email = ?`,
      [email],
      (error, result, fields) => {
        if (error) {
          return callBack(error);
        }
        return callBack(null, result[0]); // this will work with result[0]
      }
    );
  },
};
