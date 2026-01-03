import { useState } from 'react';
import { FaSave, FaDownload, FaShare, FaCopy } from 'react-icons/fa';
import toast from 'react-hot-toast';
import useTemplateStore from '../store/templateStore';
import useAuthStore from '../store/authStore';
import { generateAPI, templateAPI } from '../services/api';
import FormSections from '../components/Generator/FormSections';
import LivePreview from '../components/Generator/LivePreview';

function Generator() {
  const [markdown, setMarkdown] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
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
        </div>

        {/* Action Bar */}
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-wrap gap-3">
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
      </div>
    </div>
  );
}

export default Generator;
