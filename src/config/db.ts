import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || "";
    const dbName = process.env.DB_NAME || "ebus"; 
    await mongoose.connect(uri, { dbName });
    console.log(`MongoDB Connected to database: ${dbName}`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectDB;
