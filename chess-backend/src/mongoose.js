import mongoose from "mongoose";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

// Retrieve MongoDB username and passcode from environment variables
const MONGO_USERNAME = process.env.MONGO_USERNAME;
const MONGO_PASSCODE = process.env.MONGO_PASSCODE;

// Construct the MongoDB URI dynamically using the username and passcode
const MONGO_URI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSCODE}@cluster0.obth8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.set("strictQuery", false);

const connectDatabase = async () => {
  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log("Connected to database");
    } catch (error) {
      console.log("Error while connecting to DB", error.message);
      process.exit(1); // Exit if connection fails
    }
  }
};

// Call the function to connect to the database
connectDatabase();
