/**
 * @file Manages the MongoDB database connection using Mongoose.
 * @module utils/db.util
 */

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("Fatal Error: MONGO_URI is not defined in the environment variables.");
  process.exit(1);
}

/**
 * Connects to the MongoDB database.
 * @async
 * @function connectDB
 * @returns {Promise<void>}
 */
export async function connectDB() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected successfully.');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
    process.exit(1);
  }
}
