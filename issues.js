// routes/issues.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const pool = require('../db');

const router = express.Router();

// File storage config
const storage = multer.diskStorage({
  destination: 'uploads/',
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s+/g, '-');
    cb(null, uniqueName);
  }
});

const upload = multer({ storage });

// POST route to handle issue submission
router.post('/submit-issue', upload.single('image'), async (req, res) => {
  try {
    const { title, description, location } = req.body;
    const imagePath = req.file ? req.file.filename : null;

    const query = `
      INSERT INTO issues (title, description, image_path, location)
      VALUES ($1, $2, $3, $4)
    `;
    await pool.query(query, [title, description, imagePath, location]);

    res.status(200).send('Issue submitted successfully!');
  } catch (err) {
    console.error('Error in /submit-issue:', err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
