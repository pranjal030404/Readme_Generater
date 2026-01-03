import { Link } from 'react-router-dom';
import { FaGithub, FaMoon, FaSun, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import useAuthStore from '../../store/authStore';

function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('darkMode', !darkMode);
  };

  const handleGitHubLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`;
  };

  return (
    <header className="bg-white dark:bg-dark-800 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <FaGithub className="text-3xl text-primary-600" />
            <span className="text-xl font-bold">README Generator</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/generator" className="hover:text-primary-600 transition-colors">
              Generator
            </Link>
            <Link to="/templates" className="hover:text-primary-600 transition-colors">
              Templates
            </Link>
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-primary-600 transition-colors"
            >
              Docs
            </a>
          </div>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <FaSun className="text-xl" /> : <FaMoon className="text-xl" />}
            </button>

            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  {user?.avatar ? (
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className="w-8 h-8 rounded-full"
                    />
                  ) : (
                    <FaUser className="text-xl" />
                  )}
                  <span className="hidden md:inline text-sm">{user?.name}</span>
                </div>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-dark-700 transition-colors"
                  aria-label="Logout"
                >
                  <FaSignOutAlt />
                </button>
              </div>
            ) : (
              <button
                onClick={handleGitHubLogin}
                className="btn btn-primary flex items-center space-x-2"
              >
                <FaGithub />
                <span>Login with GitHub</span>
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
