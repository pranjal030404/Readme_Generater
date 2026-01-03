const mongoose = require('mongoose');

const templateSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    maxlength: 500
  },
  sections: {
    basicInfo: {
      name: String,
      tagline: String,
      location: String,
      pronouns: String,
      currentFocus: String,
      enabled: { type: Boolean, default: true }
    },
    aboutMe: {
      bio: String,
      funFacts: [String],
      currentlyLearning: [String],
      collaborationInterests: String,
      enabled: { type: Boolean, default: true }
    },
    skills: {
      languages: [String],
      frameworks: [String],
      databases: [String],
      tools: [String],
      cloud: [String],
      devops: [String],
      enabled: { type: Boolean, default: true }
    },
    workExperience: [{
      company: String,
      role: String,
      duration: String,
      achievements: [String]
    }],
    education: [{
      institution: String,
      degree: String,
      year: String,
      gpa: String
    }],
    projects: [{
      name: String,
      description: String,
      techStack: [String],
      liveUrl: String,
      repoUrl: String,
      imageUrl: String
    }],
    socialLinks: {
      github: String,
      linkedin: String,
      twitter: String,
      portfolio: String,
      email: String,
      devto: String,
      hashnode: String,
      medium: String,
      stackoverflow: String,
      youtube: String,
      enabled: { type: Boolean, default: true }
    },
    certifications: [{
      name: String,
      issuer: String,
      date: String,
      credentialUrl: String
    }],
    widgets: {
      githubStats: {
        enabled: { type: Boolean, default: true },
        theme: { type: String, default: 'dark' },
        showIcons: { type: Boolean, default: true },
        hideRank: { type: Boolean, default: false }
      },
      githubStreak: {
        enabled: { type: Boolean, default: true },
        theme: { type: String, default: 'dark' }
      },
      topLanguages: {
        enabled: { type: Boolean, default: true },
        layout: { type: String, default: 'compact' },
        theme: { type: String, default: 'dark' }
      },
      activityGraph: {
        enabled: { type: Boolean, default: true },
        theme: { type: String, default: 'github' }
      },
      trophies: {
        enabled: { type: Boolean, default: false },
        theme: { type: String, default: 'darkhub' }
      },
      wakatime: {
        enabled: { type: Boolean, default: false },
        username: String
      },
      blogPosts: {
        enabled: { type: Boolean, default: false },
        source: { type: String, enum: ['devto', 'medium', 'hashnode', 'custom'] },
        username: String,
        customRssUrl: String,
        maxPosts: { type: Number, default: 5 }
      },
      spotify: {
        enabled: { type: Boolean, default: false }
      },
      visitorCounter: {
        enabled: { type: Boolean, default: false }
      },
      typingSvg: {
        enabled: { type: Boolean, default: false },
        text: String
      }
    }
  },
  theme: {
    name: { type: String, default: 'dark' },
    accentColor: { type: String, default: '#3b82f6' },
    headerStyle: { type: String, default: 'default' }
  },
  customization: {
    layout: { type: String, default: 'professional' },
    sectionOrder: [String],
    alignment: { type: String, default: 'left' },
    showTableOfContents: { type: Boolean, default: false }
  },
  visibility: {
    type: String,
    enum: ['private', 'public', 'unlisted'],
    default: 'private'
  },
  shareId: {
    type: String,
    unique: true,
    sparse: true
  },
  views: {
    type: Number,
    default: 0
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

templateSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

templateSchema.index({ userId: 1, createdAt: -1 });
templateSchema.index({ shareId: 1 });

module.exports = mongoose.model('Template', templateSchema);
