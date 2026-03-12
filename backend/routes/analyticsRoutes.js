const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getSummary } = require("../controllers/analyticsController");

router.get("/summary", protect, getSummary);

module.exports = router;
