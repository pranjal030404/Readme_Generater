const express = require('express');
const { authenticateJWT, isOwner } = require('../middleware/auth.middleware');
const Template = require('../models/Template.model');
const crypto = require('crypto');

const router = express.Router();

// @route   POST /api/templates
// @desc    Create new template
router.post('/', authenticateJWT, async (req, res) => {
  try {
    const template = await Template.create({
      userId: req.user._id,
      ...req.body,
      shareId: crypto.randomBytes(16).toString('hex')
    });
    
    res.status(201).json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Create template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create template'
    });
  }
});

// @route   GET /api/templates/user
// @desc    Get current user's templates
router.get('/user', authenticateJWT, async (req, res) => {
  try {
    const templates = await Template.find({ userId: req.user._id })
      .sort({ updatedAt: -1 })
      .select('-__v');
    
    res.json({
      success: true,
      count: templates.length,
      data: templates
    });
  } catch (error) {
    console.error('Get templates error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch templates'
    });
  }
});

// @route   GET /api/templates/:id
// @desc    Get template by ID
router.get('/:id', authenticateJWT, async (req, res) => {
  try {
    const template = await Template.findById(req.params.id);
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    // Check ownership or public visibility
    if (template.userId.toString() !== req.user._id.toString() && 
        template.visibility === 'private') {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }
    
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Get template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template'
    });
  }
});

// @route   PUT /api/templates/:id
// @desc    Update template
router.put('/:id', authenticateJWT, isOwner(Template), async (req, res) => {
  try {
    const updatedTemplate = await Template.findByIdAndUpdate(
      req.params.id,
      { $set: req.body, updatedAt: Date.now() },
      { new: true, runValidators: true }
    );
    
    res.json({
      success: true,
      data: updatedTemplate
    });
  } catch (error) {
    console.error('Update template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update template'
    });
  }
});

// @route   DELETE /api/templates/:id
// @desc    Delete template
router.delete('/:id', authenticateJWT, isOwner(Template), async (req, res) => {
  try {
    await Template.findByIdAndDelete(req.params.id);
    
    res.json({
      success: true,
      message: 'Template deleted successfully'
    });
  } catch (error) {
    console.error('Delete template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete template'
    });
  }
});

// @route   GET /api/templates/share/:shareId
// @desc    Get template by share ID
router.get('/share/:shareId', async (req, res) => {
  try {
    const template = await Template.findOne({ shareId: req.params.shareId })
      .populate('userId', 'name avatar username');
    
    if (!template) {
      return res.status(404).json({
        success: false,
        message: 'Template not found'
      });
    }
    
    if (template.visibility === 'private') {
      return res.status(403).json({
        success: false,
        message: 'This template is private'
      });
    }
    
    // Increment views
    template.views += 1;
    await template.save();
    
    res.json({
      success: true,
      data: template
    });
  } catch (error) {
    console.error('Get shared template error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch template'
    });
  }
});

module.exports = router;
