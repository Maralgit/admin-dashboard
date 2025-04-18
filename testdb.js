const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://admin:fnykxBoArDbP9979@cluster0.mett7.mongodb.net/ecommerce?retryWrites=true&w=majority";

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: 'ecommerce',
      bufferCommands: false,
    });
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error);
  }
}

connectDB();
