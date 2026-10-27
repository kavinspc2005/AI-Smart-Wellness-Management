const mongoose = require("mongoose");

const dietSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        breakfast: {
            type: String,
            required: true
        },

        lunch: {
            type: String,
            required: true
        },

        dinner: {
            type: String,
            required: true
        },

        snacks: {
            type: String
        },

        calories: {
            type: Number
        },

        foodPreference: {
            type: String
        },

        healthGoal: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Diet", dietSchema);