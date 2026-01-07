import useTemplateStore from '../../../store/templateStore';

function SocialLinksForm() {
  const updateSection = useTemplateStore(state => state.updateSection);
  const socialLinks = useTemplateStore(state => state.template.sections.socialLinks) || {};

  const handleChange = (field, value) => {
    updateSection('socialLinks', { ...socialLinks, [field]: value, enabled: true });
  };

  const handleClear = (field) => {
    updateSection('socialLinks', { ...socialLinks, [field]: '' });
  };

  const socialPlatforms = [
    { key: 'github', label: 'GitHub', icon: '🐙', placeholder: 'https://github.com/username' },
    { key: 'linkedin', label: 'LinkedIn', icon: '💼', placeholder: 'https://linkedin.com/in/username' },
    { key: 'twitter', label: 'Twitter', icon: '🐦', placeholder: 'https://twitter.com/username' },
    { key: 'portfolio', label: 'Portfolio', icon: '🌐', placeholder: 'https://yourportfolio.com' },
    { key: 'email', label: 'Email', icon: '📧', placeholder: 'your@email.com', type: 'email' },
    { key: 'devto', label: 'Dev.to', icon: '📝', placeholder: 'https://dev.to/username' },
    { key: 'medium', label: 'Medium', icon: '✍️', placeholder: 'https://medium.com/@username' },
    { key: 'hashnode', label: 'Hashnode', icon: '📰', placeholder: 'https://hashnode.com/@username' },
    { key: 'stackoverflow', label: 'Stack Overflow', icon: '📚', placeholder: 'https://stackoverflow.com/users/...' },
    { key: 'youtube', label: 'YouTube', icon: '📺', placeholder: 'https://youtube.com/@channel' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">🔗 Social Links</h3>
        <p className="text-gray-600 text-sm mb-4">Add your social media profiles and contact information</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {socialPlatforms.map(platform => (
          <div key={platform.key} className="relative">
            <label className="block mb-2 font-medium flex items-center gap-2">
              <span>{platform.icon}</span>
              {platform.label}
            </label>
            <div className="flex gap-2">
              <input
                type={platform.type || 'url'}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={socialLinks[platform.key] || ''}
                onChange={(e) => handleChange(platform.key, e.target.value)}
                placeholder={platform.placeholder}
              />
              {socialLinks[platform.key] && (
                <button
                  onClick={() => handleClear(platform.key)}
                  className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Active Links Summary */}
      {Object.keys(socialLinks).filter(key => socialLinks[key] && key !== 'enabled').length > 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">
            Active Links ({Object.keys(socialLinks).filter(key => socialLinks[key] && key !== 'enabled').length})
          </h4>
          <div className="flex flex-wrap gap-2">
            {socialPlatforms
              .filter(platform => socialLinks[platform.key])
              .map(platform => (
                <span
                  key={platform.key}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-white text-blue-700 rounded-full text-sm font-medium"
                >
                  <span>{platform.icon}</span>
                  {platform.label}
                </span>
              ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default SocialLinksForm;
