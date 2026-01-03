const axios = require('axios');

class WakaTimeService {
  constructor() {
    this.baseURL = 'https://wakatime.com/api/v1';
  }

  // Get user stats
  async getUserStats(username) {
    try {
      const apiKey = process.env.WAKATIME_API_KEY;
      
      if (!apiKey) {
        throw new Error('WakaTime API key not configured');
      }

      const response = await axios.get(`${this.baseURL}/users/${username}/stats/last_7_days`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      const data = response.data.data;

      return {
        totalSeconds: data.total_seconds,
        dailyAverage: data.daily_average,
        languages: data.languages.map(lang => ({
          name: lang.name,
          totalSeconds: lang.total_seconds,
          percent: lang.percent,
          text: lang.text
        })),
        editors: data.editors.map(editor => ({
          name: editor.name,
          totalSeconds: editor.total_seconds,
          percent: editor.percent
        })),
        projects: data.projects.map(project => ({
          name: project.name,
          totalSeconds: project.total_seconds,
          percent: project.percent
        })),
        operatingSystems: data.operating_systems.map(os => ({
          name: os.name,
          totalSeconds: os.total_seconds,
          percent: os.percent
        }))
      };
    } catch (error) {
      throw new Error(`Failed to fetch WakaTime stats: ${error.message}`);
    }
  }

  // Get all time stats
  async getAllTimeStats(username) {
    try {
      const apiKey = process.env.WAKATIME_API_KEY;
      
      const response = await axios.get(`${this.baseURL}/users/${username}/all_time_since_today`, {
        headers: {
          'Authorization': `Bearer ${apiKey}`
        }
      });

      return response.data.data;
    } catch (error) {
      throw new Error(`Failed to fetch all-time stats: ${error.message}`);
    }
  }
}

module.exports = new WakaTimeService();
