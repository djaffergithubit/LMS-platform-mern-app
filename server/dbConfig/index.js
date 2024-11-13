const mongoose = require("mongoose");

const Connect = () => {
  const mongoURI = process.env.MONGO_URI || 'mongodb://db:27017/E_learn_database';

  // Connect to MongoDB without deprecated options
  mongoose.connect(mongoURI);

  mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
  });

  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
}

module.exports = Connect;
