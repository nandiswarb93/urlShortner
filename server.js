const express = require('express');
const path = require('path');
const shortenerRoutes = require('./routes/routes.js');
const { ensureFileExists } = require('./data/fileOperations.js');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());

const PORT = process.env.port;
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    const database = client.db('college');
    const collection = database.collection('department');
    const result = await collection.updateOne(
      { name: 'chennai' },
      { $set: { name: 'madras' } }
    );

    console.log('Document Inserted', result.updatedID);
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  } finally {
    await client.close();
  }
}

connectToMongoDB();

const filePath = path.join(__dirname, 'data', 'urls.json');
ensureFileExists(filePath);

app.use('/', shortenerRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
