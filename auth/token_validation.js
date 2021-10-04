const { verify } = require("jsonwebtoken");

module.exports = {
  checkToken: (req, res, next) => {
    let token = req.get("authorization");
    if (token) {
      token = token.slice(7);
      verify(token, "adc123", (err, decoded) => {
        if (err) {
          res.json({ success: false, message: "Access denied" });
        } else {
          next();
        }
      });
    } else {
      res.json({ success: false, message: "Access denied" });
    }
  },
};
