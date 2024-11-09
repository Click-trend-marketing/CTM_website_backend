const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Allow CORS from live and local environments
const corsOptions = {
  origin: [
    'https://clicktrendmarketing.com', // Live URL
    'http://localhost:4000',           // Local environment
    'http://localhost:3000',           // Local development (React default)
  ], 
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
};

app.use(cors(corsOptions)); // Apply CORS middleware globally
app.use(express.json());    // Parse JSON requests

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
