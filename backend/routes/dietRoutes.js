const express = require("express");

const router = express.Router();

const {protect} = require("../middleware/authMiddleware");

const {
    createDiet,
    getMyDiets
} = require("../controllers/dietController");


// Save Diet Plan
router.post("/", protect, createDiet);


// Get My Diet Plans
router.get("/", protect, getMyDiets);


module.exports = router;