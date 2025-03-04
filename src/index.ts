import app from "./setup/backend.setup"; // Import the Express app
import { databaseSetup } from "./setup"; // Import the database setup function

const startServer = async () => {
  try {
    await databaseSetup(); // Initialize Database Before Starting the API
    console.log("✅ Database connected successfully!");
  } catch (error) {
    console.error("❌ Failed to connect to the database:", error);
  }
};

startServer(); // Run database setup

export default app; // Export Express app for Vercel
