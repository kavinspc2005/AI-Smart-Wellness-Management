
const Sleep = require("../models/Sleep");


// =========================
// ADD SLEEP
// =========================

const addSleep = async (req, res) => {

    try {

        const { hours, date } = req.body;

        const sleep = await Sleep.create({

            userId: req.user.userId,

            hours: hours,

            date: date || new Date().toLocaleDateString()

        });

        res.status(201).json({

            message: "Sleep record added successfully",

            sleep: sleep

        });

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// GET SLEEP
// =========================

const getSleep = async (req, res) => {

    try {

        const sleepRecords = await Sleep.find({

            userId: req.user.userId

        }).sort({ createdAt: 1 });


        res.json(sleepRecords);

    } catch (error) {

        res.status(500).json({

            message: error.message

        });

    }

};


// =========================
// DELETE SLEEP
// =========================

const deleteSleep = async (req, res) => {

    try {

        const sleep = await Sleep.findOneAndDelete({

            _id: req.params.id,

            userId: req.user.userId

        });


        if (!sleep) {

            return res.status(404).json({

                message: "Sleep record not found"

            });

        }


        res.json({

            message: "Sleep record deleted successfully"

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

    addSleep,
    getSleep,
    deleteSleep

};
