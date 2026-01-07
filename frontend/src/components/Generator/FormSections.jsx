import { useState } from 'react';
import useTemplateStore from '../../store/templateStore';
import BasicInfoForm from './Forms/BasicInfoForm';
import AboutMeForm from './Forms/AboutMeForm';
import SkillsForm from './Forms/SkillsForm';
import ProjectsForm from './Forms/ProjectsForm';
import SocialLinksForm from './Forms/SocialLinksForm';
import WidgetsForm from './Forms/WidgetsForm';
import StyleCustomizationForm from './Forms/StyleCustomizationForm';

function FormSections({ onGenerate }) {
  const [activeSection, setActiveSection] = useState('basicInfo');

  const sections = [
    { id: 'basicInfo', label: 'Basic Info', icon: '👤', component: BasicInfoForm },
    { id: 'aboutMe', label: 'About Me', icon: '📝', component: AboutMeForm },
    { id: 'skills', label: 'Skills', icon: '🛠️', component: SkillsForm },
    { id: 'projects', label: 'Projects', icon: '📂', component: ProjectsForm },
    { id: 'socialLinks', label: 'Social Links', icon: '🔗', component: SocialLinksForm },
    { id: 'widgets', label: 'Widgets', icon: '📊', component: WidgetsForm },
    { id: 'styling', label: 'Styling', icon: '🎨', component: StyleCustomizationForm },
  ];

  const ActiveComponent = sections.find(s => s.id === activeSection)?.component;

  return (
    <div className="card">
      {/* Section Tabs */}
      <div className="flex flex-wrap gap-2 mb-6 border-b border-gray-200 dark:border-dark-700 pb-4">
        {sections.map(section => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
              activeSection === section.id
                ? 'bg-primary-600 text-white shadow-md scale-105'
                : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600 hover:scale-105'
            }`}
          >
            <span className="text-lg">{section.icon}</span>
            <span>{section.label}</span>
          </button>
        ))}
      </div>

      {/* Active Form */}
      {ActiveComponent && <ActiveComponent onGenerate={onGenerate} />}
    </div>
  );
}

export default FormSections;
