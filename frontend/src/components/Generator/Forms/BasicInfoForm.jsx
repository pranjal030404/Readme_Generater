import useTemplateStore from '../../../store/templateStore';

function BasicInfoForm() {
  const { basicInfo } = useTemplateStore(state => state.template.sections);
  const updateSection = useTemplateStore(state => state.updateSection);

  const handleChange = (field, value) => {
    updateSection('basicInfo', { ...basicInfo, [field]: value });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Basic Information</h3>
      
      <div>
        <label className="block mb-2 font-medium">Name *</label>
        <input
          type="text"
          className="input"
          value={basicInfo.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your Name"
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Tagline</label>
        <input
          type="text"
          className="input"
          value={basicInfo.tagline || ''}
          onChange={(e) => handleChange('tagline', e.target.value)}
          placeholder="Full Stack Developer | Open Source Enthusiast"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block mb-2 font-medium">Location</label>
          <input
            type="text"
            className="input"
            value={basicInfo.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            placeholder="San Francisco, CA"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">Pronouns</label>
          <input
            type="text"
            className="input"
            value={basicInfo.pronouns || ''}
            onChange={(e) => handleChange('pronouns', e.target.value)}
            placeholder="he/him, she/her, they/them"
          />
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium">Current Focus</label>
        <input
          type="text"
          className="input"
          value={basicInfo.currentFocus || ''}
          onChange={(e) => handleChange('currentFocus', e.target.value)}
          placeholder="Building awesome web applications"
        />
      </div>
    </div>
  );
}

export default BasicInfoForm;
