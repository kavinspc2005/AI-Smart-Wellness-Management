const express = require("express");
const router = express.Router();

const { protect, adminOnly } = require("../middleware/authMiddleware");

const {
    getAllUsers,
    getAllProfiles
} = require("../controllers/adminController");

router.get("/users", protect, adminOnly, getAllUsers);
router.get("/profiles", protect, adminOnly, getAllProfiles);

module.exports = router;