/**
 * Micro-optimized debounce
 */
const debounce = (fn, ms) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), ms);
  };
};

/**
 * Profile Manager using jQuery
 */
const ProfileManager = {
  init() {
    console.log("Checking profile data...");
    // Check if profile data exists in the global scope
    if (typeof profile === 'undefined' || !profile) {
      console.error("Profile data is missing. Make sure array.js is loaded.");
      // Create a placeholder profile for development
      window.profile = {
        name: "Name not loaded",
        role: "Role not loaded",
        image: "profile.jpg",
        description: "Description not loaded. Please check if array.js is properly loaded.",
        skills: [],
        social: {}
      };
      console.warn("Using placeholder profile data");
    } else {
      console.log("Profile data loaded successfully:", profile.name);
    }
    
    // Load and render profile data
    this.renderProfile();
    this.setupToggle();
  },
  
  renderProfile() {
    // Set basic profile info with jQuery
    $('#profileName').text(profile.name || 'Loading...');
    $('#profileRole').text(profile.role || 'Loading...');
    $('#profileDesc').text(profile.description || '');
    
    // Set profile image - using jQuery
    const imgPath = profile.image ? `src/img/profile/${profile.image}` : 'src/img/profile/default.jpg';
    $('#profileImage').attr('src', imgPath);
    
    // Render social links with midnight blue theme
    const socialContainer = $('#socialLinks');
    socialContainer.empty();
    
    if (profile.social) {
      if (profile.social.github) {
        $('<a>')
          .attr({
            href: profile.social.github,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'GitHub Profile'
          })
          .addClass('w-12 h-12 rounded-lg bg-midnight-800/50 hover:bg-midnight-700/50 flex items-center justify-center transition-all duration-300 border border-midnight-700/50 hover:border-midnight-600 hover:scale-110 shadow-lg')
          .html('<i class="fab fa-github text-xl text-white" aria-hidden="true"></i>')
          .appendTo(socialContainer);
      }
      
      if (profile.social.linkedin) {
        $('<a>')
          .attr({
            href: profile.social.linkedin,
            target: '_blank',
            rel: 'noopener noreferrer',
            'aria-label': 'LinkedIn Profile'
          })
          .addClass('w-12 h-12 rounded-lg bg-midnight-800/50 hover:bg-midnight-700/50 flex items-center justify-center transition-all duration-300 border border-midnight-700/50 hover:border-midnight-600 hover:scale-110 shadow-lg')
          .html('<i class="fab fa-linkedin text-xl text-white" aria-hidden="true"></i>')
          .appendTo(socialContainer);
      }
    }
    
    // Render skills with midnight blue theme
    const skillsContainer = $('#skillsList');
    skillsContainer.empty();
    
    if (profile.skills && profile.skills.length > 0) {
      $.each(profile.skills, (_, skill) => {
        const levelColors = {
          'Advanced': 'bg-midnight-500/90 border-midnight-400/50',
          'Intermediate': 'bg-midnight-600/90 border-midnight-500/50',
          'Beginner': 'bg-midnight-700/90 border-midnight-600/50'
        };
        
        $('<span>')
          .addClass(`px-3 py-1.5 ${levelColors[skill.level] || 'bg-midnight-600/90 border-midnight-500/50'} text-white rounded-lg text-sm font-medium backdrop-blur-sm shadow-lg border`)
          .text(skill.name)
          .appendTo(skillsContainer);
      });
    }
    
    // Mark profile as loaded
    $('body').attr('data-profile-loaded', 'true');
  },
  
  renderSocial() {
    if (!profile.social) return;
    
    const socialContainer = $('#socialLinks');
    if (!socialContainer.length) return;
    
    // Clear container and add social links
    socialContainer.empty();
    
    const icons = { github: 'github', linkedin: 'linkedin-in' };
    const socialNames = { 
      github: 'GitHub Profile', 
      linkedin: 'LinkedIn Profile',
      twitter: 'Twitter Profile',
      facebook: 'Facebook Page',
      instagram: 'Instagram Profile',
      youtube: 'YouTube Channel',
      twitch: 'Twitch Channel',
      discord: 'Discord Server',
      reddit: 'Reddit Profile',
      medium: 'Medium Blog'
    };
    
    $.each(profile.social, (platform, url) => {
      $('<a>')
        .attr({
          href: url,
          target: "_blank",
          rel: "noopener",
          'aria-label': socialNames[platform] || `${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile`
        })
        .addClass("text-midnight-300 hover:text-midnight-100 text-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1")
        .html(`<i class="fab fa-${icons[platform] || platform}" aria-hidden="true"></i><span class="sr-only">${socialNames[platform] || `${platform.charAt(0).toUpperCase() + platform.slice(1)} Profile`}</span>`)
        .appendTo(socialContainer);
    });
  },
  
  renderSkills() {
    if (!profile.skills) return;
    
    const container = $('#skillsList');
    if (!container.length) return;
    
    container.empty();
    
    // Pre-define color maps for better performance
    const colors = {
      frontend: 'bg-midnight-600/90 text-white border-midnight-500/50',
      backend: 'bg-midnight-600/90 text-white border-midnight-500/50',
      mobile: 'bg-midnight-600/90 text-white border-midnight-500/50',
      design: 'bg-midnight-600/90 text-white border-midnight-500/50',
      tools: 'bg-midnight-600/90 text-white border-midnight-500/50'
    };
    
    const icons = {
      frontend: '<i class="fas fa-code fa-sm mr-1"></i>',
      backend: '<i class="fas fa-server fa-sm mr-1"></i>',
      mobile: '<i class="fas fa-mobile-alt fa-sm mr-1"></i>',
      design: '<i class="fas fa-palette fa-sm mr-1"></i>',
      tools: '<i class="fas fa-tools fa-sm mr-1"></i>'
    };
    
    const levels = { 'Beginner': '•', 'Intermediate': '••', 'Advanced': '•••', 'Expert': '••••' };
    
    // Add skills to container
    $.each(profile.skills, (_, skill) => {
      $('<span>')
        .addClass(`px-3 py-1 ${colors[skill.category] || 'bg-midnight-600/90 text-white border-midnight-500/50'} rounded-full text-sm border border-opacity-40 hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-1 shadow-sm`)
        .html(`
          ${icons[skill.category] || ''}
          ${skill.name}
          ${skill.level ? `<span class="ml-1 text-xs opacity-80">${levels[skill.level] || ''}</span>` : ''}
        `)
        .appendTo(container);
    });
  },
  
  setupToggle() {
    const toggle = $('#profileToggle');
    const expanded = $('#profileExpanded');
    
    if (!toggle.length || !expanded.length) return;
    
    const toggleIcon = $('#toggleIcon');
    const toggleText = $('#toggleText');
    
    // Get saved state
    const isExpanded = localStorage.getItem('profileExpanded') === 'true';
    
    // Set initial state without transitions
    expanded.css('transition', 'none');
    expanded.css('height', isExpanded ? expanded.prop('scrollHeight') + 'px' : '0');
    toggleIcon.css('transform', isExpanded ? 'rotate(180deg)' : '');
    toggleText.text(isExpanded ? 'See Less' : 'See More');
    toggle.attr('aria-expanded', isExpanded);
    
    // Re-enable transitions after initial state is set
    requestAnimationFrame(() => {
      expanded.css('transition', '');
    });
    
    // Toggle handler
    toggle.on('click', () => {
      const willExpand = expanded.height() === 0;
      expanded.css('height', willExpand ? expanded.prop('scrollHeight') + 'px' : '0');
      toggleIcon.css('transform', willExpand ? 'rotate(180deg)' : '');
      toggleText.text(willExpand ? 'See Less' : 'See More');
      localStorage.setItem('profileExpanded', willExpand);
      toggle.attr('aria-expanded', willExpand);
    });
  }
};

