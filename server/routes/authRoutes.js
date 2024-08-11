const express = require('express');
const router = express.Router();
const cors = require('cors');
const { registerUser, test, getProfile, logoutUser, loginUser } = require('../controllers/authCotroller');

// middleware
import cors from 'cors';

const allowedOrigins = [
  'http://localhost:5173',
  'https://e-learning-qk1g.onrender.com'
];

router.use(
  cors({
    credentials: true,
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        // Allow requests with no origin (like mobile apps or curl requests)
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  })
);

// Routes
router.get('/', test)
router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', getProfile)
router.post('/logout', logoutUser);


module.exports = {
    test,
    registerUser,
    loginUser,
    getProfile,
    logoutUser,
    getProfile
};

module.exports = router
