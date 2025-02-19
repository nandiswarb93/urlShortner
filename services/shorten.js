const { readData, writeData } = require('../data/fileOperations');
const crypto = require('crypto');

const urlShorten = async (filePath, longUrl) => {
  try {
    // Generate unique URL code and short URL
    const urlCode = crypto.randomBytes(4).toString('hex');
    const shortUrl = `http://localhost:3000/${urlCode}`;

    // Read the current URL mappings
    const data = await readData(filePath);

    // Add the new short URL to the data
    data[urlCode] = longUrl;

    // Save the updated data back to the file
    await writeData(filePath, data);

    // Return the results
    return { urlCode, longUrl, shortUrl };
  } catch (err) {
    console.error('Error in logic function:', err);
    throw new Error('Failed to shorten the URL');
  }
};

module.exports = { urlShorten };
