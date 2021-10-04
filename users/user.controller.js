const {
  create,
  getUserById,
  updateUser,
  deleteUser,
  getUser,
  getUserByEmail,
} = require("./user.service");

const { genSaltSync, hashSync } = require("bcryptjs");
const { sign } = require("jsonwebtoken");

module.exports = {
  createUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);
    create(body, (err, results) => {
      if (err) {
        return res.status(500).json({ success: 0, message: err.message });
      }
      console.log(JSON.stringify(results));
      return res.status(200).json({ success: 1, data: results });
    });
  },
  getUserById: (req, res) => {
    const id = req.params.id;
    getUserById(id, (err, results) => {
      if (err) {
        return console.error(err);
      }
      if (!results) {
        return res.json({ success: 0, message: "record not found" });
      } else {
        return res.json({ success: 1, message: "record found", data: results });
      }
    });
  },
  getUser: (req, res) => {
    getUser((err, results) => {
      if (err) {
        console.error(err);
        return res.status(400);
      }
      if (!results) {
        return res.json({ success: 0, message: "record not found" });
      }
      return res.json({ success: 1, data: results });
    });
  },
  updateUser: (req, res) => {
    const body = req.body;
    const salt = genSaltSync(10);
    body.password = hashSync(body.password, salt);

    updateUser(body, (err, result) => {
      if (err) {
        return res.json({ success: 0, message: "error found" });
      }
      if (!result) {
        return res.json({ success: 0, message: "cant update" });
      }

      return res.json({ success: 1, data: results });
    });
  },
  deleteUser: (req, res) => {
    const data = req.body;
    deleteUser(data, (err, result) => {
      if (err) {
        return console.error(err);
      }
      if (!result) {
        return res.status(500).json({ success: 0, message: "user not found" });
      }
      return res.json({ success: 1, message: "usr deleted" });
    });
  },
  login: (req, res) => {
    const body = req.body;
    getUserByEmail(body.email, (err, results) => {
      if (err) {
        return console.error(err);
      }
      if (!results) {
        return res.json({ success: 0, message: "no user found" });
      }
      const result = compareSync(body.password, results.password);
      if (result) {
        results.password = undefined;
        const jsonToken = sign({ result: results }, "abs123", {
          // sign takes 3 args , first is data second is key to wrap the data and third is time, after certain time it will get expire
          expiresIn: "2h",
        });
        return res.json({
          success: 1,
          message: "login success",
          token: jsonToken,
        });
      } else {
        return res.json({ success: 0, data: "invalid login" });
      }
    });
  },
};
