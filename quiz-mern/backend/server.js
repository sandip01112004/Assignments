// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');
const quizRoutes = require('./src/routes/quizRoutes');
const errorHandler = require('./src/middleware/errorHandler');

const app = express();

// CORS: allow requests from frontend dev origin (adjust if needed)
// If you want to allow any origin during dev you can use: app.use(cors());
const corsOptions = {
  origin: process.env.FRONTEND_ORIGIN || 'http://localhost:5173',
  credentials: true,
};
app.use(cors(corsOptions));

app.use(express.json());

// Connect to DB
connectDB();

// Health
app.get('/', (req, res) => res.json({ status: 'ok', message: 'Quiz backend running' }));

// API
app.use('/api/quizzes', quizRoutes);

// 404 handler
app.use((req, res) => res.status(404).json({ error: 'Not Found' }));

// Error handler (must be last)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
