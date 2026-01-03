const express = require('express');
const githubService = require('../services/github.service');
const { optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   GET /api/github/:username
// @desc    Get GitHub user profile
router.get('/:username', optionalAuth, async (req, res) => {
  try {
    const profile = await githubService.getUserProfile(req.params.username);
    
    res.json({
      success: true,
      data: profile
    });
  } catch (error) {
    console.error('Get GitHub profile error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/github/:username/repos
// @desc    Get user repositories
router.get('/:username/repos', optionalAuth, async (req, res) => {
  try {
    const repos = await githubService.getUserRepos(req.params.username);
    
    res.json({
      success: true,
      count: repos.length,
      data: repos
    });
  } catch (error) {
    console.error('Get repositories error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/github/:username/activity
// @desc    Get recent GitHub activity
router.get('/:username/activity', optionalAuth, async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const activity = await githubService.getRecentActivity(req.params.username, limit);
    
    res.json({
      success: true,
      count: activity.length,
      data: activity
    });
  } catch (error) {
    console.error('Get activity error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
