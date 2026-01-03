const Parser = require('rss-parser');

class RSSService {
  constructor() {
    this.parser = new Parser({
      customFields: {
        item: [
          ['content:encoded', 'contentEncoded'],
          ['dc:creator', 'creator']
        ]
      }
    });
  }

  // Parse RSS feed
  async parseFeed(url, maxItems = 5) {
    try {
      const feed = await this.parser.parseURL(url);
      
      return {
        title: feed.title,
        description: feed.description,
        link: feed.link,
        items: feed.items.slice(0, maxItems).map(item => ({
          title: item.title,
          link: item.link,
          pubDate: item.pubDate,
          author: item.creator || item.author,
          contentSnippet: item.contentSnippet,
          categories: item.categories || []
        }))
      };
    } catch (error) {
      throw new Error(`Failed to parse RSS feed: ${error.message}`);
    }
  }

  // Get Dev.to posts
  async getDevToPosts(username, maxItems = 5) {
    const url = `https://dev.to/feed/${username}`;
    return this.parseFeed(url, maxItems);
  }

  // Get Medium posts
  async getMediumPosts(username, maxItems = 5) {
    const url = `https://medium.com/feed/@${username}`;
    return this.parseFeed(url, maxItems);
  }

  // Get Hashnode posts
  async getHashnodePosts(username, maxItems = 5) {
    const url = `https://${username}.hashnode.dev/rss.xml`;
    return this.parseFeed(url, maxItems);
  }

  // Get blog posts by source
  async getBlogPosts(source, username, customUrl, maxItems = 5) {
    try {
      switch (source) {
        case 'devto':
          return await this.getDevToPosts(username, maxItems);
        case 'medium':
          return await this.getMediumPosts(username, maxItems);
        case 'hashnode':
          return await this.getHashnodePosts(username, maxItems);
        case 'custom':
          return await this.parseFeed(customUrl, maxItems);
        default:
          throw new Error('Invalid blog source');
      }
    } catch (error) {
      throw new Error(`Failed to fetch blog posts: ${error.message}`);
    }
  }
}

module.exports = new RSSService();
