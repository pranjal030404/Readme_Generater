const axios = require('axios');

class SpotifyService {
  constructor() {
    this.baseURL = 'https://api.spotify.com/v1';
    this.authURL = 'https://accounts.spotify.com/api/token';
    this.accessToken = null;
    this.tokenExpiry = null;
  }

  // Get access token
  async getAccessToken() {
    try {
      if (this.accessToken && this.tokenExpiry && Date.now() < this.tokenExpiry) {
        return this.accessToken;
      }

      const clientId = process.env.SPOTIFY_CLIENT_ID;
      const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

      if (!clientId || !clientSecret) {
        throw new Error('Spotify credentials not configured');
      }

      const response = await axios.post(
        this.authURL,
        'grant_type=client_credentials',
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(clientId + ':' + clientSecret).toString('base64')
          }
        }
      );

      this.accessToken = response.data.access_token;
      this.tokenExpiry = Date.now() + (response.data.expires_in * 1000);

      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to get Spotify access token: ${error.message}`);
    }
  }

  // Get currently playing track (requires user refresh token)
  async getNowPlaying(refreshToken) {
    try {
      const response = await axios.get(`${this.baseURL}/me/player/currently-playing`, {
        headers: {
          'Authorization': `Bearer ${refreshToken}`
        }
      });

      if (!response.data || !response.data.item) {
        return { isPlaying: false };
      }

      const track = response.data.item;

      return {
        isPlaying: response.data.is_playing,
        title: track.name,
        artist: track.artists.map(artist => artist.name).join(', '),
        album: track.album.name,
        albumArt: track.album.images[0]?.url,
        url: track.external_urls.spotify
      };
    } catch (error) {
      return { isPlaying: false };
    }
  }
}

module.exports = new SpotifyService();
