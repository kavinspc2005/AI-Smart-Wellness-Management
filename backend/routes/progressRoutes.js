const express = require("express");

const router = express.Router();

const {
    addProgress,
    getProgress,
    deleteProgress
} = require("../controllers/progressController");

const { protect: authMiddleware } =
    require("../middleware/authMiddleware");


// Add progress
router.post(
    "/",
    authMiddleware,
    addProgress
);


// Get progress
router.get(
    "/",
    authMiddleware,
    getProgress
);


// Delete progress
router.delete(
    "/:id",
    authMiddleware,
    deleteProgress
);


module.exports = router;