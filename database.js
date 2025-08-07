//Database connection file, using MongoDB

const mongoose = require('mongoose');

//TODO: later when deploying make MONGODB_URI; for now using local
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/placesapp';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('Connected to mongoDB');
  }
  catch (err) {
    console.error('Failed to connect to MongoDB', err);
    //stop Node.js if fail
    process.exit(1);
  }
};

//export connectDB func for server.js
module.exports = connectDB;
