const User = require("../models/User");
const Profile = require("../models/Profile");

// Get all registered users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select("-password")
            .sort({ createdAt: -1 });

        res.json({
            totalUsers: users.length,
            users
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

// Get all user health profiles
const getAllProfiles = async (req, res) => {
    try {
        const profiles = await Profile.find()
            .populate("userId", "name email");

        res.json(profiles);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    getAllUsers,
    getAllProfiles
};