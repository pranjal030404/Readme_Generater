import { useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function LivePreview({ markdown, onGenerate }) {
  useEffect(() => {
    if (!markdown) {
      onGenerate();
    }
  }, []);

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Live Preview</h2>
        <button
          onClick={onGenerate}
          className="btn btn-secondary text-sm"
        >
          Refresh
        </button>
      </div>

      <div className="border border-gray-200 dark:border-dark-700 rounded-lg p-6 bg-white dark:bg-dark-900 max-h-[800px] overflow-y-auto">
        {markdown ? (
          <div className="markdown-preview prose dark:prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {markdown}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 py-8">
            <p>Fill in the form and click "Generate" to see your README preview</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default LivePreview;
