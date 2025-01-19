const express = require("express");
const passport = require("passport");
const router = express.Router();

// Google OAuth login route
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.readonly",
    ],
  })
);

// Google OAuth callback route
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login`,
    successRedirect: process.env.CLIENT_URL,
  })
);

// Check authentication status
router.get("/check", (req, res) => {
  if (req.isAuthenticated()) {
    res.json({
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
    });
  } else {
    res.status(401).json({ error: "Not authenticated" });
  }
});

module.exports = router;