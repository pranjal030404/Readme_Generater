const express = require('express');
const githubService = require('../services/github.service');
const wakatimeService = require('../services/wakatime.service');
const { optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   GET /api/stats/:username
// @desc    Get comprehensive GitHub statistics
router.get('/:username', optionalAuth, async (req, res) => {
  try {
    const stats = await githubService.getUserStats(req.params.username);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/stats/wakatime/:username
// @desc    Get WakaTime statistics
router.get('/wakatime/:username', optionalAuth, async (req, res) => {
  try {
    const stats = await wakatimeService.getUserStats(req.params.username);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get WakaTime stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/stats/wakatime/:username/all-time
// @desc    Get WakaTime all-time statistics
router.get('/wakatime/:username/all-time', optionalAuth, async (req, res) => {
  try {
    const stats = await wakatimeService.getAllTimeStats(req.params.username);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Get all-time stats error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
