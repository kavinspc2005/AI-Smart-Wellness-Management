const mongoose = require("mongoose");

const workoutSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        type: {
            type: String,
            required: true
        },

        duration: {
            type: Number,
            required: true
        },

        calories: {
            type: Number,
            required: true
        },

        date: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model("Workout", workoutSchema);