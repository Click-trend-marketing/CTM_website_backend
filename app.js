// app.js
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// ✅ CORS Configuration
app.use(cors({
  origin: ['http://localhost:3000', 'https://clicktrendmarketing.com', 'https://www.clicktrendmarketing.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Optional: If you ever send cookies or use auth headers
}));

// ✅ Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ Serve static files (PDFs, images, etc.)
const uploadDir = path.join(__dirname, 'uploads');
app.use('/uploads', express.static(uploadDir));

// ✅ Database Connection
const conn = require('./database/db');

mongoose.connect(conn.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ Database Connected Successfully!!");
})
.catch(err => {
  console.error('❌ Could not connect to the database', err);
  process.exit(1);
});

module.exports = app;
