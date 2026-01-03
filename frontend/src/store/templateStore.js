import { create } from 'zustand';

const initialTemplate = {
  name: 'Untitled README',
  sections: {
    basicInfo: {
      name: '',
      tagline: '',
      location: '',
      pronouns: '',
      currentFocus: '',
      enabled: true
    },
    aboutMe: {
      bio: '',
      funFacts: [],
      currentlyLearning: [],
      collaborationInterests: '',
      enabled: true
    },
    skills: {
      languages: [],
      frameworks: [],
      databases: [],
      tools: [],
      cloud: [],
      devops: [],
      enabled: true
    },
    workExperience: [],
    education: [],
    projects: [],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      portfolio: '',
      email: '',
      devto: '',
      hashnode: '',
      medium: '',
      stackoverflow: '',
      youtube: '',
      enabled: true
    },
    certifications: [],
    widgets: {
      githubStats: {
        enabled: true,
        theme: 'dark',
        showIcons: true,
        hideRank: false
      },
      githubStreak: {
        enabled: true,
        theme: 'dark'
      },
      topLanguages: {
        enabled: true,
        layout: 'compact',
        theme: 'dark'
      },
      activityGraph: {
        enabled: false,
        theme: 'github'
      },
      trophies: {
        enabled: false,
        theme: 'darkhub'
      },
      wakatime: {
        enabled: false,
        username: ''
      },
      blogPosts: {
        enabled: false,
        source: 'devto',
        username: '',
        customRssUrl: '',
        maxPosts: 5
      },
      spotify: {
        enabled: false
      },
      visitorCounter: {
        enabled: false
      },
      typingSvg: {
        enabled: false,
        text: ''
      }
    }
  },
  theme: {
    name: 'dark',
    accentColor: '#3b82f6',
    headerStyle: 'default'
  },
  customization: {
    layout: 'professional',
    sectionOrder: ['aboutMe', 'skills', 'githubStats', 'projects', 'socialLinks'],
    alignment: 'left',
    showTableOfContents: false
  }
};

const useTemplateStore = create((set, get) => ({
  template: initialTemplate,
  savedTemplates: [],
  currentTemplateId: null,
  
  updateTemplate: (updates) => {
    set(state => ({
      template: {
        ...state.template,
        ...updates
      }
    }));
  },
  
  updateSection: (sectionName, data) => {
    set(state => ({
      template: {
        ...state.template,
        sections: {
          ...state.template.sections,
          [sectionName]: {
            ...state.template.sections[sectionName],
            ...data
          }
        }
      }
    }));
  },
  
  updateWidget: (widgetName, data) => {
    set(state => ({
      template: {
        ...state.template,
        sections: {
          ...state.template.sections,
          widgets: {
            ...state.template.sections.widgets,
            [widgetName]: {
              ...state.template.sections.widgets[widgetName],
              ...data
            }
          }
        }
      }
    }));
  },
  
  updateTheme: (themeData) => {
    set(state => ({
      template: {
        ...state.template,
        theme: {
          ...state.template.theme,
          ...themeData
        }
      }
    }));
  },
  
  updateCustomization: (customData) => {
    set(state => ({
      template: {
        ...state.template,
        customization: {
          ...state.template.customization,
          ...customData
        }
      }
    }));
  },
  
  resetTemplate: () => {
    set({
      template: initialTemplate,
      currentTemplateId: null
    });
  },
  
  loadTemplate: (templateData) => {
    set({
      template: templateData,
      currentTemplateId: templateData._id || null
    });
  },
  
  setSavedTemplates: (templates) => {
    set({ savedTemplates: templates });
  },
  
  addSavedTemplate: (template) => {
    set(state => ({
      savedTemplates: [template, ...state.savedTemplates]
    }));
  }
}));

export default useTemplateStore;
