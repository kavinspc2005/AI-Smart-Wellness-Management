const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {
    addWater,
    getWater,
    deleteWater
} = require("../controllers/waterController");


// Add water
router.post("/", protect, addWater);


// Get water records
router.get("/", protect, getWater);


// Delete water record
router.delete("/:id", protect, deleteWater);


module.exports = router;