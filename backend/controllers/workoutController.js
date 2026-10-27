const Workout = require("../models/Workout");


// ========================================
// ADD WORKOUT
// ========================================

const addWorkout = async (req, res) => {

    try {

        const {
            type,
            duration,
            calories,
            date
        } = req.body;


        const workout = await Workout.create({

            userId: req.user.userId,

            type: type,

            duration: duration,

            calories: calories,

            date: date

        });


        res.status(201).json({

            message: "Workout added successfully",

            workout: workout

        });


    } catch (error) {

        console.error(
            "Add Workout Error:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

};



// ========================================
// GET WORKOUTS
// ========================================

const getWorkouts = async (req, res) => {

    try {

        const workouts =
            await Workout.find({
                userId: req.user.userId
            }).sort({
                createdAt: -1
            });


        res.json(workouts);


    } catch (error) {

        console.error(
            "Get Workout Error:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

};



// ========================================
// DELETE WORKOUT
// ========================================

const deleteWorkout = async (req, res) => {

    try {

        const workout =
            await Workout.findOneAndDelete({

                _id: req.params.id,

                userId: req.user.userId

            });


        if (!workout) {

            return res.status(404).json({

                message: "Workout not found"

            });

        }


        res.json({

            message:
                "Workout deleted successfully"

        });


    } catch (error) {

        console.error(
            "Delete Workout Error:",
            error
        );

        res.status(500).json({

            message: error.message

        });

    }

};



// ========================================
// EXPORT
// ========================================

module.exports = {

    addWorkout,

    getWorkouts,

    deleteWorkout

};