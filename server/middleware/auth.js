const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    console.log(req.user)
    return next();
  }
  res.status(401).json({ error: "Authentication required" });
};

module.exports = {
  isAuthenticated,
};
