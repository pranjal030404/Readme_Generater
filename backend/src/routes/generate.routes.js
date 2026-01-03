const express = require('express');
const MarkdownGenerator = require('../services/markdown.service');
const Template = require('../models/Template.model');
const Preview = require('../models/Preview.model');
const crypto = require('crypto');
const { optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

// @route   POST /api/generate
// @desc    Generate markdown from template data
router.post('/', optionalAuth, async (req, res) => {
  try {
    const generator = new MarkdownGenerator(req.body);
    const markdown = generator.generate();
    
    res.json({
      success: true,
      markdown
    });
  } catch (error) {
    console.error('Generate markdown error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to generate markdown'
    });
  }
});

// @route   POST /api/generate/preview
// @desc    Create shareable preview
router.post('/preview', optionalAuth, async (req, res) => {
  try {
    const generator = new MarkdownGenerator(req.body);
    const markdown = generator.generate();
    
    const shareId = crypto.randomBytes(16).toString('hex');
    
    const preview = await Preview.create({
      templateId: req.body._id || null,
      shareId,
      content: markdown
    });
    
    res.json({
      success: true,
      shareId,
      url: `${process.env.FRONTEND_URL}/preview/${shareId}`
    });
  } catch (error) {
    console.error('Create preview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create preview'
    });
  }
});

// @route   GET /api/generate/preview/:shareId
// @desc    Get preview by share ID
router.get('/preview/:shareId', async (req, res) => {
  try {
    const preview = await Preview.findOne({ shareId: req.params.shareId });
    
    if (!preview) {
      return res.status(404).json({
        success: false,
        message: 'Preview not found'
      });
    }
    
    // Increment views
    preview.views += 1;
    await preview.save();
    
    res.json({
      success: true,
      data: {
        content: preview.content,
        views: preview.views,
        createdAt: preview.createdAt
      }
    });
  } catch (error) {
    console.error('Get preview error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch preview'
    });
  }
});

// @route   POST /api/generate/export
// @desc    Export markdown as file
router.post('/export', optionalAuth, (req, res) => {
  try {
    const generator = new MarkdownGenerator(req.body);
    const markdown = generator.generate();
    
    res.setHeader('Content-Type', 'text/markdown');
    res.setHeader('Content-Disposition', 'attachment; filename="README.md"');
    res.send(markdown);
  } catch (error) {
    console.error('Export error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export markdown'
    });
  }
});

module.exports = router;
