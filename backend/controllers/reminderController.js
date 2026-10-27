const Reminder = require("../models/Reminder");


// =========================
// CREATE REMINDER
// =========================

const createReminder = async (req, res) => {

    try {

        const { type, time, icon } = req.body;

        const reminder = await Reminder.create({
            userId: req.user.userId,
            type,
            time,
            icon
        });

        res.status(201).json({
            message: "Reminder added successfully",
            reminder
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// =========================
// GET USER REMINDERS
// =========================

const getReminders = async (req, res) => {

    try {

        const reminders = await Reminder.find({
            userId: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(reminders);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// =========================
// DELETE REMINDER
// =========================

const deleteReminder = async (req, res) => {

    try {

        const reminder =
            await Reminder.findOneAndDelete({
                _id: req.params.id,
                userId: req.user.userId
            });

        if (!reminder) {

            return res.status(404).json({
                message: "Reminder not found"
            });

        }

        res.json({
            message: "Reminder deleted successfully"
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
    createReminder,
    getReminders,
    deleteReminder
};