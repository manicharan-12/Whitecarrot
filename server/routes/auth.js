const express = require("express");
const passport = require("passport");
const router = express.Router();
const authController = require("../controllers/authController");

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
router.get("/check", authController.checkAuthStatus);

module.exports = router;
