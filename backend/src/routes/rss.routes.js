const express = require('express');
const rssService = require('../services/rss.service');
const { optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   POST /api/rss/parse
// @desc    Parse RSS feed
router.post('/parse', optionalAuth, async (req, res) => {
  try {
    const { source, username, customUrl, maxItems } = req.body;
    
    if (!source) {
      return res.status(400).json({
        success: false,
        message: 'Source is required'
      });
    }

    const feed = await rssService.getBlogPosts(source, username, customUrl, maxItems);
    
    res.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Parse RSS error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/rss/devto/:username
// @desc    Get Dev.to posts
router.get('/devto/:username', optionalAuth, async (req, res) => {
  try {
    const maxItems = parseInt(req.query.limit) || 5;
    const feed = await rssService.getDevToPosts(req.params.username, maxItems);
    
    res.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Get Dev.to posts error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/rss/medium/:username
// @desc    Get Medium posts
router.get('/medium/:username', optionalAuth, async (req, res) => {
  try {
    const maxItems = parseInt(req.query.limit) || 5;
    const feed = await rssService.getMediumPosts(req.params.username, maxItems);
    
    res.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Get Medium posts error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// @route   GET /api/rss/hashnode/:username
// @desc    Get Hashnode posts
router.get('/hashnode/:username', optionalAuth, async (req, res) => {
  try {
    const maxItems = parseInt(req.query.limit) || 5;
    const feed = await rssService.getHashnodePosts(req.params.username, maxItems);
    
    res.json({
      success: true,
      data: feed
    });
  } catch (error) {
    console.error('Get Hashnode posts error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
