const mongoose = require('mongoose');

// Set a longer timeout for the connection attempt
const connectWithRetry = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    await mongoose.connect(process.env.MONGO_URL || 'mongodb://127.0.0.1/v26', {
      serverSelectionTimeoutMS: 15000, // Increase timeout to 15 seconds
      socketTimeoutMS: 45000, // Increase socket timeout to 45 seconds
    });
    console.log('✅ MongoDB connected successfully');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    console.log('Will retry connection in 5 seconds...');
    setTimeout(connectWithRetry, 5000);
  }
};

// Initial connection attempt
connectWithRetry();

module.exports = mongoose;