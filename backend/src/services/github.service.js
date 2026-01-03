const axios = require('axios');

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
  }

  // Extract username from GitHub URL or return as-is if already username
  extractUsername(input) {
    if (!input) return null;
    
    // Remove trailing slash
    input = input.trim().replace(/\/$/, '');
    
    // Check if it's a URL
    const urlPattern = /(?:https?:\/\/)?(?:www\.)?github\.com\/([a-zA-Z0-9-]+)/i;
    const match = input.match(urlPattern);
    
    if (match) {
      return match[1];
    }
    
    // Assume it's already a username if it doesn't contain special characters
    if (/^[a-zA-Z0-9-]+$/.test(input)) {
      return input;
    }
    
    return null;
  }

  // Get user profile
  async getUserProfile(username) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${username}`, {
        headers: this.headers
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch GitHub user: ${error.message}`);
    }
  }

  // Get user repositories
  async getUserRepos(username, perPage = 100) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${username}/repos`, {
        headers: this.headers,
        params: {
          per_page: perPage,
          sort: 'updated',
          direction: 'desc'
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch repositories: ${error.message}`);
    }
  }

  // Get all user repositories with pagination
  async getAllUserRepos(username) {
    try {
      let allRepos = [];
      let page = 1;
      let hasMore = true;

      while (hasMore) {
        const response = await axios.get(`${this.baseURL}/users/${username}/repos`, {
          headers: this.headers,
          params: {
            per_page: 100,
            page: page,
            sort: 'updated',
            direction: 'desc'
          }
        });

        allRepos = allRepos.concat(response.data);
        hasMore = response.data.length === 100;
        page++;

        // Safety limit to prevent infinite loops
        if (page > 10) break;
      }

      return allRepos;
    } catch (error) {
      throw new Error(`Failed to fetch all repositories: ${error.message}`);
    }
  }

  // Get user statistics
  async getUserStats(username) {
    try {
      const [profile, repos] = await Promise.all([
        this.getUserProfile(username),
        this.getUserRepos(username)
      ]);

      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const languages = {};

      repos.forEach(repo => {
        if (repo.language) {
          languages[repo.language] = (languages[repo.language] || 0) + 1;
        }
      });

      return {
        profile: {
          name: profile.name,
          username: profile.login,
          avatar: profile.avatar_url,
          bio: profile.bio,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos,
          publicGists: profile.public_gists,
          createdAt: profile.created_at
        },
        stats: {
          totalStars,
          totalForks,
          totalRepos: repos.length,
          languages
        },
        topRepos: repos.slice(0, 10).map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url
        }))
      };
    } catch (error) {
      throw new Error(`Failed to fetch user stats: ${error.message}`);
    }
  }

  // Get recent activity
  async getRecentActivity(username, limit = 10) {
    try {
      const response = await axios.get(`${this.baseURL}/users/${username}/events/public`, {
        headers: this.headers,
        params: { per_page: limit }
      });
      
      return response.data.map(event => ({
        type: event.type,
        repo: event.repo.name,
        createdAt: event.created_at,
        payload: this.parseEventPayload(event)
      }));
    } catch (error) {
      throw new Error(`Failed to fetch recent activity: ${error.message}`);
    }
  }

  // Get comprehensive GitHub statistics
  async getComprehensiveStats(usernameOrUrl) {
    try {
      const username = this.extractUsername(usernameOrUrl);
      if (!username) {
        throw new Error('Invalid GitHub username or URL');
      }

      const [profile, repos, activity] = await Promise.all([
        this.getUserProfile(username),
        this.getAllUserRepos(username),
        this.getRecentActivity(username, 30)
      ]);

      // Calculate comprehensive stats
      const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
      const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
      const totalWatchers = repos.reduce((sum, repo) => sum + repo.watchers_count, 0);
      const totalSize = repos.reduce((sum, repo) => sum + (repo.size || 0), 0);

      // Language statistics with counts and percentages
      const languageCounts = {};
      repos.forEach(repo => {
        if (repo.language) {
          languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
        }
      });

      const sortedLanguages = Object.entries(languageCounts)
        .map(([language, count]) => ({
          language,
          count,
          percentage: ((count / repos.length) * 100).toFixed(2)
        }))
        .sort((a, b) => b.count - a.count);

      // Repository analysis
      const forkedRepos = repos.filter(repo => repo.fork).length;
      const originalRepos = repos.length - forkedRepos;
      const hasIssues = repos.filter(repo => repo.has_issues && repo.open_issues_count > 0).length;
      
      // Sort repos by different criteria
      const mostStarred = [...repos]
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 10)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language,
          url: repo.html_url,
          updatedAt: repo.updated_at,
          topics: repo.topics || []
        }));

      const recentlyUpdated = [...repos]
        .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
        .slice(0, 10)
        .map(repo => ({
          name: repo.name,
          description: repo.description,
          stars: repo.stargazers_count,
          language: repo.language,
          url: repo.html_url,
          updatedAt: repo.updated_at
        }));

      // Activity analysis
      const activityByType = {};
      activity.forEach(event => {
        activityByType[event.type] = (activityByType[event.type] || 0) + 1;
      });

      // Calculate contribution metrics
      const pushEvents = activity.filter(e => e.type === 'PushEvent');
      const totalCommitsFromActivity = pushEvents.reduce((sum, event) => 
        sum + (event.payload.commits || 0), 0
      );

      return {
        username,
        profile: {
          name: profile.name,
          login: profile.login,
          avatarUrl: profile.avatar_url,
          bio: profile.bio,
          company: profile.company,
          location: profile.location,
          email: profile.email,
          blog: profile.blog,
          twitterUsername: profile.twitter_username,
          hireable: profile.hireable,
          followers: profile.followers,
          following: profile.following,
          publicRepos: profile.public_repos,
          publicGists: profile.public_gists,
          createdAt: profile.created_at,
          updatedAt: profile.updated_at
        },
        repositoryStats: {
          totalRepos: repos.length,
          originalRepos,
          forkedRepos,
          totalStars,
          totalForks,
          totalWatchers,
          totalSizeKB: totalSize,
          reposWithIssues: hasIssues
        },
        languages: sortedLanguages,
        topLanguages: sortedLanguages.slice(0, 5),
        mostStarredRepos: mostStarred,
        recentlyUpdatedRepos: recentlyUpdated,
        activity: {
          recentEvents: activity.length,
          eventsByType: activityByType,
          estimatedCommits: totalCommitsFromActivity
        },
        socialStats: {
          followers: profile.followers,
          following: profile.following,
          followersToFollowingRatio: profile.following > 0 
            ? (profile.followers / profile.following).toFixed(2) 
            : profile.followers
        }
      };
    } catch (error) {
      throw new Error(`Failed to fetch comprehensive stats: ${error.message}`);
    }
  }

  parseEventPayload(event) {
    switch (event.type) {
      case 'PushEvent':
        return {
          commits: event.payload.commits?.length || 0,
          message: event.payload.commits?.[0]?.message
        };
      case 'CreateEvent':
        return {
          refType: event.payload.ref_type,
          ref: event.payload.ref
        };
      case 'IssuesEvent':
        return {
          action: event.payload.action,
          title: event.payload.issue?.title
        };
      case 'PullRequestEvent':
        return {
          action: event.payload.action,
          title: event.payload.pull_request?.title
        };
      default:
        return {};
    }
  }
}

module.exports = new GitHubService();
