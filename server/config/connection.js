require('dotenv').config(); 

const mongoose = require('mongoose');

const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/googlebooks';

// Connect to MongoDB using the URI
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

module.exports = mongoose.connection;
