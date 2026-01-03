import useTemplateStore from '../../../store/templateStore';

function SocialLinksForm() {
  const { socialLinks } = useTemplateStore(state => state.template.sections);
  const updateSection = useTemplateStore(state => state.updateSection);

  const handleChange = (field, value) => {
    updateSection('socialLinks', { ...socialLinks, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Social Links</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">GitHub</label>
          <input
            type="url"
            className="input"
            value={socialLinks.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">LinkedIn</label>
          <input
            type="url"
            className="input"
            value={socialLinks.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Twitter</label>
          <input
            type="url"
            className="input"
            value={socialLinks.twitter || ''}
            onChange={(e) => handleChange('twitter', e.target.value)}
            placeholder="https://twitter.com/username"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Portfolio</label>
          <input
            type="url"
            className="input"
            value={socialLinks.portfolio || ''}
            onChange={(e) => handleChange('portfolio', e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Email</label>
          <input
            type="email"
            className="input"
            value={socialLinks.email || ''}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Dev.to</label>
          <input
            type="url"
            className="input"
            value={socialLinks.devto || ''}
            onChange={(e) => handleChange('devto', e.target.value)}
            placeholder="https://dev.to/username"
          />
        </div>
      </div>
    </div>
  );
}

export default SocialLinksForm;
