import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function WidgetsForm() {
  const widgets = useTemplateStore(state => state.template.sections.widgets) || {};
  const updateWidget = useTemplateStore(state => state.updateWidget);
  const [expandedWidget, setExpandedWidget] = useState(null);

  const handleToggle = (widgetName) => {
    const currentWidget = widgets[widgetName] || {};
    updateWidget(widgetName, { ...currentWidget, enabled: !currentWidget.enabled });
  };

  const handleThemeChange = (widgetName, theme) => {
    const currentWidget = widgets[widgetName] || {};
    updateWidget(widgetName, { ...currentWidget, theme });
  };

  const handleWidgetUpdate = (widgetName, updates) => {
    const currentWidget = widgets[widgetName] || {};
    updateWidget(widgetName, { ...currentWidget, ...updates });
  };

  const themes = [
    { value: 'dark', label: 'Dark', color: '#151515' },
    { value: 'radical', label: 'Radical', color: '#141321' },
    { value: 'merko', label: 'Merko', color: '#0a0f0d' },
    { value: 'gruvbox', label: 'Gruvbox', color: '#282828' },
    { value: 'tokyonight', label: 'Tokyo Night', color: '#1a1b26' },
    { value: 'onedark', label: 'One Dark', color: '#282c34' },
    { value: 'cobalt', label: 'Cobalt', color: '#193549' },
    { value: 'synthwave', label: 'Synthwave', color: '#2b213a' },
    { value: 'dracula', label: 'Dracula', color: '#282a36' },
    { value: 'monokai', label: 'Monokai', color: '#272822' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">📊 Widgets & Integrations</h3>
        <p className="text-gray-600 text-sm mb-4">Add dynamic widgets to showcase your activity</p>
      </div>
      
      {/* GitHub Stats */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 cursor-pointer hover:from-blue-100 hover:to-blue-200 transition-all"
          onClick={() => setExpandedWidget(expandedWidget === 'githubStats' ? null : 'githubStats')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📊</span>
              <div>
                <h4 className="font-semibold text-gray-900">GitHub Stats Card</h4>
                <p className="text-sm text-gray-600">Show your GitHub statistics</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgets.githubStats?.enabled || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle('githubStats');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
              <span className="text-gray-500">{expandedWidget === 'githubStats' ? '▼' : '▶'}</span>
            </div>
          </div>
        </div>
        
        {expandedWidget === 'githubStats' && widgets.githubStats?.enabled && (
          <div className="p-4 space-y-4 bg-gray-50">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange('githubStats', theme.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      widgets.githubStats?.theme === theme.value
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded" 
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <span className="text-sm font-medium">{theme.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="github-stats-private"
                checked={widgets.githubStats?.countPrivate || false}
                onChange={(e) => handleWidgetUpdate('githubStats', { countPrivate: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="github-stats-private" className="text-sm text-gray-700">
                Count private contributions
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="github-stats-icons"
                checked={widgets.githubStats?.showIcons !== false}
                onChange={(e) => handleWidgetUpdate('githubStats', { showIcons: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="github-stats-icons" className="text-sm text-gray-700">
                Show icons
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="github-stats-border"
                checked={widgets.githubStats?.hideBorder !== false}
                onChange={(e) => handleWidgetUpdate('githubStats', { hideBorder: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded"
              />
              <label htmlFor="github-stats-border" className="text-sm text-gray-700">
                Hide border
              </label>
            </div>
          </div>
        )}
      </div>

      {/* GitHub Streak */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 cursor-pointer hover:from-orange-100 hover:to-orange-200 transition-all"
          onClick={() => setExpandedWidget(expandedWidget === 'githubStreak' ? null : 'githubStreak')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">🔥</span>
              <div>
                <h4 className="font-semibold text-gray-900">GitHub Streak Stats</h4>
                <p className="text-sm text-gray-600">Display your contribution streak</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgets.githubStreak?.enabled || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle('githubStreak');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-600"></div>
              </label>
              <span className="text-gray-500">{expandedWidget === 'githubStreak' ? '▼' : '▶'}</span>
            </div>
          </div>
        </div>
        
        {expandedWidget === 'githubStreak' && widgets.githubStreak?.enabled && (
          <div className="p-4 space-y-4 bg-gray-50">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange('githubStreak', theme.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      widgets.githubStreak?.theme === theme.value
                        ? 'border-orange-600 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded" 
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <span className="text-sm font-medium">{theme.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="github-streak-border"
                checked={widgets.githubStreak?.hideBorder !== false}
                onChange={(e) => handleWidgetUpdate('githubStreak', { hideBorder: e.target.checked })}
                className="w-4 h-4 text-orange-600 rounded"
              />
              <label htmlFor="github-streak-border" className="text-sm text-gray-700">
                Hide border
              </label>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <strong>Note:</strong> The GitHub Streak service is experiencing issues (500 errors). This is a temporary external service problem.
            </div>
          </div>
        )}
      </div>

      {/* Top Languages */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 cursor-pointer hover:from-purple-100 hover:to-purple-200 transition-all"
          onClick={() => setExpandedWidget(expandedWidget === 'topLanguages' ? null : 'topLanguages')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">📈</span>
              <div>
                <h4 className="font-semibold text-gray-900">Top Languages</h4>
                <p className="text-sm text-gray-600">Show your most used languages</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgets.topLanguages?.enabled || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle('topLanguages');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
              </label>
              <span className="text-gray-500">{expandedWidget === 'topLanguages' ? '▼' : '▶'}</span>
            </div>
          </div>
        </div>
        
        {expandedWidget === 'topLanguages' && widgets.topLanguages?.enabled && (
          <div className="p-4 space-y-4 bg-gray-50">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Layout</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleWidgetUpdate('topLanguages', { layout: 'compact' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    widgets.topLanguages?.layout === 'compact'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">Compact</span>
                </button>
                <button
                  onClick={() => handleWidgetUpdate('topLanguages', { layout: 'default' })}
                  className={`p-3 rounded-lg border-2 transition-all ${
                    widgets.topLanguages?.layout === 'default'
                      ? 'border-purple-600 bg-purple-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="text-sm font-medium">Default</span>
                </button>
              </div>
            </div>
            
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Theme</label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {themes.map(theme => (
                  <button
                    key={theme.value}
                    onClick={() => handleThemeChange('topLanguages', theme.value)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      widgets.topLanguages?.theme === theme.value
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-6 h-6 rounded" 
                        style={{ backgroundColor: theme.color }}
                      ></div>
                      <span className="text-sm font-medium">{theme.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="top-lang-border"
                checked={widgets.topLanguages?.hideBorder !== false}
                onChange={(e) => handleWidgetUpdate('topLanguages', { hideBorder: e.target.checked })}
                className="w-4 h-4 text-purple-600 rounded"
              />
              <label htmlFor="top-lang-border" className="text-sm text-gray-700">
                Hide border
              </label>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 text-sm text-yellow-800">
              <strong>Note:</strong> The GitHub Stats service may experience intermittent 503 errors. This is a temporary external service issue.
            </div>
          </div>
        )}
      </div>

      {/* WakaTime */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div 
          className="p-4 bg-gradient-to-r from-green-50 to-green-100 cursor-pointer hover:from-green-100 hover:to-green-200 transition-all"
          onClick={() => setExpandedWidget(expandedWidget === 'wakatime' ? null : 'wakatime')}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">⏱️</span>
              <div>
                <h4 className="font-semibold text-gray-900">WakaTime Stats</h4>
                <p className="text-sm text-gray-600">Show your coding activity</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={widgets.wakatime?.enabled || false}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleToggle('wakatime');
                  }}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
              </label>
              <span className="text-gray-500">{expandedWidget === 'wakatime' ? '▼' : '▶'}</span>
            </div>
          </div>
        </div>
        
        {expandedWidget === 'wakatime' && widgets.wakatime?.enabled && (
          <div className="p-4 space-y-4 bg-gray-50">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">WakaTime Username</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={widgets.wakatime?.username || ''}
                onChange={(e) => handleWidgetUpdate('wakatime', { username: e.target.value })}
                placeholder="your-wakatime-username"
              />
            </div>
          </div>
        )}
      </div>

      {/* Visitor Counter */}
      <div className="bg-white border-2 border-gray-200 rounded-lg overflow-hidden">
        <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">👁️</span>
              <div>
                <h4 className="font-semibold text-gray-900">Visitor Counter</h4>
                <p className="text-sm text-gray-600">Track profile views</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={widgets.visitorCounter?.enabled || false}
                onChange={() => handleToggle('visitorCounter')}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
            </label>
          </div>
        </div>
      </div>

      {/* Active Widgets Summary */}
      {Object.keys(widgets).filter(key => widgets[key]?.enabled).length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            Active Widgets ({Object.keys(widgets).filter(key => widgets[key]?.enabled).length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {widgets.githubStats?.enabled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-blue-700 rounded-full text-sm font-medium">
                📊 GitHub Stats
              </span>
            )}
            {widgets.githubStreak?.enabled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-orange-700 rounded-full text-sm font-medium">
                🔥 GitHub Streak
              </span>
            )}
            {widgets.topLanguages?.enabled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-purple-700 rounded-full text-sm font-medium">
                📈 Top Languages
              </span>
            )}
            {widgets.wakatime?.enabled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-green-700 rounded-full text-sm font-medium">
                ⏱️ WakaTime
              </span>
            )}
            {widgets.visitorCounter?.enabled && (
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-white text-indigo-700 rounded-full text-sm font-medium">
                👁️ Visitor Counter
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default WidgetsForm;
