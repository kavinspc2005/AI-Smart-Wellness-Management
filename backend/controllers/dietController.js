const Diet = require("../models/Diet");

// Create Diet
const createDiet = async (req, res) => {
    try {

        const diet = await Diet.create({
            ...req.body,
            userId: req.user.userId
        });

        res.status(201).json({
            message: "Diet plan saved successfully",
            diet
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// Get user's Diet Plans
const getMyDiets = async (req, res) => {
    try {

        const diets = await Diet.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(diets);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


module.exports = {
    createDiet,
    getMyDiets
};