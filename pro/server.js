const express = require('express');
const cors = require('cors');
const path = require('path');
const issuesRoute = require('./routes/issues');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Serve frontend files from /public
app.use(express.static(path.join(__dirname, 'public')));

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); // To serve uploaded images

// API routes
app.use('/', issuesRoute);

// Fallback: send dashboard.html for /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
