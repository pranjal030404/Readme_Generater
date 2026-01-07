import { useState } from 'react';
import { githubAPI } from '../../services/api';
import useTemplateStore from '../../store/templateStore';
import toast from 'react-hot-toast';

const AutoFillFromGitHub = ({ onClose }) => {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const updateSection = useTemplateStore(state => state.updateSection);
  const updateWidget = useTemplateStore(state => state.updateWidget);

  const mapLanguagesToSkills = (languages) => {
    const languageMap = {
      'JavaScript': 'JavaScript',
      'TypeScript': 'TypeScript',
      'Python': 'Python',
      'Java': 'Java',
      'C++': 'C++',
      'C': 'C',
      'C#': 'C#',
      'Go': 'Go',
      'Rust': 'Rust',
      'PHP': 'PHP',
      'Ruby': 'Ruby',
      'Swift': 'Swift',
      'Kotlin': 'Kotlin',
      'Dart': 'Dart',
      'HTML': 'HTML',
      'CSS': 'CSS',
      'SQL': 'SQL',
      'Shell': 'Shell',
      'Scala': 'Scala',
      'R': 'R'
    };

    return languages
      .map(lang => languageMap[lang.language])
      .filter(Boolean)
      .slice(0, 10);
  };

  const mapLanguagesToFrameworks = (languages) => {
    const frameworkMap = {
      'JavaScript': ['React', 'Node.js', 'Express'],
      'TypeScript': ['React', 'Node.js', 'Angular', 'Next.js'],
      'Python': ['Django', 'Flask', 'FastAPI'],
      'Java': ['Spring Boot'],
      'PHP': ['Laravel'],
      'Ruby': ['Rails'],
      'Go': ['Gin', 'Echo']
    };

    const frameworks = new Set();
    languages.slice(0, 3).forEach(lang => {
      const langFrameworks = frameworkMap[lang.language];
      if (langFrameworks) {
        langFrameworks.forEach(fw => frameworks.add(fw));
      }
    });

    return Array.from(frameworks).slice(0, 6);
  };

  const handleAutoFill = async () => {
    if (!input.trim()) {
      toast.error('Please enter a GitHub username or URL');
      return;
    }

    // Validate input is not an error message or invalid text
    const trimmedInput = input.trim();
    if (trimmedInput.length > 200 || trimmedInput.includes('Error') || trimmedInput.includes('Failed')) {
      toast.error('Please enter a valid GitHub username or URL');
      setInput('');
      return;
    }

    setLoading(true);
    try {
      const response = await githubAPI.getComprehensiveStats(input.trim());
      
      if (response.data.success) {
        const stats = response.data.data;
        const { profile, languages, mostStarredRepos, repositoryStats } = stats;

        const githubUsername = stats.username;
        const githubUrl = `https://github.com/${githubUsername}`;

        // Auto-fill Basic Info
        updateSection('basicInfo', {
          name: profile.name || profile.login,
          tagline: profile.bio || `${repositoryStats.totalRepos} repositories • ${repositoryStats.totalStars} stars`,
          location: profile.location || '',
          currentFocus: `Working on ${mostStarredRepos[0]?.name || 'amazing projects'}`
        });

        // Auto-fill About Me
        updateSection('aboutMe', {
          bio: profile.bio || `Passionate developer with ${repositoryStats.totalRepos} public repositories and ${repositoryStats.totalStars} stars on GitHub.`,
          currentlyLearning: languages.slice(0, 3).map(l => l.language),
          collaborationInterests: 'Open source projects and innovative ideas'
        });

        // Auto-fill Skills
        const skillLanguages = mapLanguagesToSkills(languages);
        const skillFrameworks = mapLanguagesToFrameworks(languages);
        
        updateSection('skills', {
          languages: skillLanguages,
          frameworks: skillFrameworks,
          tools: ['Git', 'GitHub', 'VS Code'],
          databases: languages.some(l => ['Python', 'JavaScript', 'PHP'].includes(l.language)) 
            ? ['MongoDB', 'PostgreSQL', 'MySQL'] 
            : []
        });

        // Auto-fill Projects from top repos
        const projects = mostStarredRepos.slice(0, 5).map(repo => ({
          id: Date.now() + Math.random(),
          name: repo.name,
          description: repo.description || 'An amazing project',
          technologies: [repo.language, 'Git'].filter(Boolean),
          github: repo.url,
          demo: '',
          featured: repo.stars > 100
        }));
        
        updateSection('projects', projects);

        // Auto-fill Social Links
        updateSection('socialLinks', {
          github: githubUrl,
          twitter: profile.twitterUsername ? `https://twitter.com/${profile.twitterUsername}` : '',
          portfolio: profile.blog || '',
          email: profile.email || ''
        });

        // Enable and configure GitHub widgets
        updateWidget('githubStats', {
          enabled: true,
          theme: 'dark',
          showIcons: true,
          hideRank: false
        });

        updateWidget('githubStreak', {
          enabled: true,
          theme: 'dark'
        });

        updateWidget('topLanguages', {
          enabled: true,
          layout: 'compact',
          theme: 'dark'
        });

        toast.success(`🎉 Auto-filled from ${profile.name || githubUsername}'s GitHub profile!`);
        
        if (onClose) onClose();
      }
    } catch (error) {
      console.error('Auto-fill error:', error);
      const errorMessage = error.response?.data?.message || 'Failed to fetch GitHub data. Please check the username/URL.';
      toast.error(errorMessage);
      
      // Clear invalid input
      if (errorMessage.includes('Invalid') || errorMessage.includes('not found')) {
        setInput('');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-lg w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            🚀 Auto-Fill from GitHub
          </h3>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Enter your GitHub username or profile URL to automatically populate the form with your profile data, repositories, and skills.
        </p>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              GitHub Username or URL
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleAutoFill()}
              placeholder="e.g., octocat or https://github.com/octocat"
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg 
                       focus:ring-2 focus:ring-blue-500 focus:border-transparent
                       dark:bg-gray-700 dark:text-white transition-all"
              disabled={loading}
            />
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
              What will be auto-filled:
            </h4>
            <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
              <li>✓ Basic information (name, bio, location)</li>
              <li>✓ Skills and languages from your repositories</li>
              <li>✓ Top starred repositories as projects</li>
              <li>✓ Social links (GitHub, Twitter, website)</li>
              <li>✓ GitHub widgets configuration</li>
            </ul>
          </div>

          <div className="flex gap-3">
            <button
              onClick={handleAutoFill}
              disabled={loading || !input.trim()}
              className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 
                       text-white font-semibold py-3 px-6 rounded-lg
                       transition-all duration-200 flex items-center justify-center gap-2
                       disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Fetching...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                  </svg>
                  Auto-Fill Now
                </>
              )}
            </button>
            {onClose && (
              <button
                onClick={onClose}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 
                         text-gray-700 dark:text-gray-300 rounded-lg
                         hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            💡 Tip: You can manually edit any auto-filled data after importing
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoFillFromGitHub;
