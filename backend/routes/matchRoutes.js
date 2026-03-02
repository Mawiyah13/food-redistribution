const express = require("express");
const router = express.Router();
const {
  getMatches,
  createMatch,
  completeMatch,
  cancelMatch,
  getNotificationStatus,
} = require("../controllers/matchController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", protect, getMatches);
router.post("/", protect, createMatch);
router.get("/notifications", protect, getNotificationStatus);
router.patch("/:id/complete", protect, completeMatch);
router.patch("/:id/cancel", protect, cancelMatch);

module.exports = router;