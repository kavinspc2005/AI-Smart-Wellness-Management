const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        age: Number,
        gender: String,
        height: Number,
        weight: Number,
        activityLevel: String,
        foodPreference: String,
        healthGoal: String,
        bmi: Number,
        healthCategory: String
    },
    {
        timestamps: true
    }
);





module.exports = mongoose.model("Profile", profileSchema);

