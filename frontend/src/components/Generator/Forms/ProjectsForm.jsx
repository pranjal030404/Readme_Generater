import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function ProjectsForm() {
  const updateSection = useTemplateStore(state => state.updateSection);
  const projects = useTemplateStore(state => state.template.sections.projects?.list) || [];
  const projectsEnabled = useTemplateStore(state => state.template.sections.projects?.enabled);
  const [editingIndex, setEditingIndex] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    techStack: '',
    github: '',
    demo: ''
  });

  const handleAddProject = () => {
    if (!formData.name || !formData.description) {
      alert('Please fill project name and description');
      return;
    }

    const newProjects = [...projects, {
      ...formData,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
    }];

    updateSection('projects', { list: newProjects, enabled: true });
    setFormData({ name: '', description: '', techStack: '', github: '', demo: '' });
  };

  const handleEditProject = (index) => {
    const project = projects[index];
    setEditingIndex(index);
    setFormData({
      ...project,
      techStack: Array.isArray(project.techStack) ? project.techStack.join(', ') : project.techStack || ''
    });
  };

  const handleUpdateProject = () => {
    const newProjects = [...projects];
    newProjects[editingIndex] = {
      ...formData,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(Boolean)
    };

    updateSection('projects', { list: newProjects, enabled: true });
    setEditingIndex(null);
    setFormData({ name: '', description: '', techStack: '', github: '', demo: '' });
  };

  const handleDeleteProject = (index) => {
    if (confirm('Are you sure you want to delete this project?')) {
      const newProjects = projects.filter((_, i) => i !== index);
      updateSection('projects', { list: newProjects, enabled: projectsEnabled });
    }
  };

  const handleCancelEdit = () => {
    setEditingIndex(null);
    setFormData({ name: '', description: '', techStack: '', github: '', demo: '' });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4">📂 Featured Projects</h3>
        
        {/* Project Form */}
        <div className="bg-gray-50 p-4 rounded-lg space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Project Name *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="My Awesome Project"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              rows="3"
              placeholder="A brief description of what this project does..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tech Stack (comma-separated)
            </label>
            <input
              type="text"
              value={formData.techStack}
              onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={formData.github}
                onChange={(e) => setFormData({ ...formData, github: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://github.com/username/project"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Demo URL
              </label>
              <input
                type="url"
                value={formData.demo}
                onChange={(e) => setFormData({ ...formData, demo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="https://project-demo.com"
              />
            </div>
          </div>

          <div className="flex gap-2">
            {editingIndex === null ? (
              <button
                onClick={handleAddProject}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                + Add Project
              </button>
            ) : (
              <>
                <button
                  onClick={handleUpdateProject}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                >
                  ✓ Update Project
                </button>
                <button
                  onClick={handleCancelEdit}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors font-medium"
                >
                  Cancel
                </button>
              </>
            )}
          </div>
        </div>

        {/* Projects List */}
        {projects.length > 0 && (
          <div className="space-y-4">
            <h4 className="font-medium text-lg">Your Projects ({projects.length})</h4>
            {projects.map((project, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-2">
                  <h5 className="font-semibold text-lg text-gray-900">{project.name}</h5>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditProject(index)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors text-sm font-medium"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => handleDeleteProject(index)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm font-medium"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
                <p className="text-gray-600 mb-3">{project.description}</p>
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-3">
                    {(Array.isArray(project.techStack) ? project.techStack : [project.techStack]).map((tech, i) => (
                      <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
                <div className="flex gap-3 text-sm">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🔗 GitHub
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      🚀 Live Demo
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProjectsForm;
