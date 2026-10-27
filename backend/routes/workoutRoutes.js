const express = require("express");

const router = express.Router();

const {protect} =
    require("../middleware/authMiddleware");

const {
    addWorkout,
    getWorkouts,
    deleteWorkout
} = require("../controllers/workoutController");


// Add workout
router.post(
    "/",
    protect,
    addWorkout
);


// Get user's workouts
router.get(
    "/",
    protect,
    getWorkouts
);


// Delete workout
router.delete(
    "/:id",
    protect,
    deleteWorkout
);


module.exports = router;