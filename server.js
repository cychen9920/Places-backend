//imports
const express = require('express');
const cors = require('cors'); //cross-origin requests
const connectDB = require('./database');
const placesRouter = require('./places');

const startServer = async () => {
  //first, try to connect to mongoDB
  try {
    await connectDB();

    const app = express();
    app.use(cors());
    app.use(express.json()); //for parsing JSON requests

    app.use('/places', placesRouter); //requests to places handled by places.js

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  }
  catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
};

startServer();
