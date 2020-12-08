const jwt = require("jsonwebtoken");

module.exports = {
  authenticateJWT: (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      try {
        jwt.verify(token, process.env.JWT_SECRET);
        next();
      } catch (err) {
        res.status(403);
        res.send({ message: "Forbidden" });
      }
    } else {
      res.status(401);
      res.send({ message: "Unauthorized" });
    }
  },
};
