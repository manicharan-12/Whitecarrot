const User = require("../models/User");

const checkAuthStatus = (req, res) => {
  console.log(req.user) 
  if (req.isAuthenticated()) {
    return res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  }
  res.status(401).json({ error: "Not authenticated" });
};

const logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }
    res.json({ message: "Logged out successfully" });
  });
};

module.exports = {
  checkAuthStatus,
  logout,
};
