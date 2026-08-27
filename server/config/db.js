const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    mongoose.set('bufferCommands', false);
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/almuflihon_db', {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`🌿 MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(`⚠️ MongoDB Offline Mode: ${error.message}`);
    console.log('ℹ️ Server will continue running with instant standalone fallback responses.');
  }
};

module.exports = connectDB;
