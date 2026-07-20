const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const mediaRoutes = require("./routes/mediaRoutes");
const userRoutes = require("./routes/userRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const creatorRoutes = require("./routes/creatorRoutes");
const app = express();
const followRoutes = require("./routes/followRoutes");

app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static("src/uploads"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/media", mediaRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/users", userRoutes);
app.use("/api/creators", creatorRoutes);
app.use("/api/follows", followRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to MHC API 🚀",
  });
});

module.exports = app;