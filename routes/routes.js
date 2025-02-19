const express = require('express');
const path = require('path');
const { readData } = require('../data/fileOperations');
const { urlShorten } = require('../services/shorten');
const {
  handleNotFound,
  handleServerError,
  handleBadRequest,
} = require('../services/errorHandler');

const router = express.Router();

const filePath = path.join(__dirname, '../data/urls.json');

// POST /shorten - Shorten a URL
router.post('/shorten', async (req, res) => {
  const longUrl = req.body.url;

  if (!longUrl) {
    return handleBadRequest(res, 'Long URL is required');
  }

  try {
  
    const {
      urlCode,
      longUrl: originalUrl,
      shortUrl,
    } = await urlShorten(filePath, longUrl);

    res.json({
      urlCode,
      longUrl: originalUrl,
      shortUrl,
    });
  } catch (err) {
    console.error('Error in POST /shorten:', err);
    return handleServerError(res, 'Internal Server Error');
  }
});

// GET 
router.get('/:shortCode', async (req, res) => {
  const { shortCode } = req.params;

  try {
    const data = await readData(filePath);
    const longUrl = data[shortCode];

    if (!longUrl) {
      return handleNotFound(res, 'Short URL not found');
    }

    res.redirect(longUrl);
  } catch (err) {
    console.error('Error in GET /:shortCode:', err);

    return handleServerError(res, 'Internal Server Error');
  }
});

module.exports = router;
