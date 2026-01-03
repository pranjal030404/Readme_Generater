import { useState } from 'react';
import useTemplateStore from '../../store/templateStore';
import BasicInfoForm from './Forms/BasicInfoForm';
import AboutMeForm from './Forms/AboutMeForm';
import SkillsForm from './Forms/SkillsForm';
import ProjectsForm from './Forms/ProjectsForm';
import SocialLinksForm from './Forms/SocialLinksForm';
import WidgetsForm from './Forms/WidgetsForm';

function FormSections({ onGenerate }) {
  const [activeSection, setActiveSection] = useState('basicInfo');

  const sections = [
    { id: 'basicInfo', label: 'Basic Info', component: BasicInfoForm },
    { id: 'aboutMe', label: 'About Me', component: AboutMeForm },
    { id: 'skills', label: 'Skills', component: SkillsForm },
    { id: 'projects', label: 'Projects', component: ProjectsForm },
    { id: 'socialLinks', label: 'Social Links', component: SocialLinksForm },
    { id: 'widgets', label: 'Widgets', component: WidgetsForm },
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
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeSection === section.id
                ? 'bg-primary-600 text-white'
                : 'bg-gray-100 dark:bg-dark-700 hover:bg-gray-200 dark:hover:bg-dark-600'
            }`}
          >
            {section.label}
          </button>
        ))}
      </div>

      {/* Active Form */}
      {ActiveComponent && <ActiveComponent onGenerate={onGenerate} />}
    </div>
  );
}

export default FormSections;
