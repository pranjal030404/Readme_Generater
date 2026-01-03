const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  githubId: {
    type: String,
    unique: true,
    sparse: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  name: {
    type: String,
    required: true
  },
  avatar: {
    type: String
  },
  username: {
    type: String,
    unique: true,
    sparse: true
  },
  bio: String,
  location: String,
  website: String,
  githubProfile: {
    followers: Number,
    following: Number,
    publicRepos: Number,
    publicGists: Number,
    createdAt: Date
  },
  isGuest: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
