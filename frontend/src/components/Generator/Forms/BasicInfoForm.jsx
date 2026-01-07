import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function BasicInfoForm() {
  const updateSection = useTemplateStore(state => state.updateSection);
  const basicInfo = useTemplateStore(state => state.template.sections.basicInfo) || {};
  const [editingField, setEditingField] = useState(null);

  const handleChange = (field, value) => {
    updateSection('basicInfo', { ...basicInfo, [field]: value, enabled: true });
  };

  const handleClear = (field) => {
    updateSection('basicInfo', { ...basicInfo, [field]: '' });
  };

  const fields = [
    { key: 'name', label: 'Name', icon: '👤', required: true, placeholder: 'Your Name' },
    { key: 'tagline', label: 'Tagline', icon: '✨', placeholder: 'Full Stack Developer | Open Source Enthusiast' },
    { key: 'location', label: 'Location', icon: '📍', placeholder: 'San Francisco, CA' },
    { key: 'pronouns', label: 'Pronouns', icon: '🏷️', placeholder: 'he/him, she/her, they/them' },
    { key: 'currentFocus', label: 'Current Focus', icon: '🎯', placeholder: 'Building awesome web applications' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">👤 Basic Information</h3>
        <p className="text-gray-600 text-sm mb-4">Tell us about yourself</p>
      </div>
      
      <div className="space-y-4">
        {fields.map(field => (
          <div key={field.key} className="group">
            <label className="block mb-2 font-medium flex items-center gap-2">
              <span>{field.icon}</span>
              {field.label}
              {field.required && <span className="text-red-500">*</span>}
            </label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 transition-all"
                value={basicInfo[field.key] || ''}
                onChange={(e) => handleChange(field.key, e.target.value)}
                onFocus={() => setEditingField(field.key)}
                onBlur={() => setEditingField(null)}
                placeholder={field.placeholder}
              />
              {basicInfo[field.key] && editingField === field.key && (
                <button
                  onClick={() => handleClear(field.key)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                  title="Clear"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Preview Card */}
      {basicInfo.name && (
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg p-6 mt-6">
          <h4 className="font-bold text-2xl text-gray-900 mb-2">{basicInfo.name}</h4>
          {basicInfo.tagline && (
            <p className="text-gray-700 mb-3">✨ {basicInfo.tagline}</p>
          )}
          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            {basicInfo.location && (
              <span className="flex items-center gap-1">
                📍 {basicInfo.location}
              </span>
            )}
            {basicInfo.pronouns && (
              <span className="flex items-center gap-1">
                🏷️ {basicInfo.pronouns}
              </span>
            )}
          </div>
          {basicInfo.currentFocus && (
            <p className="mt-3 text-gray-700">
              🎯 Currently: {basicInfo.currentFocus}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default BasicInfoForm;
