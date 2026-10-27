const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {
    addSleep,
    getSleep,
    deleteSleep
} = require("../controllers/sleepController");


// Add sleep
router.post("/", protect, addSleep);


// Get sleep records
router.get("/", protect, getSleep);


// Delete sleep record
router.delete("/:id", protect, deleteSleep);


module.exports = router;