import axios from 'axios';
import useAuthStore from '../store/authStore';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized - logout user
      useAuthStore.getState().logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  getUser: () => api.get('/auth/user'),
  logout: () => api.post('/auth/logout'),
  createGuest: () => api.post('/auth/guest')
};

// Template API
export const templateAPI = {
  create: (data) => api.post('/templates', data),
  getAll: () => api.get('/templates/user'),
  getById: (id) => api.get(`/templates/${id}`),
  update: (id, data) => api.put(`/templates/${id}`, data),
  delete: (id) => api.delete(`/templates/${id}`),
  getByShareId: (shareId) => api.get(`/templates/share/${shareId}`)
};

// Generate API
export const generateAPI = {
  generate: (data) => api.post('/generate', data),
  createPreview: (data) => api.post('/generate/preview', data),
  getPreview: (shareId) => api.get(`/generate/preview/${shareId}`),
  export: (data) => api.post('/generate/export', data, {
    responseType: 'blob'
  })
};

// GitHub API
export const githubAPI = {
  getProfile: (username) => api.get(`/github/${username}`),
  getRepos: (username) => api.get(`/github/${username}/repos`),
  getActivity: (username, limit = 10) => api.get(`/github/${username}/activity?limit=${limit}`),
  getComprehensiveStats: (usernameOrUrl) => api.get(`/github/${encodeURIComponent(usernameOrUrl)}/comprehensive`)
};

// Stats API
export const statsAPI = {
  getGitHubStats: (username) => api.get(`/stats/${username}`),
  getWakaTimeStats: (username) => api.get(`/stats/wakatime/${username}`),
  getWakaTimeAllTime: (username) => api.get(`/stats/wakatime/${username}/all-time`)
};

// RSS API
export const rssAPI = {
  parse: (data) => api.post('/rss/parse', data),
  getDevTo: (username, limit = 5) => api.get(`/rss/devto/${username}?limit=${limit}`),
  getMedium: (username, limit = 5) => api.get(`/rss/medium/${username}?limit=${limit}`),
  getHashnode: (username, limit = 5) => api.get(`/rss/hashnode/${username}?limit=${limit}`)
};

// AI API
export const aiAPI = {
  enhance: (text, type) => api.post('/ai/enhance', { text, type }),
  suggestProjects: (projectName, techStack) => api.post('/ai/suggest-projects', { projectName, techStack })
};

export default api;