/**
 * Project Manager using jQuery
 */
const ProjectManager = {
  ITEMS_PER_PAGE: 6,
  currentPage: 1,
  observer: null,
  projectCache: {},
  
  init() {
    console.log("Checking projects data...");
    // Check if projects data exists in the global scope
    if (typeof projects === 'undefined' || !projects) {
      console.error("Projects data is missing. Make sure array.js is loaded.");
      // Create placeholder projects for development
      window.projects = [];
      window.projectYears = [];
      window.projectTypes = [];
      console.warn("Using empty projects array");
    } else {
      console.log("Projects data loaded successfully:", projects.length, "projects found");
    }

    if (!$('#projectContainer').length) {
      console.error("Project container element not found");
      return;
    }
    
    // Setup IntersectionObserver for lazy loading
    this.setupLazyLoading();
    
    // Prepare filter options
    this.setupFilters();
    
    // Initial display
    this.displayProjects('all', 'all', 1);
  },
  
  setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      this.observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const card = entry.target;
            
            // Load image if needed
            const img = $(card).find('img[data-src]');
            if (img.length) {
              img.attr('src', img.data('src')).removeAttr('data-src');
            }
            
            this.observer.unobserve(card);
          }
        });
      }, {
        rootMargin: '200px',
        threshold: 0.1
      });
    }
  },
  
  setupFilters() {
    console.log("Setting up filters with available data:");
    console.log("- Year data:", window.projectYears);
    console.log("- Type data:", window.projectTypes);
    
    // Setup year filter
    const yearSelect = $('#yearFilter');
    if (yearSelect.length) {
      // Clear existing options except "All Years"
      yearSelect.find('option:not([value="all"])').remove();
      
      // Ensure the select has proper accessibility attributes
      if (!yearSelect.attr('aria-label')) {
        yearSelect.attr('aria-label', 'Filter projects by year');
      }
      
      // Add year options
      if (window.projectYears && window.projectYears.length) {
        $.each(window.projectYears, (_, year) => {
          yearSelect.append(
            $('<option>').val(year).text(year).addClass('bg-midnight-900 text-white')
          );
        });
        console.log("Added year options:", window.projectYears.length);
      } else {
        console.warn("No year data available for filters");
        // Add some default years as fallback
        ['2024', '2023', '2022'].forEach(year => {
          yearSelect.append($('<option>').val(year).text(year).addClass('bg-midnight-900 text-white'));
        });
      }
        // Add event listener
      yearSelect.on('change', () => {
        this.currentPage = 1;
        this.displayProjects(yearSelect.val(), $('#typeFilter').val(), 1);
        
        // Clear pagination cache when filter changes
        this.projectCache = {};
      });
    }
    
    // Setup type filter
    const typeSelect = $('#typeFilter');
    if (typeSelect.length) {
      // Clear existing options except "All Types"
      typeSelect.find('option:not([value="all"])').remove();
      
      // Ensure the select has proper accessibility attributes
      if (!typeSelect.attr('aria-label')) {
        typeSelect.attr('aria-label', 'Filter projects by type');
      }
      
      // Add type options
      if (window.projectTypes && window.projectTypes.length) {
        $.each(window.projectTypes, (_, type) => {
          typeSelect.append(
            $('<option>').val(type).text(type.charAt(0).toUpperCase() + type.slice(1)).addClass('bg-midnight-900 text-white')
          );
        });
        console.log("Added type options:", window.projectTypes.length);
      } else {
        console.warn("No type data available for filters");
        // Add some default types as fallback
        ['web', 'mobile', 'terminal'].forEach(type => {
          typeSelect.append($('<option>').val(type).text(type.charAt(0).toUpperCase() + type.slice(1)).addClass('bg-midnight-900 text-white'));
        });
      }
      
    // Add event listener
      typeSelect.on('change', () => {
        this.currentPage = 1;
        this.displayProjects($('#yearFilter').val(), typeSelect.val(), 1);
        
        // Clear pagination cache when filter changes
        this.projectCache = {};
      });
    }
  },
  
  getFilteredProjects(year, type) {
    // Simple cache key
    const cacheKey = `${year}-${type}`;
    
    if (this.projectCache[cacheKey]) {
      return this.projectCache[cacheKey];
    }
    
    // Filter projects based on criteria
    let filtered = [...projects];
    
    if (year !== 'all') {
      filtered = filtered.filter(project => project.year === year);
    }
    
    if (type !== 'all') {
      filtered = filtered.filter(project => {
        const projectTypes = Array.isArray(project.type) ? project.type : [project.type];
        return projectTypes.includes(type);
      });
    }
    
    // Sort by year first (newest first), then by reverse order in the original array
    // This means the last project in the array (most recently added) will appear first
    filtered.sort((a, b) => {
      // First compare years (newest first)
      const yearDiff = parseInt(b.year) - parseInt(a.year);
      
      if (yearDiff === 0) {
        // If projects have the same year, reverse the order from the array
        // Find the original indices of the projects
        const indexA = projects.findIndex(p => 
          p.title === a.title && p.year === a.year && p.image === a.image);
        const indexB = projects.findIndex(p => 
          p.title === b.title && p.year === b.year && p.image === b.image);
        
        // Return in reverse order (higher index = newer = should come first)
        return indexB - indexA;
      }
      
      return yearDiff;
    });
    
    // Cache the result
    this.projectCache[cacheKey] = filtered;
    return filtered;
  },
    displayProjects(year = 'all', type = 'all', page = 1) {
    const container = $('#projectContainer');
    if (!container.length) {
      console.error("Project container not found");
      return;
    }
    
    // Clear container
    container.empty();
    
    // Remove existing pagination
    $('#paginationContainer').remove();
    
    // Get filtered projects
    const filteredProjects = this.getFilteredProjects(year, type);
    console.log(`Filtered projects (${year}, ${type}):`, filteredProjects.length);
    
    // Calculate pagination
    const totalPages = Math.ceil(filteredProjects.length / this.ITEMS_PER_PAGE);
    const startIndex = (page - 1) * this.ITEMS_PER_PAGE;
    const endIndex = Math.min(startIndex + this.ITEMS_PER_PAGE, filteredProjects.length);
    const projectsToShow = filteredProjects.slice(startIndex, endIndex);
    
    // Show message if no results
    if (projectsToShow.length === 0) {
      $('<div>')
        .addClass('col-span-1 xs:col-span-2 lg:col-span-3 text-center py-4')
        .html('<p class="text-midnight-400">No projects found matching your criteria.</p>')
        .appendTo(container);
    } else {
      // Add projects to container
      $.each(projectsToShow, (_, project) => {
        const card = this.createProjectCard(project);
        container.append(card);
        
        // Observe for lazy loading if available
        if (this.observer) {
          this.observer.observe(card[0]);
        }
      });
    }
    
    // Add pagination if needed
    if (totalPages > 1) {
      this.renderPagination(totalPages, page, year, type);
    }
  },
  
  createProjectCard(project) {
    // Use jQuery to create project card with midnight blue theme
    return $('<div>')
      .addClass('group bg-gradient-to-br from-midnight-900/40 to-midnight-800/40 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col border border-midnight-700/50 hover:border-midnight-600/70 hover:-translate-y-2')
      .html(`
        <div class="image-container relative overflow-hidden h-48">
          <img 
            ${this.observer ? 'data-src' : 'src'}="src/img/background_project/${project.year}/${project.image}" 
            alt="${project.title}" 
            loading="lazy"
            decoding="async"
            width="400"
            height="192"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onerror="this.onerror=null; this.src='src/img/placeholder.jpg'; this.removeAttribute('srcset');">
          <div class="absolute inset-0 bg-gradient-to-b from-midnight-950/20 via-midnight-900/40 to-midnight-950/90"></div>
          
          <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
            ${this.renderTypeBadges(project.type)}
          </div>
          
          <div class="absolute bottom-3 left-3">
            <span class="px-3 py-1 bg-midnight-600/90 text-white rounded-lg text-sm font-semibold backdrop-blur-sm shadow-lg border border-midnight-500/50">
              <i class="far fa-calendar-alt mr-1.5"></i>${project.year}
            </span>
          </div>
        </div>
        
        <div class="card-content p-5 flex flex-col flex-grow">
          <h2 class="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-midnight-300 transition-colors duration-300">${project.title}</h2>
          <p class="text-sm text-midnight-300 leading-relaxed line-clamp-3 mb-4">${project.desc}</p>
          
          ${project.stack && project.stack.length > 0 ? `
            <div class="flex flex-wrap gap-1.5 mb-4">
              ${project.stack.map(tech => `
                <span class="px-2 py-0.5 bg-midnight-700/60 text-midnight-200 rounded text-xs font-medium border border-midnight-600/40">
                  ${tech}
                </span>
              `).join('')}
            </div>
          ` : ''}
          
          <div class="h-px w-full bg-gradient-to-r from-transparent via-midnight-600 to-transparent mb-4"></div>
          
          <div class="flex gap-2 mt-auto">
            ${this.renderProjectButtons(project)}
          </div>
        </div>
      `);
  },
  
  renderTypeBadges(projectTypes) {
    const types = Array.isArray(projectTypes) ? projectTypes : [projectTypes];
    
    const typeStyles = {
      web: 'bg-emerald-500/90 text-white border-emerald-400/50',
      mobile: 'bg-violet-500/90 text-white border-violet-400/50',
      terminal: 'bg-amber-500/90 text-white border-amber-400/50'
    };
    
    const typeIcons = {
      web: '<i class="fas fa-globe fa-xs mr-1.5" aria-hidden="true"></i>',
      mobile: '<i class="fas fa-mobile-alt fa-xs mr-1.5" aria-hidden="true"></i>',
      terminal: '<i class="fas fa-terminal fa-xs mr-1.5" aria-hidden="true"></i>'
    };
    
    return types.map(type => `
      <span class="px-2.5 py-1 ${typeStyles[type] || ''} rounded-lg text-xs font-semibold backdrop-blur-sm shadow-lg border flex items-center gap-1" role="note">
        ${typeIcons[type] || ''}
        ${type.charAt(0).toUpperCase() + type.slice(1)}
      </span>
    `).join('');
  },
  
  renderProjectButtons(project) {
    let buttons = '';
    
    // GitHub button
    if (project.github) {
      buttons += `
        <a href="${project.github}" target="_blank" rel="noopener" 
           class="project-btn flex-1 bg-midnight-700/70 hover:bg-midnight-600/70 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-lg border border-midnight-600/50 transition-all duration-300 hover:scale-105"
           aria-label="View source code on GitHub">
          <i class="fab fa-github text-lg" aria-hidden="true"></i>
          <span>GitHub</span>
        </a>
      `;
    }
    
    // Demo button
    if (project.url) {
      buttons += `
        <a href="${project.url}" target="_blank" rel="noopener" 
           class="project-btn flex-1 bg-gradient-to-r from-midnight-500 to-midnight-600 hover:from-midnight-600 hover:to-midnight-700 text-white px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-center gap-2 shadow-lg border border-midnight-400/50 transition-all duration-300 hover:scale-105"
           aria-label="Visit live demo">
          <i class="fas fa-external-link-alt" aria-hidden="true"></i>
          <span>Demo</span>
        </a>
      `;
    }
    
    // If no buttons, show a placeholder
    if (!project.github && !project.url) {
      buttons = `
        <div class="flex-1 px-4 py-2.5 rounded-lg text-sm text-midnight-400 text-center border border-midnight-700/30 bg-midnight-900/20">
          <i class="fas fa-lock mr-2"></i>Private Project
        </div>
      `;
    }
    
    return buttons;
  },
    renderPagination(totalPages, currentPage, year, type) {
    // Remove existing pagination
    $('#paginationContainer').remove();
    
    // Create container
    const container = $('<div>')
      .attr('id', 'paginationContainer')
      .addClass('flex justify-center gap-2 mt-12 mb-8');
    
    // Previous button
    if (currentPage > 1) {
      $('<button>')
        .addClass('px-4 py-2 rounded-lg bg-midnight-800/50 hover:bg-midnight-700/50 text-white hover:scale-105 shadow-lg border border-midnight-700/50 hover:border-midnight-600 backdrop-blur-sm transition-all duration-300')
        .html('<i class="fas fa-chevron-left"></i>')
        .attr('aria-label', 'Previous page')
        .on('click', () => this.displayProjects(year, type, currentPage - 1))
        .appendTo(container);
    }
    
    // Page buttons - simplified for performance
    this.renderPageButtons(container, totalPages, currentPage, year, type);
    
    // Next button
    if (currentPage < totalPages) {
      $('<button>')
        .addClass('px-4 py-2 rounded-lg bg-midnight-800/50 hover:bg-midnight-700/50 text-white hover:scale-105 shadow-lg border border-midnight-700/50 hover:border-midnight-600 backdrop-blur-sm transition-all duration-300')
        .html('<i class="fas fa-chevron-right"></i>')
        .attr('aria-label', 'Next page')
        .on('click', () => this.displayProjects(year, type, currentPage + 1))
        .appendTo(container);
    }
    
    // Store current filter values for pagination use
    container.data('year', year);
    container.data('type', type);
    
    // Add to DOM
    $('#projectContainer').after(container);
  },
  
  renderPageButtons(container, totalPages, currentPage, year, type) {
    // Show limited number of page buttons with ellipsis for large numbers
    const maxButtons = 5;
    
    if (totalPages <= maxButtons) {
      // Show all pages
      for (let i = 1; i <= totalPages; i++) {
        this.appendPageButton(container, i, currentPage === i, year, type);
      }
    } else {
      // First page
      this.appendPageButton(container, 1, currentPage === 1, year, type);
      
      // Middle section with ellipsis
      if (currentPage > 3) {
        this.appendEllipsis(container);
      }
      
      // Pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        this.appendPageButton(container, i, currentPage === i, year, type);
      }
      
      // End ellipsis if needed
      if (currentPage < totalPages - 2) {
        this.appendEllipsis(container);
      }
      
      // Last page
      if (totalPages > 1) {
        this.appendPageButton(container, totalPages, currentPage === totalPages, year, type);
      }
    }
  },
    appendPageButton(container, pageNum, isActive, year, type) {
    const btnClass = isActive
      ? 'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-midnight-500 to-midnight-600 text-white shadow-lg scale-110 border border-midnight-400/50'
      : 'w-10 h-10 rounded-xl flex items-center justify-center bg-midnight-800/50 text-midnight-200 hover:bg-midnight-700/50 hover:scale-105 shadow-md border border-midnight-700/50 backdrop-blur-sm transition-all duration-300';
    
    const btn = $('<button>')
      .addClass(btnClass)
      .text(pageNum)
      .attr('aria-label', `Page ${pageNum}`)
      .attr('aria-current', isActive ? 'page' : null)
      .data('year', year)  // Store filter data in the button
      .data('type', type); // for easier access when clicked
    
    if (!isActive) {
      btn.on('click', () => this.displayProjects(year, type, pageNum));
    }
    
    container.append(btn);
  },
  
  appendEllipsis(container) {
    $('<span>')
      .addClass('flex items-center justify-center px-2')
      .text('...')
      .appendTo(container);
  }
};

