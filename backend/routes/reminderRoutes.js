const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {
    createReminder,
    getReminders,
    deleteReminder
} = require("../controllers/reminderController");


// Create reminder
router.post("/", protect, createReminder);


// Get logged-in user's reminders
router.get("/", protect, getReminders);


// Delete reminder
router.delete("/:id", protect, deleteReminder);


module.exports = router;