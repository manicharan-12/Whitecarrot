const jwt = require("jsonwebtoken");
const User = require("../models/User");

const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );
};

const checkAuthStatus = (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Not authenticated" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      id: decoded._id,
      name: decoded.name,
      email: decoded.email,
    });
  } catch (error) {
    res.status(401).json({ error: "Invalid or expired token" });
  }
};

module.exports = {
  generateToken,
  checkAuthStatus,
};
