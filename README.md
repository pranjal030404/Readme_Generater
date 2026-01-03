# GitHub README Generator 🚀

A comprehensive, full-stack web application for generating stunning GitHub profile READMEs with dynamic widgets, live activity feeds, and automated updates.

## ✨ Features

### 🎨 Frontend
- **Interactive Form Builder** with drag-and-drop section reordering
- **Live Preview** with real-time markdown rendering
- **40+ Theme Options** for GitHub stats cards
- **Template Library** (Developer, Designer, Student, Content Creator, etc.)
- **Customization Options**: colors, fonts, layouts, alignments
- **Widget Gallery**: Stats cards, activity graphs, skill badges, social links

### 🔧 Backend
- **RESTful API** with Express.js
- **MongoDB** for template storage and user management
- **GitHub OAuth** authentication
- **Multiple API Integrations**: GitHub, WakaTime, Spotify, StackOverflow, RSS feeds
- **AI-Powered** content enhancement
- **Export Options**: Markdown, HTML, shareable links

### ⚡ Automation
- **GitHub Actions** workflows for auto-updating READMEs
- **Scheduled Updates** (every 6 hours)
- **Dynamic Content**: Latest blog posts, GitHub activity, coding stats
- **Template System** with customizable markers

## 🏗️ Project Structure

```
github-readme-generator/
├── frontend/          # React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── context/
│   │   └── utils/
│   └── package.json
├── backend/           # Node.js + Express + MongoDB
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── middleware/
│   │   └── config/
│   └── package.json
├── automation/        # GitHub Actions templates & scripts
│   ├── templates/
│   ├── scripts/
│   └── workflows/
└── package.json       # Root monorepo config
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- MongoDB instance (local or Atlas)
- GitHub OAuth App credentials

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd github-readme-generator
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Configure environment variables**

Create `.env` files in both `frontend/` and `backend/` directories:

**backend/.env**
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/readme-generator
JWT_SECRET=your-secret-key
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback
FRONTEND_URL=http://localhost:5173
WAKATIME_API_KEY=your-wakatime-key
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
OPENAI_API_KEY=your-openai-key
```

**frontend/.env**
```env
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_CLIENT_ID=your-github-client-id
```

4. **Start development servers**
```bash
npm run dev
```

This will start:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 📚 API Documentation

### Authentication
- `POST /api/auth/github` - Initiate GitHub OAuth
- `GET /api/auth/github/callback` - OAuth callback
- `GET /api/auth/user` - Get current user
- `POST /api/auth/logout` - Logout

### Templates
- `POST /api/templates` - Save new template
- `GET /api/templates/:id` - Get template by ID
- `GET /api/templates/user/:userId` - Get user's templates
- `PUT /api/templates/:id` - Update template
- `DELETE /api/templates/:id` - Delete template

### Generation
- `POST /api/generate` - Generate markdown from data
- `POST /api/generate/preview` - Generate preview link
- `GET /api/preview/:shareId` - View shared preview

### External Data
- `GET /api/github/:username` - Fetch GitHub user data
- `GET /api/github/:username/stats` - Get GitHub statistics
- `GET /api/wakatime/:username` - Get WakaTime stats
- `POST /api/rss/parse` - Parse RSS feed
- `POST /api/ai/enhance` - AI content enhancement

## 🎯 Usage Guide

### Creating Your README

1. **Fill Basic Information**: Name, tagline, location, current focus
2. **Add About Section**: Bio, fun facts, learning goals
3. **Select Skills**: Choose from categorized tech stack
4. **Add Projects**: Showcase your best work with live demos
5. **Configure Widgets**: Enable GitHub stats, WakaTime, blog feeds
6. **Customize Theme**: Choose colors, layout, and style
7. **Preview & Export**: Review live preview and copy markdown

### Setting Up Auto-Updates

1. **Download Automation Files** from the generator
2. **Create GitHub Repository** (username/username)
3. **Add GitHub Secrets**:
   - `WAKATIME_API_KEY`
   - `SPOTIFY_REFRESH_TOKEN` (optional)
   - `RSS_FEED_URL`
4. **Upload Files**:
   - `.github/workflows/update-readme.yml`
   - `update-readme.js`
   - `README.template.md`
5. **Enable GitHub Actions** in repository settings

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router
- React DnD (drag and drop)
- React Markdown
- Axios
- Zustand (state management)

### Backend
- Node.js
- Express.js
- MongoDB & Mongoose
- Passport.js (OAuth)
- JWT
- Axios
- RSS Parser
- Node Cron

### Automation
- GitHub Actions
- Octokit (GitHub API)
- Node.js scripts

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

MIT License - feel free to use this project for personal or commercial purposes.

## 🙏 Acknowledgments

- [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
- [github-readme-streak-stats](https://github.com/DenverCoder1/github-readme-streak-stats)
- [shields.io](https://shields.io)
- All the amazing open-source projects that made this possible

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ by developers, for developers
