const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors())
app.use(express.json()); // Parse JSON requests

// Database connection
const conn = require('./database/db');
mongoose.connect(conn.url)
  .then(() => {
    console.log("Database Connected Successfully!!");
  })
  .catch(err => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

// Export app for use in server.js
module.exports = app;
