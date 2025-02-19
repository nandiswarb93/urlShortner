const fs = require('fs').promises;

const ensureFileExists = async (filePath) => {
  try {
    await fs.access(filePath);
  } catch {
    await fs.writeFile(filePath, JSON.stringify({}));
  }
};

const readData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading data:', err.message);
    throw new Error('Failed to read data');
  }
};

const writeData = async (filePath, data) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing data:', err.message);
    throw new Error('Failed to write data');
  }
};

module.exports = { ensureFileExists, readData, writeData };
