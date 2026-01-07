import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function AboutMeForm() {
  const updateSection = useTemplateStore(state => state.updateSection);
  const aboutMe = useTemplateStore(state => state.template.sections.aboutMe) || {};
  const [charCount, setCharCount] = useState((aboutMe.bio || '').length);

  const handleBioChange = (value) => {
    setCharCount(value.length);
    updateSection('aboutMe', { ...aboutMe, bio: value, enabled: true });
  };

  const handleChange = (field, value) => {
    updateSection('aboutMe', { ...aboutMe, [field]: value, enabled: true });
  };

  const handleClearBio = () => {
    setCharCount(0);
    updateSection('aboutMe', { ...aboutMe, bio: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">📝 About Me</h3>
        <p className="text-gray-600 text-sm mb-4">Share your story and interests</p>
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block font-medium flex items-center gap-2">
            <span>✍️</span>
            Bio / Introduction
          </label>
          <span className="text-sm text-gray-500">{charCount} characters</span>
        </div>
        <div className="relative">
          <textarea
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical min-h-[120px]"
            rows="6"
            value={aboutMe.bio || ''}
            onChange={(e) => handleBioChange(e.target.value)}
            placeholder="Tell us about yourself... What do you do? What are you passionate about?"
          />
          {aboutMe.bio && (
            <button
              onClick={handleClearBio}
              className="absolute top-3 right-3 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
              title="Clear bio"
            >
              ✕ Clear
            </button>
          )}
        </div>
      </div>

      <div>
        <label className="block mb-2 font-medium flex items-center gap-2">
          <span>📚</span>
          Currently Learning
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={Array.isArray(aboutMe.currentlyLearning) ? aboutMe.currentlyLearning.join(', ') : aboutMe.currentlyLearning || ''}
          onChange={(e) => handleChange('currentlyLearning', e.target.value.split(',').map(s => s.trim()).filter(Boolean))}
          placeholder="React, TypeScript, Docker, Kubernetes..."
        />
        <p className="text-xs text-gray-500 mt-1">Separate multiple items with commas</p>
        {aboutMe.currentlyLearning && aboutMe.currentlyLearning.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {(Array.isArray(aboutMe.currentlyLearning) ? aboutMe.currentlyLearning : [aboutMe.currentlyLearning]).map((item, index) => (
              <span key={index} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm">
                {item}
              </span>
            ))}
          </div>
        )}
      </div>

      <div>
        <label className="block mb-2 font-medium flex items-center gap-2">
          <span>🤝</span>
          Open to Collaborate On
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={aboutMe.collaborationInterests || ''}
          onChange={(e) => handleChange('collaborationInterests', e.target.value)}
          placeholder="Open source projects, web apps, mobile apps, startups..."
        />
      </div>

      <div>
        <label className="block mb-2 font-medium flex items-center gap-2">
          <span>❓</span>
          Ask Me About
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={aboutMe.askMeAbout || ''}
          onChange={(e) => handleChange('askMeAbout', e.target.value)}
          placeholder="React, Node.js, System Design, Career advice..."
        />
      </div>

      <div>
        <label className="block mb-2 font-medium flex items-center gap-2">
          <span>⚡</span>
          Fun Fact
        </label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          value={aboutMe.funFact || ''}
          onChange={(e) => handleChange('funFact', e.target.value)}
          placeholder="Something interesting about you..."
        />
      </div>

      {/* Preview */}
      {aboutMe.bio && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <h4 className="font-semibold text-lg mb-2">Preview</h4>
          <p className="text-gray-700 whitespace-pre-wrap">{aboutMe.bio}</p>
        </div>
      )}
    </div>
  );
}

export default AboutMeForm;
