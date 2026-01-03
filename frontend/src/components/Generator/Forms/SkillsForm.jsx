import useTemplateStore from '../../../store/templateStore';

function SkillsForm() {
  const { skills } = useTemplateStore(state => state.template.sections);
  const updateSection = useTemplateStore(state => state.updateSection);

  const handleChange = (field, value) => {
    updateSection('skills', { ...skills, [field]: value.split(',').map(s => s.trim()).filter(Boolean) });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-4">Skills & Technologies</h3>
      
      <div>
        <label className="block mb-2 font-medium">Languages</label>
        <input
          type="text"
          className="input"
          placeholder="JavaScript, Python, Java, etc."
          onChange={(e) => handleChange('languages', e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Frameworks & Libraries</label>
        <input
          type="text"
          className="input"
          placeholder="React, Node.js, Django, etc."
          onChange={(e) => handleChange('frameworks', e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Databases</label>
        <input
          type="text"
          className="input"
          placeholder="MongoDB, PostgreSQL, Redis, etc."
          onChange={(e) => handleChange('databases', e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Tools & Platforms</label>
        <input
          type="text"
          className="input"
          placeholder="Git, Docker, VS Code, etc."
          onChange={(e) => handleChange('tools', e.target.value)}
        />
      </div>

      <div>
        <label className="block mb-2 font-medium">Cloud Services</label>
        <input
          type="text"
          className="input"
          placeholder="AWS, Azure, GCP, etc."
          onChange={(e) => handleChange('cloud', e.target.value)}
        />
      </div>
    </div>
  );
}

export default SkillsForm;
