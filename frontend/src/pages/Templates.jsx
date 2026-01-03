import { useState, useEffect } from 'react';
import { FaPlus, FaTrash, FaEdit, FaEye } from 'react-icons/fa';
import { templateAPI } from '../services/api';
import useAuthStore from '../store/authStore';
import useTemplateStore from '../store/templateStore';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

function Templates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  const loadTemplate = useTemplateStore(state => state.loadTemplate);
  const resetTemplate = useTemplateStore(state => state.resetTemplate);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      fetchTemplates();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchTemplates = async () => {
    try {
      const response = await templateAPI.getAll();
      setTemplates(response.data.data);
    } catch (error) {
      console.error('Fetch templates error:', error);
      toast.error('Failed to load templates');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (template) => {
    loadTemplate(template);
    navigate('/generator');
    toast.success('Template loaded!');
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this template?')) return;

    try {
      await templateAPI.delete(id);
      setTemplates(templates.filter(t => t._id !== id));
      toast.success('Template deleted successfully');
    } catch (error) {
      console.error('Delete error:', error);
      toast.error('Failed to delete template');
    }
  };

  const handleCreateNew = () => {
    resetTemplate();
    navigate('/generator');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-dark-900">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-bold mb-4">Login Required</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Please login with GitHub to save and manage your templates
          </p>
          <button
            onClick={handleCreateNew}
            className="btn btn-primary"
          >
            Try Generator Without Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">My Templates</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your saved README templates
            </p>
          </div>
          <button
            onClick={handleCreateNew}
            className="btn btn-primary flex items-center space-x-2"
          >
            <FaPlus />
            <span>Create New</span>
          </button>
        </div>

        {templates.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
              No templates yet. Create your first README!
            </p>
            <button
              onClick={handleCreateNew}
              className="btn btn-primary"
            >
              Get Started
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map(template => (
              <div key={template._id} className="card hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{template.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Updated {formatDistanceToNow(new Date(template.updatedAt))} ago
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    template.visibility === 'public' 
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                  }`}>
                    {template.visibility}
                  </span>
                </div>

                {template.description && (
                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {template.description}
                  </p>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-dark-700">
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {template.views} views
                  </div>
                  <div className="flex space-x-2">
                    {template.shareId && (
                      <button
                        onClick={() => navigate(`/preview/${template.shareId}`)}
                        className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded transition-colors"
                        title="Preview"
                      >
                        <FaEye />
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(template)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-dark-700 rounded transition-colors"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(template._id)}
                      className="p-2 hover:bg-red-100 dark:hover:bg-red-900 text-red-600 rounded transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Templates;
