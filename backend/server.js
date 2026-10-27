const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

const connectDB = require("./config/db");

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());


// Authentication Routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);





// Profile Routes
const profileRoutes = require("./routes/profileRoutes");

app.use("/api/profile", profileRoutes);


//diet routes
const dietRoutes = require("./routes/dietRoutes");

app.use("/api/diet", dietRoutes);






//AI ROUTES

const aiRoutes = require("./routes/aiRoutes");
app.use("/api/ai", aiRoutes);


// Progress Routes
const progressRoutes =
    require("./routes/progressRoutes");

app.use("/api/progress", progressRoutes);



// Water Routes
const waterRoutes = require("./routes/waterRoutes");

app.use("/api/water", waterRoutes);


// Reminder Routes

const reminderRoutes =
    require("./routes/reminderRoutes");

app.use("/api/reminders", reminderRoutes);


// Sleep Routes
const sleepRoutes = require("./routes/sleepRoutes");

app.use("/api/sleep", sleepRoutes);



// Workout Routes
const workoutRoutes = require("./routes/workoutRoutes");

app.use("/api/workout", workoutRoutes);


// Admin Routes
const adminRoutes = require("./routes/adminRoutes");
app.use("/api/admin", adminRoutes);


// Test Route
app.get("/", (req, res) => {
    res.json({
        message: "AI Smart Wellness Backend is running"
    });
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});