const Profile = require("../models/Profile");

const saveProfile = async (req, res) => {
    try {

        const profile = await Profile.findOneAndUpdate(
            { userId: req.user.userId },
            {
                ...req.body,
                userId: req.user.userId
            },
            {
                new: true,
                upsert: true
            }
        );

        res.json({
            message: "Profile saved successfully",
            profile
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


const getProfile = async (req, res) => {
    try {

        const profile = await Profile.findOne({
            userId: req.user.userId
        });

        if (!profile) {
            return res.status(404).json({
                message: "Profile not found"
            });
        }

        res.json(profile);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    saveProfile,
    getProfile
};