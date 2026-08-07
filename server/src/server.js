require("dotenv").config();

require("./models/index");

const app = require("./app");
const sequelize = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Automatically update database tables to match models
    await sequelize.sync({ alter: true });

    console.log("✅ Database synchronized");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });

  } catch (error) {
    console.error("❌ Failed to start server");
    console.error(error);
  }
}

startServer();