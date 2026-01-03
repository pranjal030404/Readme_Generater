const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/User.model');

// GitHub OAuth Strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL,
  scope: ['user:email', 'read:user']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    // Extract user data from GitHub profile
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : `${profile.username}@github.com`;
    
    // Find or create user
    let user = await User.findOne({ githubId: profile.id });
    
    if (user) {
      // Update existing user
      user.name = profile.displayName || profile.username;
      user.avatar = profile.photos && profile.photos[0] ? profile.photos[0].value : null;
      user.username = profile.username;
      user.bio = profile._json.bio;
      user.location = profile._json.location;
      user.website = profile._json.blog;
      user.githubProfile = {
        followers: profile._json.followers,
        following: profile._json.following,
        publicRepos: profile._json.public_repos,
        publicGists: profile._json.public_gists,
        createdAt: profile._json.created_at
      };
      await user.save();
    } else {
      // Create new user
      user = await User.create({
        githubId: profile.id,
        email,
        name: profile.displayName || profile.username,
        avatar: profile.photos && profile.photos[0] ? profile.photos[0].value : null,
        username: profile.username,
        bio: profile._json.bio,
        location: profile._json.location,
        website: profile._json.blog,
        githubProfile: {
          followers: profile._json.followers,
          following: profile._json.following,
          publicRepos: profile._json.public_repos,
          publicGists: profile._json.public_gists,
          createdAt: profile._json.created_at
        }
      });
    }
    
    return done(null, user);
  } catch (error) {
    return done(error, null);
  }
}));

// JWT Strategy
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

passport.use(new JwtStrategy(jwtOptions, async (payload, done) => {
  try {
    const user = await User.findById(payload.id);
    
    if (user) {
      return done(null, user);
    }
    
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

module.exports = passport;
