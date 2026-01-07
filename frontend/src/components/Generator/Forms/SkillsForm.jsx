import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function SkillsForm() {
  const updateSection = useTemplateStore(state => state.updateSection);
  const skills = useTemplateStore(state => state.template.sections.skills) || {
    languages: [],
    frameworks: [],
    databases: [],
    tools: [],
    cloud: [],
    devops: []
  };

  const [activeCategory, setActiveCategory] = useState('languages');
  const [newSkill, setNewSkill] = useState('');

  const categories = [
    { key: 'languages', label: '💻 Languages', icon: '💻' },
    { key: 'frameworks', label: '⚛️ Frameworks', icon: '⚛️' },
    { key: 'databases', label: '🗄️ Databases', icon: '🗄️' },
    { key: 'tools', label: '🛠️ Tools', icon: '🛠️' },
    { key: 'cloud', label: '☁️ Cloud', icon: '☁️' },
    { key: 'devops', label: '🚀 DevOps', icon: '🚀' }
  ];

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    
    const currentSkills = skills[activeCategory] || [];
    if (!currentSkills.includes(newSkill.trim())) {
      updateSection('skills', {
        ...skills,
        [activeCategory]: [...currentSkills, newSkill.trim()],
        enabled: true
      });
    }
    setNewSkill('');
  };

  const handleRemoveSkill = (category, skillToRemove) => {
    const currentSkills = skills[category] || [];
    updateSection('skills', {
      ...skills,
      [category]: currentSkills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleBulkAdd = (category, text) => {
    const skillsArray = text.split(',').map(s => s.trim()).filter(Boolean);
    const currentSkills = skills[category] || [];
    const uniqueSkills = [...new Set([...currentSkills, ...skillsArray])];
    
    updateSection('skills', {
      ...skills,
      [category]: uniqueSkills,
      enabled: true
    });
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold mb-4">🛠️ Skills & Technologies</h3>
      
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map(cat => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`px-4 py-2 rounded-lg font-medium transition-all ${
              activeCategory === cat.key
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add Skill Form */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder={`Add ${categories.find(c => c.key === activeCategory)?.label} skill...`}
          />
          <button
            onClick={handleAddSkill}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            + Add
          </button>
        </div>

        {/* Bulk Add */}
        <div className="mt-3">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Or add multiple (comma-separated):
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              id={`bulk-${activeCategory}`}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB, ..."
            />
            <button
              onClick={() => {
                const input = document.getElementById(`bulk-${activeCategory}`);
                handleBulkAdd(activeCategory, input.value);
                input.value = '';
              }}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              Add All
            </button>
          </div>
        </div>
      </div>

      {/* Skills Display */}
      <div className="space-y-4">
        {categories.map(category => {
          const categorySkills = skills[category.key] || [];
          if (categorySkills.length === 0) return null;

          return (
            <div key={category.key} className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-lg mb-3 flex items-center gap-2">
                <span>{category.icon}</span>
                {category.label}
                <span className="text-sm text-gray-500">({categorySkills.length})</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {categorySkills.map((skill, index) => (
                  <div
                    key={index}
                    className="group flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-700 rounded-lg hover:bg-blue-100 transition-colors"
                  >
                    <span className="text-sm font-medium">{skill}</span>
                    <button
                      onClick={() => handleRemoveSkill(category.key, skill)}
                      className="text-red-600 hover:text-red-700 opacity-0 group-hover:opacity-100 transition-opacity"
                      title="Remove skill"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        {Object.values(skills).every(arr => !arr || arr.length === 0) && (
          <div className="text-center py-8 text-gray-500">
            <p>No skills added yet. Start adding skills using the form above!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SkillsForm;
