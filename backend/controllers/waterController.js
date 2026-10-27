const Water = require("../models/Water");


// =========================
// ADD WATER
// =========================

const addWater = async (req, res) => {

    try {

        const { amount, date } = req.body;

        const water = await Water.create({

            userId: req.user.userId,

            amount: amount,

            date: date || new Date().toLocaleDateString()

        });

        res.status(201).json({

            message: "Water intake added successfully",

            water: water

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// GET WATER
// =========================

const getWater = async (req, res) => {

    try {

        const waterRecords = await Water.find({

            userId: req.user.userId

        }).sort({ createdAt: 1 });


        res.json(waterRecords);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// DELETE WATER
// =========================

const deleteWater = async (req, res) => {

    try {

        const water = await Water.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.userId

        });


        if (!water) {

            return res.status(404).json({

                message: "Water record not found"

            });

        }


        res.json({

            message: "Water record deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// EXPORT
// =========================

module.exports = {

    addWater,
    getWater,
    deleteWater

};