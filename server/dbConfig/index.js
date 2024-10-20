const mongoose = require("mongoose")

const Connect = () => {
    // MongoDB connection URI
const mongoURI = 'mongodb://localhost:27017/E_learn_database';

// Connect to MongoDB
mongoose.connect(mongoURI);

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
}

module.exports = Connect