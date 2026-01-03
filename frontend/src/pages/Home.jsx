import { Link } from 'react-router-dom';
import { FaRocket, FaStar, FaCode, FaGithub, FaArrowRight, FaCheck } from 'react-icons/fa';
import { motion } from 'framer-motion';

function Home() {
  const features = [
    {
      icon: <FaCode className="text-4xl text-primary-600" />,
      title: 'Drag & Drop Builder',
      description: 'Intuitive interface with real-time preview. Reorder sections with ease.'
    },
    {
      icon: <FaStar className="text-4xl text-primary-600" />,
      title: '40+ Themes',
      description: 'Beautiful themes for GitHub stats cards and widgets.'
    },
    {
      icon: <FaRocket className="text-4xl text-primary-600" />,
      title: 'Auto-Updates',
      description: 'GitHub Actions workflows for dynamic content updates every 6 hours.'
    },
    {
      icon: <FaGithub className="text-4xl text-primary-600" />,
      title: 'GitHub Integration',
      description: 'Fetch your repos, stats, and activity automatically.'
    }
  ];

  const widgets = [
    'GitHub Stats Cards',
    'Contribution Streak',
    'Top Languages',
    'Activity Graph',
    'WakaTime Coding Stats',
    'Blog Post Feed',
    'Spotify Now Playing',
    'Visitor Counter',
    'Trophy Collection',
    'Custom Badges'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Create Stunning GitHub Profile READMEs
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-primary-100">
              Build beautiful, dynamic profile pages with live widgets, activity feeds, 
              and automated updates in minutes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/generator" 
                className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold flex items-center justify-center space-x-2"
              >
                <span>Start Creating</span>
                <FaArrowRight />
              </Link>
              <Link 
                to="/templates" 
                className="btn border-2 border-white text-white hover:bg-white hover:text-primary-600 px-8 py-4 text-lg font-semibold"
              >
                View Templates
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Powerful Features</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Everything you need to create an impressive GitHub profile
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="card text-center hover:shadow-xl transition-shadow"
              >
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Widgets Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Dynamic Widgets & Integrations</h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Add live, auto-updating content to your profile
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {widgets.map((widget, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3 bg-white dark:bg-dark-800 p-4 rounded-lg shadow-md"
                >
                  <FaCheck className="text-green-500 text-xl flex-shrink-0" />
                  <span className="text-lg">{widget}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-6">Ready to Stand Out?</h2>
            <p className="text-xl mb-8 text-primary-100 max-w-2xl mx-auto">
              Join thousands of developers creating amazing GitHub profiles. 
              Start building your README in minutes.
            </p>
            <Link 
              to="/generator" 
              className="btn bg-white text-primary-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold inline-flex items-center space-x-2"
            >
              <span>Get Started Free</span>
              <FaArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-dark-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600 dark:text-gray-400">READMEs Created</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">40+</div>
              <div className="text-gray-600 dark:text-gray-400">Themes Available</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-primary-600 mb-2">100%</div>
              <div className="text-gray-600 dark:text-gray-400">Free & Open Source</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
