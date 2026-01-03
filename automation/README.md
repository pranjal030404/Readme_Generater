# GitHub README Automation

This folder contains scripts and workflows to automatically update your GitHub profile README with dynamic content.

## 🚀 Features

- **Auto-update Blog Posts** from RSS feeds (Dev.to, Medium, Hashnode, custom)
- **GitHub Activity** tracking (commits, PRs, issues)
- **WakaTime Stats** for coding time and languages
- **Scheduled Updates** every 6 hours via GitHub Actions
- **Manual Trigger** support for on-demand updates

## 📁 Files

- `scripts/update-readme.js` - Main update script
- `workflows/update-readme.yml` - GitHub Actions workflow
- `templates/README.template.md` - Template file with markers
- `package.json` - Dependencies

## 🔧 Setup Instructions

### 1. Create Repository

Create a GitHub repository with your username as the name (e.g., `username/username`). This is a special repository that displays on your profile.

### 2. Add Files

Copy these files to your repository:
- `.github/workflows/update-readme.yml` (GitHub Actions workflow)
- `automation/` folder with all scripts
- `README.template.md` (your template with content markers)

### 3. Configure GitHub Secrets

Go to your repository → Settings → Secrets and variables → Actions

Add the following secrets:

**Required:**
- `GITHUB_TOKEN` - Automatically provided by GitHub Actions

**Optional (for features):**
- `WAKATIME_API_KEY` - Get from [WakaTime Settings](https://wakatime.com/settings/account)
- `RSS_FEED_URL` - Your blog RSS feed URL
  - Dev.to: `https://dev.to/feed/USERNAME`
  - Medium: `https://medium.com/feed/@USERNAME`
  - Hashnode: `https://USERNAME.hashnode.dev/rss.xml`

### 4. Update Template

Edit `README.template.md` with your content. Use these markers for dynamic content:

```markdown
<!-- BLOG-POST-LIST:START -->
<!-- BLOG-POST-LIST:END -->

<!-- GITHUB-ACTIVITY:START -->
<!-- GITHUB-ACTIVITY:END -->

<!-- WAKATIME:START -->
<!-- WAKATIME:END -->
```

### 5. Enable GitHub Actions

1. Go to repository → Actions tab
2. Enable workflows if prompted
3. Click "Update README" workflow
4. Click "Run workflow" to test

## 🎯 Content Markers

Place these markers in your `README.template.md` where you want dynamic content:

### Blog Posts
```markdown
<!-- BLOG-POST-LIST:START -->
<!-- Content will be inserted here -->
<!-- BLOG-POST-LIST:END -->
```

### GitHub Activity
```markdown
<!-- GITHUB-ACTIVITY:START -->
<!-- Content will be inserted here -->
<!-- GITHUB-ACTIVITY:END -->
```

### WakaTime Stats
```markdown
<!-- WAKATIME:START -->
<!-- Content will be inserted here -->
<!-- WAKATIME:END -->
```

## ⚙️ Customization

### Change Update Frequency

Edit `.github/workflows/update-readme.yml`:

```yaml
schedule:
  - cron: '0 */6 * * *'  # Every 6 hours
  # - cron: '0 0 * * *'  # Daily at midnight
  # - cron: '0 */3 * * *' # Every 3 hours
```

### Modify Content Limit

Edit `scripts/update-readme.js`:

```javascript
// Change number of items fetched
const feed = await parser.parseURL(this.config.blog.rssUrl);
return feed.items.slice(0, 5);  // Change 5 to desired number
```

### Add Custom Data Sources

Add new methods to `ReadmeUpdater` class in `update-readme.js`:

```javascript
async fetchCustomData() {
  const response = await axios.get('YOUR_API_URL');
  return response.data;
}

replaceCustomData(content, data) {
  const startMarker = '<!-- CUSTOM:START -->';
  const endMarker = '<!-- CUSTOM:END -->';
  // Your replacement logic
}
```

## 🐛 Troubleshooting

### Workflow Not Running

1. Check if Actions are enabled in repository settings
2. Verify workflow file is in `.github/workflows/` directory
3. Check branch name matches workflow trigger

### No Content Updates

1. Verify secrets are correctly set
2. Check workflow logs for errors
3. Ensure markers exist in README.template.md
4. Validate API keys are valid

### Rate Limiting

GitHub API has rate limits. If you hit limits:
- Use `GITHUB_TOKEN` (automatically provided)
- Reduce update frequency
- Cache API responses

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GITHUB_TOKEN` | GitHub authentication | Yes (auto) |
| `GITHUB_USERNAME` | Your GitHub username | Yes (auto) |
| `WAKATIME_API_KEY` | WakaTime API key | No |
| `RSS_FEED_URL` | Blog RSS feed URL | No |

## 🔒 Security

- Never commit API keys to the repository
- Use GitHub Secrets for sensitive data
- Regularly rotate API keys
- Review workflow permissions

## 📚 Resources

- [GitHub Profile README Guide](https://docs.github.com/en/account-and-profile/setting-up-and-managing-your-github-profile/customizing-your-profile/managing-your-profile-readme)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [WakaTime API Docs](https://wakatime.com/developers)
- [GitHub API Docs](https://docs.github.com/en/rest)

## 🤝 Support

For issues or questions:
1. Check the troubleshooting section
2. Review workflow logs in Actions tab
3. Open an issue in the repository

---

Happy coding! 🚀
