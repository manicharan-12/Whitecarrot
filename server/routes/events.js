const express = require("express");
const router = express.Router();
const { getEvents } = require("../controllers/eventController");
const { isAuthenticated } = require("../middleware/auth");

// Get events route - protected by authentication
router.get("/", isAuthenticated, getEvents);

module.exports = router;
