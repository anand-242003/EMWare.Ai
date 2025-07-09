// server.js
import express from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());

console.log('GOOGLE_API_KEY:', process.env.GOOGLE_API_KEY); // Debug

// Proxy for Place Text Search
app.get('/api/place/textsearch', async (req, res) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/textsearch/json',
      {
        params: {
          ...req.query,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Text Search Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch place data' });
  }
});

// Proxy for Place Details
app.get('/api/place/details', async (req, res) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/details/json',
      {
        params: {
          ...req.query,
          key: process.env.GOOGLE_API_KEY,
        },
      }
    );
    res.json(response.data);
  } catch (error) {
    console.error('Details Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch place details' });
  }
});

// Proxy for Place Photo
app.get('/api/place/photo', async (req, res) => {
  try {
    const response = await axios.get(
      'https://maps.googleapis.com/maps/api/place/photo',
      {
        params: {
          ...req.query,
          key: process.env.GOOGLE_API_KEY,
        },
        responseType: 'stream',
      }
    );
    res.json({ url: response.request.res.responseUrl });
  } catch (error) {
    console.error('Photo Proxy Error:', error.message);
    res.status(500).json({ error: 'Failed to fetch photo' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`);
});