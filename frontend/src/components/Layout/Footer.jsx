import { FaGithub, FaHeart, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
  return (
    <footer className="bg-white dark:bg-dark-800 border-t border-gray-200 dark:border-dark-700 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-xl font-bold mb-3">GitHub README Generator</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Create stunning GitHub profile READMEs with dynamic widgets, 
              live activity feeds, and automated updates.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaGithub className="text-2xl" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaTwitter className="text-2xl" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-600 dark:text-gray-400 hover:text-primary-600 transition-colors"
              >
                <FaLinkedin className="text-2xl" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Documentation</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">API Reference</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Examples</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">GitHub Actions</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Community</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400">
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">GitHub Discussions</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Report Issues</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Contributing</a>
              </li>
              <li>
                <a href="#" className="hover:text-primary-600 transition-colors">Changelog</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-dark-700 mt-8 pt-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center space-x-1">
            <span>Made with</span>
            <FaHeart className="text-red-500" />
            <span>by developers, for developers</span>
          </p>
          <p className="text-gray-500 dark:text-gray-500 text-sm mt-2">
            © {new Date().getFullYear()} GitHub README Generator. Open Source MIT License.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
