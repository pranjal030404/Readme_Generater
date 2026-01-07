import { useState } from 'react';
import { FaSave, FaDownload, FaShare, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useTemplateStore from '../store/templateStore';
import useAuthStore from '../store/authStore';
import { generateAPI, templateAPI } from '../services/api';
import FormSections from '../components/Generator/FormSections';
import LivePreview from '../components/Generator/LivePreview';
import AutoFillFromGitHub from '../components/Generator/AutoFillFromGitHub';

function Generator() {
  const [markdown, setMarkdown] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const [showAutoFill, setShowAutoFill] = useState(false);
  const template = useTemplateStore(state => state.template);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const handleGenerate = async () => {
    setIsGenerating(true);
    try {
      const response = await generateAPI.generate(template);
      setMarkdown(response.data.markdown);
      toast.success('README generated successfully!');
    } catch (error) {
      console.error('Generate error:', error);
      toast.error('Failed to generate README');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to save templates');
      return;
    }

    try {
      await templateAPI.create(template);
      toast.success('Template saved successfully!');
    } catch (error) {
      console.error('Save error:', error);
      toast.error('Failed to save template');
    }
  };

  const handleDownload = async () => {
    try {
      const response = await generateAPI.export(template);
      const blob = new Blob([response.data], { type: 'text/markdown' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'README.md';
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success('README downloaded!');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download README');
    }
  };

  const handleCopy = async () => {
    if (!markdown) {
      await handleGenerate();
    }
    try {
      await navigator.clipboard.writeText(markdown);
      toast.success('Markdown copied to clipboard!');
    } catch (error) {
      console.error('Copy error:', error);
      toast.error('Failed to copy to clipboard');
    }
  };

  const handleShare = async () => {
    try {
      const response = await generateAPI.createPreview(template);
      const shareUrl = response.data.url;
      await navigator.clipboard.writeText(shareUrl);
      toast.success('Share link copied to clipboard!');
    } catch (error) {
      console.error('Share error:', error);
      toast.error('Failed to create share link');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">README Generator</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Create your perfect GitHub profile README with our intuitive builder
          </p>
          <div className="mt-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <p className="text-blue-900 dark:text-blue-300 flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <span>💡 <strong>Quick Start:</strong> Click "Auto-Fill from GitHub" to automatically populate all fields from your GitHub profile!</span>
            </p>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setShowAutoFill(true)}
              className="btn bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
              </svg>
              <span>Auto-Fill from GitHub</span>
            </button>
            <button
              onClick={handleGenerate}
              disabled={isGenerating}
              className="btn btn-primary flex items-center space-x-2"
            >
              <span>{isGenerating ? 'Generating...' : 'Generate'}</span>
            </button>
            <button
              onClick={handleSave}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <FaSave />
              <span>Save Template</span>
            </button>
            <button
              onClick={handleDownload}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <FaDownload />
              <span>Download</span>
            </button>
            <button
              onClick={handleCopy}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <FaCopy />
              <span>Copy Markdown</span>
            </button>
            <button
              onClick={handleShare}
              className="btn btn-secondary flex items-center space-x-2"
            >
              <FaShare />
              <span>Share</span>
            </button>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="btn btn-outline ml-auto"
            >
              {showPreview ? 'Hide' : 'Show'} Preview
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-6">
            <FormSections onGenerate={handleGenerate} />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-24 h-fit">
              <LivePreview markdown={markdown} onGenerate={handleGenerate} />
            </div>
          )}
        </div>

        {/* Auto-Fill Modal */}
        {showAutoFill && (
          <AutoFillFromGitHub onClose={() => setShowAutoFill(false)} />
        )}
      </div>
    </div>
  );
}

export default Generator;
