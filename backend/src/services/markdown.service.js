class MarkdownGenerator {
  constructor(template) {
    this.template = template || {};
    this.sections = template.sections || {};
    this.theme = template.theme || { accentColor: '#3b82f6' };
    this.customization = template.customization || {};
  }

  // Generate complete markdown
  generate() {
    let markdown = '';
    const sectionOrder = this.customization.sectionOrder || this.getDefaultSectionOrder();

    // Generate header/title
    markdown += this.generateHeader();
    markdown += '\n\n';

    // Table of contents
    if (this.customization.showTableOfContents) {
      markdown += this.generateTableOfContents(sectionOrder);
      markdown += '\n\n';
    }

    // Generate sections in order
    sectionOrder.forEach(sectionName => {
      const sectionMarkdown = this.generateSection(sectionName);
      if (sectionMarkdown) {
        markdown += sectionMarkdown + '\n\n';
      }
    });

    return markdown.trim();
  }

  // Generate header
  generateHeader() {
    const { basicInfo } = this.sections;
    if (!basicInfo || !basicInfo.enabled) return '';

    let header = '';

    // Typing SVG animation
    if (this.sections.widgets?.typingSvg?.enabled) {
      const text = this.sections.widgets.typingSvg.text || basicInfo.tagline || 'Welcome to my GitHub Profile';
      header += `![Typing SVG](https://readme-typing-svg.herokuapp.com?font=Fira+Code&pause=1000&color=${this.theme.accentColor.replace('#', '')}&center=true&vCenter=true&width=435&lines=${encodeURIComponent(text)})\n\n`;
    }

    // Name and tagline
    if (basicInfo.name) {
      header += `# Hi there 👋, I'm ${basicInfo.name}\n`;
    }

    if (basicInfo.tagline) {
      header += `## ${basicInfo.tagline}\n`;
    }

    // Location and pronouns
    const metadata = [];
    if (basicInfo.location) metadata.push(`📍 ${basicInfo.location}`);
    if (basicInfo.pronouns) metadata.push(`(${basicInfo.pronouns})`);
    if (metadata.length > 0) {
      header += `\n${metadata.join(' | ')}\n`;
    }

    // Current focus
    if (basicInfo.currentFocus) {
      header += `\n🔭 Currently working on: **${basicInfo.currentFocus}**\n`;
    }

    // Visitor counter
    if (this.sections.widgets?.visitorCounter?.enabled) {
      const username = this.sections.socialLinks?.github 
        ? this.sections.socialLinks.github.split('/').pop() 
        : basicInfo.name?.replace(/\s/g, '') || null;
      
      // Only add visitor counter if we have a valid username
      if (username && username !== '' && username !== 'username') {
        header += `\n![Visitor Count](https://profile-counter.glitch.me/${username}/count.svg)\n`;
      }
    }

    return header;
  }

  // Generate About Me section
  generateAboutMe() {
    const { aboutMe } = this.sections;
    if (!aboutMe || !aboutMe.enabled) return '';

    let section = '## 🚀 About Me\n\n';

    if (aboutMe.bio) {
      section += `${aboutMe.bio}\n\n`;
    }

    if (aboutMe.currentlyLearning?.length > 0) {
      section += `🌱 I'm currently learning: ${aboutMe.currentlyLearning.map(item => `**${item}**`).join(', ')}\n\n`;
    }

    if (aboutMe.collaborationInterests) {
      section += `👯 I'm looking to collaborate on: ${aboutMe.collaborationInterests}\n\n`;
    }

    if (aboutMe.funFacts?.length > 0) {
      section += `⚡ Fun facts:\n`;
      aboutMe.funFacts.forEach(fact => {
        section += `- ${fact}\n`;
      });
    }

    return section;
  }

  // Generate Skills section
  generateSkills() {
    const { skills } = this.sections;
    if (!skills || !skills.enabled) return '';

    let section = '## 🛠️ Skills & Technologies\n\n';

    const badgeStyle = this.customization.badgeStyle || 'for-the-badge';
    const accentColor = (this.theme.accentColor || '#3b82f6').replace('#', '');

    const categories = [
      { name: 'Languages', items: skills.languages },
      { name: 'Frameworks & Libraries', items: skills.frameworks },
      { name: 'Databases', items: skills.databases },
      { name: 'Tools & Platforms', items: skills.tools },
      { name: 'Cloud Services', items: skills.cloud },
      { name: 'DevOps', items: skills.devops }
    ];

    categories.forEach(category => {
      if (category.items?.length > 0) {
        section += `### ${category.name}\n\n`;
        section += category.items.map(skill => 
          `![${skill}](https://img.shields.io/badge/${skill.replace(/ /g, '%20')}-${accentColor}.svg?style=${badgeStyle})`
        ).join(' ') + '\n\n';
      }
    });

    return section;
  }

  // Generate Projects section
  generateProjects() {
    const { projects } = this.sections;
    
    // Ensure projects is an array
    if (!projects) return '';
    const projectsArray = Array.isArray(projects) ? projects : [];
    if (projectsArray.length === 0) return '';

    let section = '## 📂 Featured Projects\n\n';

    projectsArray.forEach(project => {
      section += `### ${project.name}\n\n`;
      
      if (project.description) {
        section += `${project.description}\n\n`;
      }

      // Handle both techStack and technologies properties
      const techList = project.techStack || project.technologies || [];
      if (techList?.length > 0) {
        section += `**Tech Stack:** ${techList.map(tech => `\`${tech}\``).join(', ')}\n\n`;
      }

      const links = [];
      if (project.liveUrl || project.demo) links.push(`[Live Demo](${project.liveUrl || project.demo})`);
      if (project.repoUrl || project.github) links.push(`[Repository](${project.repoUrl || project.github})`);
      
      if (links.length > 0) {
        section += links.join(' | ') + '\n\n';
      }

      if (project.imageUrl) {
        section += `![${project.name}](${project.imageUrl})\n\n`;
      }

      section += '---\n\n';
    });

    return section;
  }

  // Generate GitHub Stats section
  generateGitHubStats() {
    const { widgets, socialLinks } = this.sections;
    if (!widgets) return '';

    let section = '## 📊 GitHub Statistics\n\n';
    let hasStats = false;

    // Extract username from GitHub URL or use default
    let username = null;
    if (socialLinks?.github) {
      const githubUrl = socialLinks.github;
      const match = githubUrl.match(/github\.com\/([^\/]+)/);
      username = match ? match[1] : githubUrl.split('/').pop();
    }

    // If no valid username, don't generate stats widgets
    if (!username || username === 'username' || username === '') {
      return '';
    }

    const theme = widgets.githubStats?.theme || 'dark';

    // GitHub Stats Card
    if (widgets.githubStats?.enabled) {
      section += `<div align="center">\n\n`;
      section += `### 📈 GitHub Stats\n\n`;
      section += `![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${theme}&hide_border=true&count_private=true)\n\n`;
      section += `*Stats may take a moment to load. If unavailable, the service is temporarily down.*\n\n`;
      section += `</div>\n\n`;
      hasStats = true;
    }

    // GitHub Streak
    if (widgets.githubStreak?.enabled) {
      section += `<div align="center">\n\n`;
      section += `### 🔥 Contribution Streak\n\n`;
      section += `![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${username}&theme=${theme}&hide_border=true)\n\n`;
      section += `*Streak stats may take a moment to load. If unavailable, the service is temporarily down.*\n\n`;
      section += `</div>\n\n`;
      hasStats = true;
    }

    // Top Languages
    if (widgets.topLanguages?.enabled) {
      const layout = widgets.topLanguages.layout || 'compact';
      section += `<div align="center">\n\n`;
      section += `### 💻 Most Used Languages\n\n`;
      section += `![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=${layout}&theme=${theme}&hide_border=true)\n\n`;
      section += `*Language stats calculated by GitHub and may take time to update.*\n\n`;
      section += `</div>\n\n`;
      hasStats = true;
    }

    // Activity Graph
    if (widgets.activityGraph?.enabled) {
      const graphTheme = widgets.activityGraph.theme || 'github';
      section += `![Activity Graph](https://github-readme-activity-graph.vercel.app/graph?username=${username}&theme=${graphTheme})\n\n`;
      hasStats = true;
    }

    // Trophies
    if (widgets.trophies?.enabled) {
      const trophyTheme = widgets.trophies.theme || 'darkhub';
      section += `![Trophies](https://github-profile-trophy.vercel.app/?username=${username}&theme=${trophyTheme}&no-frame=true&no-bg=true&margin-w=4)\n\n`;
      hasStats = true;
    }

    return hasStats ? section : '';
  }

  // Generate WakaTime Stats section
  generateWakaTimeStats() {
    const { widgets } = this.sections;
    if (!widgets?.wakatime?.enabled || !widgets.wakatime.username) return '';

    let section = '## ⏱️ Weekly Development Breakdown\n\n';
    section += `<!-- WAKATIME:START -->\n`;
    section += `<!-- This section will be auto-updated by GitHub Actions -->\n`;
    section += `<!-- WAKATIME:END -->\n\n`;

    section += `![WakaTime Stats](https://github-readme-stats.vercel.app/api/wakatime?username=${widgets.wakatime.username}&layout=compact)\n\n`;

    return section;
  }

  // Generate Blog Posts section
  generateBlogPosts() {
    const { widgets } = this.sections;
    if (!widgets?.blogPosts?.enabled) return '';

    let section = '## 📝 Latest Blog Posts\n\n';
    section += `<!-- BLOG-POST-LIST:START -->\n`;
    section += `<!-- This section will be auto-updated by GitHub Actions -->\n`;
    section += `<!-- BLOG-POST-LIST:END -->\n\n`;

    return section;
  }

  // Generate Social Links section
  generateSocialLinks() {
    const { socialLinks } = this.sections;
    if (!socialLinks || !socialLinks.enabled) return '';

    let section = '## 🤝 Connect with Me\n\n';

    const badgeStyle = this.customization.badgeStyle || 'for-the-badge';
    const accentColor = (this.theme.accentColor || '#3b82f6').replace('#', '');

    const links = [
      { platform: 'GitHub', url: socialLinks.github, icon: 'github' },
      { platform: 'LinkedIn', url: socialLinks.linkedin, icon: 'linkedin' },
      { platform: 'Twitter', url: socialLinks.twitter, icon: 'twitter' },
      { platform: 'Portfolio', url: socialLinks.portfolio, icon: 'web' },
      { platform: 'Dev.to', url: socialLinks.devto, icon: 'devto' },
      { platform: 'Medium', url: socialLinks.medium, icon: 'medium' },
      { platform: 'Hashnode', url: socialLinks.hashnode, icon: 'hashnode' },
      { platform: 'Stack Overflow', url: socialLinks.stackoverflow, icon: 'stackoverflow' },
      { platform: 'YouTube', url: socialLinks.youtube, icon: 'youtube' }
    ];

    const validLinks = links.filter(link => link.url);

    if (validLinks.length === 0) return '';

    validLinks.forEach(link => {
      section += `[![${link.platform}](https://img.shields.io/badge/${link.platform}-${accentColor}.svg?style=${badgeStyle}&logo=${link.icon}&logoColor=white)](${link.url})\n`;
    });

    if (socialLinks.email) {
      section += `\n📧 Email: ${socialLinks.email}\n`;
    }

    return section + '\n';
  }

  // Generate section by name
  generateSection(sectionName) {
    switch (sectionName) {
      case 'aboutMe':
        return this.generateAboutMe();
      case 'skills':
        return this.generateSkills();
      case 'projects':
        return this.generateProjects();
      case 'githubStats':
        return this.generateGitHubStats();
      case 'wakatime':
        return this.generateWakaTimeStats();
      case 'blogPosts':
        return this.generateBlogPosts();
      case 'socialLinks':
        return this.generateSocialLinks();
      default:
        return '';
    }
  }

  // Get default section order
  getDefaultSectionOrder() {
    return ['aboutMe', 'skills', 'githubStats', 'wakatime', 'blogPosts', 'projects', 'socialLinks'];
  }

  // Generate table of contents
  generateTableOfContents(sectionOrder) {
    let toc = '## 📚 Table of Contents\n\n';
    
    const sectionTitles = {
      aboutMe: 'About Me',
      skills: 'Skills & Technologies',
      projects: 'Featured Projects',
      githubStats: 'GitHub Statistics',
      wakatime: 'Weekly Development Breakdown',
      blogPosts: 'Latest Blog Posts',
      socialLinks: 'Connect with Me'
    };

    sectionOrder.forEach(section => {
      if (sectionTitles[section]) {
        const anchor = sectionTitles[section].toLowerCase().replace(/\s/g, '-').replace(/&/g, '');
        toc += `- [${sectionTitles[section]}](#${anchor})\n`;
      }
    });

    return toc;
  }
}

module.exports = MarkdownGenerator;
