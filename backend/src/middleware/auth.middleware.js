const passport = require('passport');

// Protect routes with JWT authentication
exports.authenticateJWT = passport.authenticate('jwt', { session: false });

// Optional authentication (allows both authenticated and guest users)
exports.optionalAuth = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }
    next();
  })(req, res, next);
};

// Check if user owns the resource
exports.isOwner = (Model) => async (req, res, next) => {
  try {
    const resource = await Model.findById(req.params.id);
    
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    
    if (resource.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Unauthorized access'
      });
    }
    
    req.resource = resource;
    next();
  } catch (error) {
    next(error);
  }
};
