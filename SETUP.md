# Development Setup Guide

This guide will help you set up the GitHub README Generator project for local development.

## Prerequisites

- **Node.js** 18+ and npm
- **MongoDB** (local or Atlas)
- **GitHub OAuth App** credentials

## Initial Setup

### 1. Clone Repository

```bash
git clone <repository-url>
cd github-readme-generator
```

### 2. Install Dependencies

```bash
# Install root dependencies
npm install

# Install all workspace dependencies
npm run install:all
```

Or install manually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install

# Automation
cd ../automation
npm install
```

### 3. Set Up MongoDB

**Option A: Local MongoDB**
```bash
# Install MongoDB (Ubuntu/Debian)
sudo apt-get install mongodb

# Start MongoDB service
sudo systemctl start mongodb

# Verify it's running
sudo systemctl status mongodb
```

**Option B: MongoDB Atlas (Cloud)**
1. Create account at [mongodb.com/atlas](https://www.mongodb.com/atlas)
2. Create a new cluster (free tier available)
3. Get connection string
4. Whitelist your IP address

### 4. Create GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Fill in details:
   - **Application name**: README Generator (Dev)
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**: `http://localhost:5000/api/auth/github/callback`
4. Save Client ID and Client Secret

### 5. Configure Environment Variables

**Backend (.env)**

Create `backend/.env`:

```env
PORT=5000
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/readme-generator

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRE=7d

# GitHub OAuth
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
GITHUB_CALLBACK_URL=http://localhost:5000/api/auth/github/callback

# Frontend URL
FRONTEND_URL=http://localhost:5173

# External API Keys (optional)
WAKATIME_API_KEY=your-wakatime-api-key
SPOTIFY_CLIENT_ID=your-spotify-client-id
SPOTIFY_CLIENT_SECRET=your-spotify-client-secret
OPENAI_API_KEY=your-openai-api-key

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

**Frontend (.env)**

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:5000/api
VITE_GITHUB_CLIENT_ID=your-github-client-id
```

## Running the Application

### Development Mode

**Option 1: Run everything together**
```bash
npm run dev
```

**Option 2: Run separately**

Terminal 1 (Backend):
```bash
npm run dev:backend
```

Terminal 2 (Frontend):
```bash
npm run dev:frontend
```

### Access the Application

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:5000
- **API Health Check**: http://localhost:5000/health

## Getting API Keys

### WakaTime (Optional)

1. Create account at [wakatime.com](https://wakatime.com)
2. Go to Settings → Account
3. Copy your API Key

### Spotify (Optional)

1. Go to [Spotify Developer Dashboard](https://developer.spotify.com/dashboard)
2. Create an App
3. Get Client ID and Client Secret
4. Add `http://localhost:5000/callback` to Redirect URIs

### OpenAI (Optional)

1. Create account at [openai.com](https://openai.com)
2. Go to API Keys section
3. Create new API key

## Building for Production

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
npm run preview
```

## Testing

```bash
# Run all tests
npm test

# Backend tests only
cd backend
npm test

# Frontend tests only
cd frontend
npm test
```

## Common Issues

### MongoDB Connection Failed

**Error**: `MongooseError: connect ECONNREFUSED`

**Solutions**:
1. Check if MongoDB is running: `sudo systemctl status mongodb`
2. Verify MONGODB_URI in .env
3. Check firewall settings
4. For Atlas: whitelist your IP

### GitHub OAuth Not Working

**Error**: `Invalid callback URL`

**Solutions**:
1. Verify callback URL matches GitHub app settings exactly
2. Check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET
3. Ensure both frontend and backend are running
4. Try using incognito/private browsing mode

### Port Already in Use

**Error**: `EADDRINUSE: address already in use :::5000`

**Solutions**:
```bash
# Find and kill process using port
lsof -ti:5000 | xargs kill -9

# Or use different port in .env
PORT=5001
```

### CORS Errors

**Error**: `Access-Control-Allow-Origin`

**Solutions**:
1. Verify FRONTEND_URL in backend/.env
2. Check that both servers are running
3. Clear browser cache
4. Ensure ports match configuration

## Project Structure

```
github-readme-generator/
├── backend/                 # Express API server
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Request handlers (if needed)
│   │   ├── middleware/     # Custom middleware
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API route definitions
│   │   ├── services/       # Business logic & external APIs
│   │   └── server.js       # Entry point
│   ├── .env.example
│   └── package.json
│
├── frontend/               # React application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API client
│   │   ├── store/         # State management
│   │   ├── App.jsx        # Root component
│   │   └── main.jsx       # Entry point
│   ├── .env.example
│   └── package.json
│
├── automation/            # GitHub Actions scripts
│   ├── scripts/          # Update scripts
│   ├── templates/        # README templates
│   └── workflows/        # GitHub Actions YAML
│
├── package.json          # Root monorepo config
└── README.md            # Main documentation
```

## Development Workflow

1. **Create feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make changes**
   - Edit files
   - Test locally
   - Follow code style

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/your-feature-name
   ```

## Useful Commands

```bash
# Backend
npm run dev:backend      # Start backend dev server
npm run start           # Start production server

# Frontend
npm run dev:frontend    # Start frontend dev server
npm run build           # Build for production
npm run preview         # Preview production build

# Both
npm run dev             # Start both servers
npm run install:all     # Install all dependencies

# Database
mongosh                 # Connect to MongoDB shell
```

## Next Steps

1. Explore the API endpoints: http://localhost:5000/health
2. Try creating a README in the generator
3. Test GitHub OAuth login
4. Customize form components
5. Add new widgets or features

## Getting Help

- Check the main [README.md](../README.md)
- Review API documentation
- Check GitHub issues
- Review code comments

---

Happy coding! 🚀
