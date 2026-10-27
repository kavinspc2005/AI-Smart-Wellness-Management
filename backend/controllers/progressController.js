const Progress = require("../models/Progress");


// =========================
// ADD PROGRESS
// =========================

const addProgress = async (req, res) => {

    try {

        const { weight, bmi, date } = req.body;

        const progress = await Progress.create({

            userId: req.user.userId,

            weight: weight,

            bmi: bmi,

            date: date || new Date().toLocaleDateString()

        });

        res.status(201).json({

            message: "Progress added successfully",

            progress: progress

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// GET PROGRESS
// =========================

const getProgress = async (req, res) => {

    try {

        const progress = await Progress.find({

            userId: req.user.userId

        }).sort({ createdAt: 1 });


        res.json(progress);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// DELETE PROGRESS
// =========================

const deleteProgress = async (req, res) => {

    try {

        const progress = await Progress.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.userId

        });


        if (!progress) {

            return res.status(404).json({

                message: "Progress record not found"

            });

        }


        res.json({

            message: "Progress deleted successfully"

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


module.exports = {

    addProgress,

    getProgress,

    deleteProgress

};