require('dotenv').config();
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');
const Parser = require('rss-parser');

const parser = new Parser();

class ReadmeUpdater {
  constructor() {
    this.readmePath = path.join(process.cwd(), 'README.md');
    this.templatePath = path.join(process.cwd(), 'README.template.md');
    this.config = {
      github: {
        username: process.env.GITHUB_USERNAME || process.env.GITHUB_ACTOR,
        token: process.env.GITHUB_TOKEN
      },
      wakatime: {
        apiKey: process.env.WAKATIME_API_KEY
      },
      blog: {
        rssUrl: process.env.RSS_FEED_URL
      }
    };
  }

  async init() {
    console.log('🚀 Starting README update...');
    
    try {
      // Read template
      const template = await this.readTemplate();
      
      // Fetch all dynamic data
      const [blogPosts, githubActivity, wakatimeStats] = await Promise.all([
        this.fetchBlogPosts(),
        this.fetchGitHubActivity(),
        this.fetchWakaTimeStats()
      ]);

      // Replace content markers
      let updatedContent = template;
      
      if (blogPosts) {
        updatedContent = this.replaceBlogPosts(updatedContent, blogPosts);
      }
      
      if (githubActivity) {
        updatedContent = this.replaceGitHubActivity(updatedContent, githubActivity);
      }
      
      if (wakatimeStats) {
        updatedContent = this.replaceWakaTimeStats(updatedContent, wakatimeStats);
      }

      // Write updated README
      await fs.writeFile(this.readmePath, updatedContent);
      
      console.log('✅ README updated successfully!');
    } catch (error) {
      console.error('❌ Error updating README:', error.message);
      process.exit(1);
    }
  }

  async readTemplate() {
    try {
      return await fs.readFile(this.templatePath, 'utf-8');
    } catch (error) {
      console.log('No template found, using existing README');
      return await fs.readFile(this.readmePath, 'utf-8');
    }
  }

  async fetchBlogPosts() {
    if (!this.config.blog.rssUrl) {
      console.log('⚠️  No RSS feed URL configured');
      return null;
    }

    try {
      console.log('📝 Fetching blog posts...');
      const feed = await parser.parseURL(this.config.blog.rssUrl);
      return feed.items.slice(0, 5);
    } catch (error) {
      console.error('Failed to fetch blog posts:', error.message);
      return null;
    }
  }

  async fetchGitHubActivity() {
    if (!this.config.github.username) {
      console.log('⚠️  No GitHub username configured');
      return null;
    }

    try {
      console.log('🔍 Fetching GitHub activity...');
      const response = await axios.get(
        `https://api.github.com/users/${this.config.github.username}/events/public`,
        {
          headers: {
            'Authorization': `token ${this.config.github.token}`,
            'Accept': 'application/vnd.github.v3+json'
          },
          params: { per_page: 5 }
        }
      );
      return response.data;
    } catch (error) {
      console.error('Failed to fetch GitHub activity:', error.message);
      return null;
    }
  }

  async fetchWakaTimeStats() {
    if (!this.config.wakatime.apiKey) {
      console.log('⚠️  No WakaTime API key configured');
      return null;
    }

    try {
      console.log('⏱️  Fetching WakaTime stats...');
      const response = await axios.get(
        'https://wakatime.com/api/v1/users/current/stats/last_7_days',
        {
          headers: {
            'Authorization': `Bearer ${this.config.wakatime.apiKey}`
          }
        }
      );
      return response.data.data;
    } catch (error) {
      console.error('Failed to fetch WakaTime stats:', error.message);
      return null;
    }
  }

  replaceBlogPosts(content, posts) {
    const startMarker = '<!-- BLOG-POST-LIST:START -->';
    const endMarker = '<!-- BLOG-POST-LIST:END -->';
    
    const blogPostsMarkdown = posts
      .map(post => `- [${post.title}](${post.link}) - ${new Date(post.pubDate).toLocaleDateString()}`)
      .join('\n');

    return content.replace(
      new RegExp(`${startMarker}[\\s\\S]*${endMarker}`, 'm'),
      `${startMarker}\n${blogPostsMarkdown}\n${endMarker}`
    );
  }

  replaceGitHubActivity(content, events) {
    const startMarker = '<!-- GITHUB-ACTIVITY:START -->';
    const endMarker = '<!-- GITHUB-ACTIVITY:END -->';
    
    const activityMarkdown = events
      .slice(0, 5)
      .map(event => {
        const date = new Date(event.created_at).toLocaleDateString();
        switch (event.type) {
          case 'PushEvent':
            return `- 📝 Pushed ${event.payload.commits?.length || 0} commit(s) to ${event.repo.name} - ${date}`;
          case 'CreateEvent':
            return `- ✨ Created ${event.payload.ref_type} in ${event.repo.name} - ${date}`;
          case 'IssuesEvent':
            return `- 🐛 ${event.payload.action} issue in ${event.repo.name} - ${date}`;
          case 'PullRequestEvent':
            return `- 🔀 ${event.payload.action} PR in ${event.repo.name} - ${date}`;
          case 'WatchEvent':
            return `- ⭐ Starred ${event.repo.name} - ${date}`;
          default:
            return `- 📌 ${event.type.replace('Event', '')} on ${event.repo.name} - ${date}`;
        }
      })
      .join('\n');

    return content.replace(
      new RegExp(`${startMarker}[\\s\\S]*${endMarker}`, 'm'),
      `${startMarker}\n${activityMarkdown}\n${endMarker}`
    );
  }

  replaceWakaTimeStats(content, stats) {
    const startMarker = '<!-- WAKATIME:START -->';
    const endMarker = '<!-- WAKATIME:END -->';
    
    const statsMarkdown = [
      `**Total coding time this week:** ${stats.human_readable_total}`,
      '',
      '**Languages:**'
    ];

    stats.languages.slice(0, 5).forEach(lang => {
      statsMarkdown.push(`- ${lang.name}: ${lang.text} (${lang.percent.toFixed(1)}%)`);
    });

    return content.replace(
      new RegExp(`${startMarker}[\\s\\S]*${endMarker}`, 'm'),
      `${startMarker}\n${statsMarkdown.join('\n')}\n${endMarker}`
    );
  }
}

// Run the updater
const updater = new ReadmeUpdater();
updater.init();
