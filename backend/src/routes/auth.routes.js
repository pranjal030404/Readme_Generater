const express = require('express');
const jwt = require('jsonwebtoken');
const passport = require('../config/passport');
const { authenticateJWT } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   GET /api/auth/github
// @desc    Initiate GitHub OAuth
router.get('/github', passport.authenticate('github', { 
  scope: ['user:email', 'read:user'] 
}));

// @route   GET /api/auth/github/callback
// @desc    GitHub OAuth callback
router.get('/github/callback',
  passport.authenticate('github', { session: false, failureRedirect: '/login' }),
  (req, res) => {
    try {
      // Generate JWT token
      const token = jwt.sign(
        { id: req.user._id, email: req.user.email },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRE || '7d' }
      );
      
      // Redirect to frontend with token
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
      res.redirect(`${frontendUrl}/auth/callback?token=${token}`);
    } catch (error) {
      console.error('Auth callback error:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

// @route   GET /api/auth/user
// @desc    Get current user
router.get('/user', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      avatar: req.user.avatar,
      username: req.user.username,
      bio: req.user.bio,
      location: req.user.location,
      website: req.user.website,
      githubProfile: req.user.githubProfile
    }
  });
});

// @route   POST /api/auth/logout
// @desc    Logout user
router.post('/logout', authenticateJWT, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

// @route   POST /api/auth/guest
// @desc    Create guest session
router.post('/guest', async (req, res) => {
  try {
    const User = require('../models/User.model');
    
    // Create temporary guest user
    const guestUser = await User.create({
      email: `guest_${Date.now()}@temporary.com`,
      name: 'Guest User',
      isGuest: true
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: guestUser._id, email: guestUser.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      data: {
        id: guestUser._id,
        name: guestUser.name,
        isGuest: true
      }
    });
  } catch (error) {
    console.error('Guest creation error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create guest session'
    });
  }
});

module.exports = router;
