import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { githubAPI } from '../services/api';
import GitHubStatsInput from '../components/GitHubStats/GitHubStatsInput';
import GitHubStatsDisplay from '../components/GitHubStats/GitHubStatsDisplay';
import useTemplateStore from '../store/templateStore';
import toast from 'react-hot-toast';

const GitHubStats = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setGitHubComprehensiveStats } = useTemplateStore();

  const handleFetchStats = async (usernameOrUrl) => {
    setLoading(true);
    setError('');
    setStats(null);

    try {
      const response = await githubAPI.getComprehensiveStats(usernameOrUrl);
      
      if (response.data.success) {
        setStats(response.data.data);
        toast.success('GitHub stats fetched successfully!');
      } else {
        setError(response.data.message || 'Failed to fetch GitHub stats');
      }
    } catch (err) {
      console.error('Error fetching GitHub stats:', err);
      setError(
        err.response?.data?.message || 
        'Failed to fetch GitHub stats. Please check the username/URL and try again.'
      );
      toast.error('Failed to fetch GitHub stats');
    } finally {
      setLoading(false);
    }
  };

  const handleUseInGenerator = () => {
    if (stats) {
      setGitHubComprehensiveStats(stats);
      toast.success('Stats saved! Redirecting to generator...');
      setTimeout(() => {
        navigate('/generator');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 px-4">
      <div className="container mx-auto">
        <GitHubStatsInput onFetch={handleFetchStats} loading={loading} />
        
        {error && (
          <div className="max-w-2xl mx-auto mt-6">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <div>
                  <h3 className="font-semibold text-red-800 dark:text-red-400">Error</h3>
                  <p className="text-red-700 dark:text-red-300">{error}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {loading && (
          <div className="max-w-2xl mx-auto mt-8">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
              <div className="flex flex-col items-center gap-4">
                <svg className="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-gray-700 dark:text-gray-300 text-lg">
                  Fetching comprehensive GitHub statistics...
                </p>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  This may take a few moments
                </p>
              </div>
            </div>
          </div>
        )}

        {stats && (
          <>
            <GitHubStatsDisplay stats={stats} />
            
            <div className="max-w-6xl mx-auto mt-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Use in README Generator
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      Save these stats and use them to create an awesome README
                    </p>
                  </div>
                  <button
                    onClick={handleUseInGenerator}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-semibold 
                             py-3 px-8 rounded-lg transition-all duration-200 
                             flex items-center gap-2 shadow-md hover:shadow-lg"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Use in Generator
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default GitHubStats;