/**
 * Experience Manager using jQuery
 */
const ExperienceManager = {
  init() {
    console.log("Checking experience data...");
    // Check if experience data exists in the global scope
    if (typeof experiences === 'undefined' || !experiences) {
      console.error("Experience data is missing. Make sure array.js is loaded.");
      window.experiences = [];
      window.experienceCategories = [];
      window.experienceTags = [];
      console.warn("Using empty experiences array");
    } else {
      console.log("Experience data loaded successfully:", experiences.length, "experiences found");
    }

    if (!$('#experienceContainer').length) {
      console.error("Experience container element not found");
      return;
    }
    
    // Setup filters
    this.setupFilters();
    
    // Setup modal functionality
    this.setupModal();
    
    // Initial display
    this.displayExperiences('all', []);
  },
  
  setupModal() {
    const modal = $('#experienceModal');
    const openBtn = $('#experienceToggle');
    const closeBtn = $('#closeExperienceModal');
    
    if (!modal.length || !openBtn.length) return;
    
    // Open modal
    openBtn.on('click', () => {
      modal.removeClass('hidden').addClass('flex');
      $('body').css('overflow', 'hidden'); // Prevent background scrolling
      
      // Reset filters to default
      this.resetFilters();
    });
    
    // Close modal on button click
    closeBtn.on('click', () => {
      modal.removeClass('flex').addClass('hidden');
      $('body').css('overflow', ''); // Restore scrolling
    });
    
    // Close modal on backdrop click
    modal.on('click', (e) => {
      if (e.target.id === 'experienceModal') {
        modal.removeClass('flex').addClass('hidden');
        $('body').css('overflow', '');
      }
    });
    
    // Close modal on Escape key
    $(document).on('keydown', (e) => {
      if (e.key === 'Escape' && modal.hasClass('flex')) {
        modal.removeClass('flex').addClass('hidden');
        $('body').css('overflow', '');
      }
    });
  },
  
  resetFilters() {
    // Reset category filter
    const categoryContainer = $('#experienceCategoryFilter');
    categoryContainer.find('button').removeClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg')
      .addClass('bg-midnight-800/50 text-midnight-300 border-midnight-700/50');
    categoryContainer.find('button[data-category="all"]')
      .removeClass('bg-midnight-800/50 text-midnight-300 border-midnight-700/50')
      .addClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg');
    
    // Reset tag filter
    $('#experienceTagFilter button').removeClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg')
      .addClass('bg-midnight-800/50 text-midnight-300 border-midnight-700/50');
    
    // Display all experiences
    this.displayExperiences('all', []);
  },
  
  setupFilters() {
    console.log("Setting up experience filters");
    
    // Setup category filter buttons
    const categoryContainer = $('#experienceCategoryFilter');
    if (categoryContainer.length && window.experienceCategories) {
      categoryContainer.empty();
      
      $.each(window.experienceCategories, (_, category) => {
        const btn = $('<button>')
          .attr('data-category', category)
          .addClass('px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 border')
          .addClass(category === 'all' 
            ? 'bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg' 
            : 'bg-midnight-800/50 text-midnight-300 border-midnight-700/50 hover:bg-midnight-700/50 hover:border-midnight-600')
          .text(category.charAt(0).toUpperCase() + category.slice(1))
          .on('click', function() {
            // Update button styles
            categoryContainer.find('button').removeClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg')
              .addClass('bg-midnight-800/50 text-midnight-300 border-midnight-700/50');
            $(this).removeClass('bg-midnight-800/50 text-midnight-300 border-midnight-700/50')
              .addClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg');
            
            // Get selected tags
            const selectedTags = $('#experienceTagFilter button.bg-gradient-to-r').map(function() {
              return $(this).data('tag');
            }).get();
            
            ExperienceManager.displayExperiences(category, selectedTags);
          });
        
        categoryContainer.append(btn);
      });
    }
    
    // Setup tag filter buttons
    const tagContainer = $('#experienceTagFilter');
    if (tagContainer.length && window.experienceTags) {
      tagContainer.empty();
      
      $.each(window.experienceTags, (_, tag) => {
        const btn = $('<button>')
          .attr('data-tag', tag)
          .addClass('px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 border bg-midnight-800/50 text-midnight-300 border-midnight-700/50 hover:bg-midnight-700/50 hover:border-midnight-600')
          .text(tag)
          .on('click', function() {
            // Toggle tag selection
            $(this).toggleClass('bg-gradient-to-r from-midnight-500 to-midnight-600 text-white border-midnight-400/50 shadow-lg bg-midnight-800/50 text-midnight-300 border-midnight-700/50');
            
            // Get selected category and tags
            const category = $('#experienceCategoryFilter button.bg-gradient-to-r').data('category') || 'all';
            const selectedTags = $('#experienceTagFilter button.bg-gradient-to-r').map(function() {
              return $(this).data('tag');
            }).get();
            
            ExperienceManager.displayExperiences(category, selectedTags);
          });
        
        tagContainer.append(btn);
      });
    }
  },
  
  displayExperiences(category = 'all', tags = []) {
    const container = $('#experienceContainer');
    if (!container.length) {
      console.error("Experience container not found");
      return;
    }
    
    // Clear container
    container.empty();
    
    // Get filtered experiences
    const filteredExperiences = this.getFilteredExperiences(category, tags);
    console.log(`Filtered experiences (${category}, tags: ${tags.join(', ')}):`, filteredExperiences.length);
    
    // Show message if no results
    if (filteredExperiences.length === 0) {
      $('<div>')
        .addClass('text-center py-8')
        .html('<p class="text-midnight-400">No experience found matching your criteria.</p>')
        .appendTo(container);
    } else {
      // Add experiences to container
      $.each(filteredExperiences, (_, experience) => {
        const card = this.createExperienceCard(experience);
        container.append(card);
      });
    }
  },
  
  getFilteredExperiences(category, tags) {
    let filtered = [...experiences];
    
    // Filter by category
    if (category !== 'all') {
      filtered = filtered.filter(exp => exp.category === category);
    }
    
    // Filter by tags
    if (tags.length > 0) {
      filtered = filtered.filter(exp => 
        tags.some(tag => exp.tags && exp.tags.includes(tag))
      );
    }
    
    return filtered;
  },
  
  createExperienceCard(experience) {
    return $('<div>')
      .addClass('bg-gradient-to-br from-midnight-900/40 to-midnight-800/40 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-midnight-700/50 hover:border-midnight-600/70 transition-all duration-300 hover:-translate-y-1')
      .html(`
        <div class="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div class="flex-grow">
            <h3 class="text-xl font-bold text-white mb-1">${experience.title}</h3>
            <p class="text-midnight-300 font-semibold mb-1">${experience.role}</p>
            <p class="text-midnight-400 text-sm">
              <i class="fas fa-building mr-2"></i>${experience.company}
              ${experience.location ? ` • <i class="fas fa-map-marker-alt mr-1"></i>${experience.location}` : ''}
            </p>
          </div>
          <div class="flex-shrink-0">
            <span class="px-3 py-1.5 bg-midnight-700/60 text-midnight-200 rounded-lg text-sm font-medium border border-midnight-600/40 whitespace-nowrap">
              <i class="far fa-calendar-alt mr-1.5"></i>${experience.period}
            </span>
          </div>
        </div>
        
        <p class="text-midnight-300 text-sm leading-relaxed mb-4">${experience.description}</p>
        
        ${experience.achievements && experience.achievements.length > 0 ? `
          <div class="mb-4">
            <h4 class="text-sm font-semibold text-midnight-200 mb-2">Key Achievements:</h4>
            <ul class="space-y-1.5">
              ${experience.achievements.map(achievement => `
                <li class="text-midnight-300 text-sm flex items-start gap-2">
                  <i class="fas fa-check-circle text-midnight-500 mt-0.5 flex-shrink-0"></i>
                  <span>${achievement}</span>
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${experience.tags && experience.tags.length > 0 ? `
          <div class="flex flex-wrap gap-1.5 pt-4 border-t border-midnight-700/50">
            ${experience.tags.map(tag => `
              <span class="px-2 py-0.5 bg-midnight-700/40 text-midnight-300 rounded text-xs font-medium border border-midnight-600/30">
                ${tag}
              </span>
            `).join('')}
          </div>
        ` : ''}
      `);
  }
};

/**
 * Responsive layout handling
 */
const LayoutManager = {
  init() {
    this.updateXsClass();
    
    $(window).on('resize', $.debounce(200, () => {
      this.updateXsClass();
    }));
  },
  
  updateXsClass() {
    $('html').toggleClass('xs', $(window).width() <= 480);
  }
};

/**
 * Initialize app with proper data checks
 */
function initApp() {
  console.log("App initializing...");
  
  try {
    // Verify data is loaded
    if (typeof $ === 'undefined') {
      console.error("jQuery not loaded! Adding a fallback...");
      window.$ = function(selector) { 
        return {
          length: 0,
          on: function() { return this; },
          css: function() { return this; },
          text: function() { return this; },
          append: function() { return this; },
          remove: function() { return this; }
        };
      };
    }
    
    // Verify array.js data
    console.log("Checking if data from array.js is available:");
    console.log("- Profile data:", typeof profile !== 'undefined');
    console.log("- Projects data:", typeof projects !== 'undefined');
    console.log("- Experience data:", typeof experiences !== 'undefined');
    
    ProfileManager.init();
    console.log("Profile initialized");
    
    ProjectManager.init();
    console.log("Projects initialized");
    
    ExperienceManager.init();
    console.log("Experience initialized");
    
    LayoutManager.init();
    console.log("Layout manager initialized");
  } catch (error) {
    console.error("Error initializing app:", error);
  }
}

// Wait for array.js to load before initializing
$(document).ready(function() {
  // Additional check to ensure array.js data is available
  setTimeout(() => {
    if (typeof profile === 'undefined' || typeof projects === 'undefined') {
      console.warn("Data still not loaded after timeout, attempting initialization anyway");
    }
    initApp();
  }, 100); // Small delay to ensure array.js is properly processed
});

// Clean up loading indicators when everything is loaded
$(window).on('load', () => {
  $('body').removeClass('loading').addClass('loaded');
  $('.shimmer').remove();
  $('html').css('scrollBehavior', 'smooth');
});

// Add jQuery debounce plugin if not available
if (!$.debounce) {
  $.debounce = function(wait, func) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };
}
