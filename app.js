// const express = require ('express');
// const app = express();
// require('dotenv').config()
// const cors = require('cors');


// app.use(express.json())
// app.use(cors()); // Allow all origins or specify your frontend origin


// const conn = require('./database/db');
// const mongoose = require('mongoose');

// mongoose.connect(conn.url).then(() => {
//         console.log("Databse Connected Successfully!!");    
//      }).catch(err => {
//         console.log('Could not connect to the database', err);
//          process.exit();
//      });

// module.exports = app



// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Allow CORS from both live and local environments
const corsOptions = {
  origin: ['http://62.72.30.215:8000', 'http://localhost:4000'], // Live and local origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
};

app.use(cors(corsOptions)); // Apply CORS middleware
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

module.exports = app;
