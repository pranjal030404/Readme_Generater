import { useState } from 'react';

const GitHubStatsDisplay = ({ stats }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!stats) return null;

  const { profile, repositoryStats, languages, topLanguages, mostStarredRepos, recentlyUpdatedRepos, activity, socialStats } = stats;

  const formatNumber = (num) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num?.toString() || '0';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const StatCard = ({ icon, label, value, subtext }) => (
    <div className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 
                    rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <div className="text-blue-600 dark:text-blue-400">{icon}</div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {subtext && <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">{subtext}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full max-w-6xl mx-auto mt-8">
      {/* Profile Header */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-24 h-24 rounded-full border-4 border-blue-500"
          />
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {profile.name || profile.login}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">@{profile.login}</p>
            {profile.bio && (
              <p className="mt-2 text-gray-700 dark:text-gray-300">{profile.bio}</p>
            )}
            <div className="flex flex-wrap gap-3 mt-4 justify-center md:justify-start text-sm text-gray-600 dark:text-gray-400">
              {profile.company && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clipRule="evenodd" />
                  </svg>
                  {profile.company}
                </span>
              )}
              {profile.location && (
                <span className="flex items-center gap-1">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {profile.location}
                </span>
              )}
              {profile.blog && (
                <a href={profile.blog} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
                  </svg>
                  Website
                </a>
              )}
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Member since</p>
            <p className="font-semibold text-gray-900 dark:text-white">{formatDate(profile.createdAt)}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg mb-6">
        <div className="flex border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: '📊' },
            { id: 'repos', label: 'Repositories', icon: '📦' },
            { id: 'languages', label: 'Languages', icon: '💻' },
            { id: 'activity', label: 'Activity', icon: '⚡' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <StatCard
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" /></svg>}
                  label="Followers"
                  value={formatNumber(socialStats.followers)}
                />
                <StatCard
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" /></svg>}
                  label="Repositories"
                  value={formatNumber(repositoryStats.totalRepos)}
                  subtext={`${repositoryStats.originalRepos} original`}
                />
                <StatCard
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>}
                  label="Total Stars"
                  value={formatNumber(repositoryStats.totalStars)}
                />
                <StatCard
                  icon={<svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M7.707 3.293a1 1 0 010 1.414L5.414 7H11a7 7 0 017 7v2a1 1 0 11-2 0v-2a5 5 0 00-5-5H5.414l2.293 2.293a1 1 0 11-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" /></svg>}
                  label="Total Forks"
                  value={formatNumber(repositoryStats.totalForks)}
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Top Languages</h3>
                <div className="space-y-3">
                  {topLanguages?.slice(0, 5).map((lang, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{lang.language}</span>
                        <span className="text-gray-600 dark:text-gray-400">{lang.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Repositories Tab */}
          {activeTab === 'repos' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Most Starred Repositories</h3>
              <div className="grid gap-4">
                {mostStarredRepos?.map((repo, index) => (
                  <a
                    key={index}
                    href={repo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline">
                          {repo.name}
                        </h4>
                        {repo.description && (
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{repo.description}</p>
                        )}
                        <div className="flex gap-4 mt-2 text-sm text-gray-600 dark:text-gray-400">
                          {repo.language && (
                            <span className="flex items-center gap-1">
                              <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                              {repo.language}
                            </span>
                          )}
                          <span className="flex items-center gap-1">
                            ⭐ {repo.stars}
                          </span>
                          <span className="flex items-center gap-1">
                            🔀 {repo.forks}
                          </span>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* Languages Tab */}
          {activeTab === 'languages' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Language Distribution</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {languages?.map((lang, index) => (
                  <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-gray-900 dark:text-white">{lang.language}</span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{lang.count} repos</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                          style={{ width: `${lang.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{lang.percentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <StatCard
                  icon={<span className="text-2xl">🔄</span>}
                  label="Recent Events"
                  value={activity.recentEvents}
                />
                <StatCard
                  icon={<span className="text-2xl">💾</span>}
                  label="Estimated Commits"
                  value={activity.estimatedCommits}
                  subtext="from recent activity"
                />
                <StatCard
                  icon={<span className="text-2xl">📈</span>}
                  label="Following Ratio"
                  value={socialStats.followersToFollowingRatio}
                  subtext="followers/following"
                />
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Activity by Type</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {Object.entries(activity.eventsByType).map(([type, count]) => (
                    <div key={type} className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <p className="text-sm text-gray-600 dark:text-gray-400">{type}</p>
                      <p className="text-xl font-bold text-gray-900 dark:text-white">{count}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Recently Updated</h3>
                <div className="space-y-2">
                  {recentlyUpdatedRepos?.slice(0, 5).map((repo, index) => (
                    <a
                      key={index}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="flex-1">
                        <h4 className="font-semibold text-blue-600 dark:text-blue-400">{repo.name}</h4>
                        {repo.language && (
                          <p className="text-xs text-gray-600 dark:text-gray-400">{repo.language}</p>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-600 dark:text-gray-400">
                        <p>{formatDate(repo.updatedAt)}</p>
                        <p>⭐ {repo.stars}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubStatsDisplay;
