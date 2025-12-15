// backend/middleware/auth.js
const jwt = require("jsonwebtoken");

module.exports = function auth(req, res, next) {
  try {
    const header = req.headers.authorization || "";
    const token = header.startsWith("Bearer ") ? header.slice(7) : null;

    if (!token) return res.status(401).json({ error: "Unauthorized (no token)" });

    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev_secret_change_me");
    req.user = payload;

    return next();
  } catch (e) {
    return res.status(401).json({ error: "Unauthorized (invalid token)" });
  }
};
