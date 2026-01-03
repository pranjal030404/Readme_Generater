const axios = require('axios');

class GitHubService {
  constructor() {
    this.baseURL = 'https://api.github.com';
    this.headers = {
      'Accept': 'application/vnd.github.v3+json'
    };
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
