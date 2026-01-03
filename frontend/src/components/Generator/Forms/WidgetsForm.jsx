import useTemplateStore from '../../../store/templateStore';

function WidgetsForm() {
  const { widgets } = useTemplateStore(state => state.template.sections);
  const updateWidget = useTemplateStore(state => state.updateWidget);

  const handleToggle = (widgetName) => {
    updateWidget(widgetName, { enabled: !widgets[widgetName].enabled });
  };

  const handleThemeChange = (widgetName, theme) => {
    updateWidget(widgetName, { theme });
  };

  const themes = ['dark', 'radical', 'merko', 'gruvbox', 'tokyonight', 'onedark', 'cobalt', 'synthwave'];

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">Widgets & Integrations</h3>
      
      {/* GitHub Stats */}
      <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium">GitHub Stats Card</label>
          <input
            type="checkbox"
            checked={widgets.githubStats?.enabled || false}
            onChange={() => handleToggle('githubStats')}
            className="w-5 h-5"
          />
        </div>
        {widgets.githubStats?.enabled && (
          <div>
            <label className="block mb-2 text-sm">Theme</label>
            <select
              className="input"
              value={widgets.githubStats.theme}
              onChange={(e) => handleThemeChange('githubStats', e.target.value)}
            >
              {themes.map(theme => (
                <option key={theme} value={theme}>{theme}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* GitHub Streak */}
      <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium">GitHub Streak Stats</label>
          <input
            type="checkbox"
            checked={widgets.githubStreak?.enabled || false}
            onChange={() => handleToggle('githubStreak')}
            className="w-5 h-5"
          />
        </div>
      </div>

      {/* WakaTime */}
      <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <label className="font-medium">WakaTime Stats</label>
          <input
            type="checkbox"
            checked={widgets.wakatime?.enabled || false}
            onChange={() => handleToggle('wakatime')}
            className="w-5 h-5"
          />
        </div>
        {widgets.wakatime?.enabled && (
          <div>
            <label className="block mb-2 text-sm">WakaTime Username</label>
            <input
              type="text"
              className="input"
              value={widgets.wakatime.username || ''}
              onChange={(e) => updateWidget('wakatime', { username: e.target.value })}
              placeholder="your-wakatime-username"
            />
          </div>
        )}
      </div>

      {/* Visitor Counter */}
      <div className="p-4 border border-gray-200 dark:border-dark-700 rounded-lg">
        <div className="flex items-center justify-between">
          <label className="font-medium">Visitor Counter</label>
          <input
            type="checkbox"
            checked={widgets.visitorCounter?.enabled || false}
            onChange={() => handleToggle('visitorCounter')}
            className="w-5 h-5"
          />
        </div>
      </div>
    </div>
  );
}

export default WidgetsForm;
