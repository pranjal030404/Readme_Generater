import useTemplateStore from '../../../store/templateStore';

function AboutMeForm() {
  const { aboutMe } = useTemplateStore(state => state.template.sections);
  const updateSection = useTemplateStore(state => state.updateSection);

  const handleChange = (field, value) => {
    updateSection('aboutMe', { ...aboutMe, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">About Me</h3>
      
      <div>
        <label className="block mb-2 font-medium">Bio</label>
        <textarea
          className="textarea"
          rows="4"
          value={aboutMe.bio || ''}
          onChange={(e) => handleChange('bio', e.target.value)}
          placeholder="Tell us about yourself..."
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Currently Learning</label>
        <input
          type="text"
          className="input"
          placeholder="Comma-separated skills (e.g., React, TypeScript, Docker)"
          onChange={(e) => handleChange('currentlyLearning', e.target.value.split(',').map(s => s.trim()))}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Collaboration Interests</label>
        <input
          type="text"
          className="input"
          value={aboutMe.collaborationInterests || ''}
          onChange={(e) => handleChange('collaborationInterests', e.target.value)}
          placeholder="Open source projects, startups, etc."
        />
      </div>
    </div>
  );
}

export default AboutMeForm;
