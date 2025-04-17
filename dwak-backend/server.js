const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const authRoutes = require('./routes/auth'); // Import the routes

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());  // Enable CORS for cross-origin requests
app.use(express.json()); // Parse JSON bodies

// Routes
app.use('/api/auth', authRoutes); // Use the authRoutes for the /api/auth path

// Default route
app.get('/', (req, res) => {
  res.send('DWAK Backend is running');
});

// Server listening
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
