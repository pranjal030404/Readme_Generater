import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { generateAPI } from '../services/api';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import toast from 'react-hot-toast';

function Preview() {
  const { shareId } = useParams();
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPreview();
  }, [shareId]);

  const fetchPreview = async () => {
    try {
      const response = await generateAPI.getPreview(shareId);
      setContent(response.data.data.content);
    } catch (error) {
      console.error('Fetch preview error:', error);
      toast.error('Failed to load preview');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="bg-white dark:bg-dark-800 rounded-lg shadow-lg p-8">
          <div className="markdown-preview prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Preview;
