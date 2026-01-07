import { useState } from 'react';
import useTemplateStore from '../../../store/templateStore';

function StyleCustomizationForm() {
  const { theme, customization } = useTemplateStore(state => state.template);
  const updateTheme = useTemplateStore(state => state.updateTheme);
  const updateCustomization = useTemplateStore(state => state.updateCustomization);
  const [activeTab, setActiveTab] = useState('fonts');

  const fontFamilies = [
    { value: 'system-ui', label: 'System UI' },
    { value: 'Segoe UI', label: 'Segoe UI' },
    { value: 'Arial', label: 'Arial' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Georgia', label: 'Georgia' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Courier New', label: 'Courier New' },
    { value: 'monospace', label: 'Monospace' },
    { value: 'Fira Code', label: 'Fira Code' },
    { value: 'Roboto', label: 'Roboto' },
    { value: 'Open Sans', label: 'Open Sans' },
    { value: 'Lato', label: 'Lato' }
  ];

  const fontSizes = [
    { value: 'small', label: 'Small' },
    { value: 'medium', label: 'Medium (Default)' },
    { value: 'large', label: 'Large' },
    { value: 'extra-large', label: 'Extra Large' }
  ];

  const headingStyles = [
    { value: 'default', label: '# Default Heading' },
    { value: 'centered', label: '# Centered Heading' },
    { value: 'underline', label: '# Heading with Underline' },
    { value: 'bold', label: '# **Bold Heading**' }
  ];

  const badgeStyles = [
    { value: 'flat', label: 'Flat' },
    { value: 'flat-square', label: 'Flat Square' },
    { value: 'for-the-badge', label: 'For The Badge (Default)' },
    { value: 'plastic', label: 'Plastic' },
    { value: 'social', label: 'Social' }
  ];

  const alignmentOptions = [
    { value: 'left', label: 'Left' },
    { value: 'center', label: 'Center' },
    { value: 'right', label: 'Right' }
  ];

  const emojiStyles = [
    { value: 'default', label: 'Default (Native)' },
    { value: 'twemoji', label: 'Twitter Emoji' },
    { value: 'none', label: 'No Emojis' }
  ];

  const themeColors = [
    { value: '#3b82f6', label: 'Blue' },
    { value: '#8b5cf6', label: 'Purple' },
    { value: '#ec4899', label: 'Pink' },
    { value: '#ef4444', label: 'Red' },
    { value: '#f59e0b', label: 'Orange' },
    { value: '#10b981', label: 'Green' },
    { value: '#06b6d4', label: 'Cyan' },
    { value: '#6366f1', label: 'Indigo' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
          Style & Customization
        </h3>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => setActiveTab('fonts')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'fonts'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Fonts
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'colors'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Colors
        </button>
        <button
          onClick={() => setActiveTab('layout')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'layout'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Layout
        </button>
        <button
          onClick={() => setActiveTab('badges')}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === 'badges'
              ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600'
              : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
          }`}
        >
          Badges
        </button>
      </div>

      {/* Fonts Tab */}
      {activeTab === 'fonts' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Font Family</label>
            <select
              className="input"
              value={theme.fontFamily || 'system-ui'}
              onChange={(e) => updateTheme({ fontFamily: e.target.value })}
            >
              {fontFamilies.map(font => (
                <option key={font.value} value={font.value} style={{ fontFamily: font.value }}>
                  {font.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              This affects how text appears in the preview
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">Font Size</label>
            <select
              className="input"
              value={theme.fontSize || 'medium'}
              onChange={(e) => updateTheme({ fontSize: e.target.value })}
            >
              {fontSizes.map(size => (
                <option key={size.value} value={size.value}>
                  {size.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Heading Style</label>
            <select
              className="input"
              value={theme.headingStyle || 'default'}
              onChange={(e) => updateTheme({ headingStyle: e.target.value })}
            >
              {headingStyles.map(style => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block mb-2 font-medium">Emoji Style</label>
            <select
              className="input"
              value={customization.emojiStyle || 'default'}
              onChange={(e) => updateCustomization({ emojiStyle: e.target.value })}
            >
              {emojiStyles.map(style => (
                <option key={style.value} value={style.value}>
                  {style.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Accent Color</label>
            <div className="grid grid-cols-4 gap-3 mb-3">
              {themeColors.map(color => (
                <button
                  key={color.value}
                  onClick={() => updateTheme({ accentColor: color.value })}
                  className={`h-12 rounded-lg border-2 transition-all ${
                    theme.accentColor === color.value
                      ? 'border-gray-900 dark:border-white scale-105'
                      : 'border-gray-300 dark:border-gray-600 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color.value }}
                  title={color.label}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="color"
                className="w-16 h-10 rounded cursor-pointer"
                value={theme.accentColor || '#3b82f6'}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
              />
              <input
                type="text"
                className="input flex-1"
                value={theme.accentColor || '#3b82f6'}
                onChange={(e) => updateTheme({ accentColor: e.target.value })}
                placeholder="#3b82f6"
              />
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              This color is used for badges, links, and accents
            </p>
          </div>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Content Alignment</label>
            <div className="grid grid-cols-3 gap-3">
              {alignmentOptions.map(align => (
                <button
                  key={align.value}
                  onClick={() => updateCustomization({ alignment: align.value })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all ${
                    customization.alignment === align.value
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  {align.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={customization.showTableOfContents || false}
                onChange={(e) => updateCustomization({ showTableOfContents: e.target.checked })}
                className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
              />
              <span className="font-medium">Show Table of Contents</span>
            </label>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 ml-6">
              Add a navigation menu at the top of your README
            </p>
          </div>

          <div>
            <label className="block mb-2 font-medium">Header Style</label>
            <select
              className="input"
              value={theme.headerStyle || 'default'}
              onChange={(e) => updateTheme({ headerStyle: e.target.value })}
            >
              <option value="default">Default</option>
              <option value="minimal">Minimal</option>
              <option value="banner">Banner Style</option>
              <option value="centered">Centered</option>
            </select>
          </div>
        </div>
      )}

      {/* Badges Tab */}
      {activeTab === 'badges' && (
        <div className="space-y-4">
          <div>
            <label className="block mb-2 font-medium">Badge Style</label>
            <div className="grid grid-cols-2 gap-3">
              {badgeStyles.map(style => (
                <button
                  key={style.value}
                  onClick={() => updateCustomization({ badgeStyle: style.value })}
                  className={`px-4 py-3 rounded-lg border-2 transition-all text-left ${
                    customization.badgeStyle === style.value
                      ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{style.label}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    shields.io/{style.value}
                  </div>
                </button>
              ))}
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Choose how skill badges and social buttons appear
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <p className="text-sm font-medium mb-2">Preview:</p>
            <img
              src={`https://img.shields.io/badge/JavaScript-${theme.accentColor?.replace('#', '')}.svg?style=${customization.badgeStyle || 'for-the-badge'}&logo=javascript&logoColor=white`}
              alt="Badge Preview"
              className="inline-block"
            />
          </div>
        </div>
      )}

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          Changes will be reflected when you generate the README
        </p>
      </div>
    </div>
  );
}

export default StyleCustomizationForm;
