const jwt = require("jsonwebtoken");
require("dotenv").config();
/* Vérification du token */
const checkTokenMiddleware = (req, res, next) => {
  // Récupération du token
  const token = req.headers.authorization.split(" ");

  // Présence d'un token
  if (!token[1]) {
    return res.status(401).json({ message: "Error. Need a token" });
  }
  // Véracité du token
  jwt.verify(token[1], process.env.SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({ message: "Error. Bad token" });
    } else {
      return next();
    }
  });
};

module.exports = checkTokenMiddleware;
