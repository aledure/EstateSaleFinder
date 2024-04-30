const express = require('express'); // import express
const app = express(); // create express app
require('dotenv').config();
const connectToDB = require('./db/mongoose');

// * CONFIG
const PORT = 5000; // port number
const SERVER_URL = `http://localhost:${PORT}`; // server url

// * ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// * LISTEN
const start = async () => {
  try {
    await connectToDB(process.env.MONGODB_URL); // connect to database

    // listen to port only if database connection is successful
    app.listen(PORT, () => {
      console.log(`Server is running at: ${SERVER_URL}`);
    });
  } catch (err) {
    console.log(err); // log error
  }
};

start();
