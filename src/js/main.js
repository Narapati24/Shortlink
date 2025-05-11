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
 * Theme handling with jQuery
 */
const ThemeManager = {
  init() {
    // Check if element exists before operating on it
    if (!$('#theme-toggle').length) return;
    
    // Set theme based on stored preference or system preference
    this.applyTheme();
    
    // Set up listener with jQuery
    $('#theme-toggle').on('click', () => {
      const isDark = $('html').toggleClass('dark').hasClass('dark');
      localStorage.theme = isDark ? 'dark' : 'light';
      this.updateIcons(isDark);
      
      // Update accessibility attributes
      $('#theme-toggle').attr('aria-pressed', isDark);
      $('#theme-toggle .mode-label').text(isDark ? 'light' : 'dark');
    });
    
    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      if (!localStorage.theme) this.applyTheme();
    });
  },
  
  applyTheme() {
    // Check system preference only when needed
    const prefersDark = !localStorage.theme && 
                        window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = localStorage.theme === 'dark' || prefersDark;
    
    // Apply theme and update UI
    $('html').toggleClass('dark', isDark);
    this.updateIcons(isDark);
    
    // Update accessibility attributes
    $('#theme-toggle').attr('aria-pressed', isDark);
    $('#theme-toggle .mode-label').text(isDark ? 'light' : 'dark');
  },
  
  updateIcons(isDark) {
    // Use jQuery selectors
    const sunIcon = $('#theme-toggle svg:first-child');
    const moonIcon = $('#theme-toggle svg:last-child');
    
    if (!sunIcon.length || !moonIcon.length) return;
    
    // Manage classes
    sunIcon.toggleClass('opacity-0 scale-0', !isDark);
    sunIcon.toggleClass('opacity-100 scale-100', isDark);
    
    moonIcon.toggleClass('opacity-0 scale-0', isDark);
    moonIcon.toggleClass('opacity-100 scale-100', !isDark);
  }
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
    $('#profileImage').attr('src', `src/img/profile/${profile.image}`);
    $('#profileName').text(profile.name);
    $('#profileRole').text(profile.role);
    $('#profileDesc').text(profile.description);
    
    // Render social links and skills
    this.renderSocial();
    this.renderSkills();
    
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
        .addClass("text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1")
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
      frontend: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/70',
      backend: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/70',
      mobile: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/70',
      design: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/70',
      tools: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/70'
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
        .addClass(`px-3 py-1 ${colors[skill.category] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300'} rounded-full text-sm border border-opacity-40 hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-1 shadow-sm`)
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
            $('<option>').val(year).text(year)
          );
        });
        console.log("Added year options:", window.projectYears.length);
      } else {
        console.warn("No year data available for filters");
        // Add some default years as fallback
        ['2024', '2023', '2022'].forEach(year => {
          yearSelect.append($('<option>').val(year).text(year));
        });
      }
      
      // Add event listener
      yearSelect.on('change', () => {
        this.currentPage = 1;
        this.displayProjects(yearSelect.val(), $('#typeFilter').val(), 1);
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
            $('<option>').val(type).text(type.charAt(0).toUpperCase() + type.slice(1))
          );
        });
        console.log("Added type options:", window.projectTypes.length);
      } else {
        console.warn("No type data available for filters");
        // Add some default types as fallback
        ['web', 'mobile', 'terminal'].forEach(type => {
          typeSelect.append($('<option>').val(type).text(type.charAt(0).toUpperCase() + type.slice(1)));
        });
      }
      
      // Add event listener
      typeSelect.on('change', () => {
        this.currentPage = 1;
        this.displayProjects($('#yearFilter').val(), typeSelect.val(), 1);
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
        .html('<p class="text-gray-500 dark:text-gray-400">No projects found matching your criteria.</p>')
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
    // Use jQuery to create project card with fixed height structure
    return $('<div>')
      .addClass('group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100/50 dark:border-gray-700/50 hover:border-blue-200/50 dark:hover:border-blue-700/50 hover:-translate-y-1')
      .html(`
        <div class="image-container relative overflow-hidden">
          <img 
            ${this.observer ? 'data-src' : 'src'}="src/img/background_project/${project.year}/${project.image}" 
            alt="${project.title}" 
            loading="lazy"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onerror="this.onerror=null; this.src='src/img/placeholder.jpg';">
          <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 dark:from-black/30 dark:via-black/50 dark:to-black/80"></div>
          
          <div class="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2 flex-wrap">
            ${this.renderTypeBadges(project.type)}
          </div>
          
          <div class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
            <span class="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600/90 dark:bg-blue-500/90 text-white rounded-full text-xs font-medium backdrop-blur-sm shadow-md border border-blue-500/30 dark:border-blue-400/30">
              ${project.year}
            </span>
          </div>
        </div>
        
        <div class="card-content p-3 sm:p-4 md:p-5 flex flex-col flex-grow bg-gradient-to-br from-white/0 via-white/70 to-blue-50/50 dark:from-transparent dark:via-transparent dark:to-blue-900/20 relative">
          <div class="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_70%)]"></div>
          
          <h2 class="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative z-10">${project.title}</h2>
          <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-3 sm:mb-4 flex-grow relative z-10">${project.desc}</p>
          
          <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-3 sm:mb-4 opacity-70"></div>
          
          <div class="flex gap-2 mt-auto relative z-10">
            ${this.renderProjectButtons(project)}
          </div>
        </div>
      `);
  },
  
  renderTypeBadges(projectTypes) {
    const types = Array.isArray(projectTypes) ? projectTypes : [projectTypes];
    
    const typeStyles = {
      web: 'bg-emerald-600/90 dark:bg-emerald-500/90 text-white border-emerald-500/50 dark:border-emerald-400/30',
      mobile: 'bg-violet-600/90 dark:bg-violet-500/90 text-white border-violet-500/50 dark:border-violet-400/30',
      terminal: 'bg-amber-600/90 dark:bg-amber-500/90 text-white border-amber-500/50 dark:border-amber-400/30'
    };
    
    const typeIcons = {
      web: '<i class="fas fa-globe fa-xs mr-1" aria-hidden="true"></i>',
      mobile: '<i class="fas fa-mobile-alt fa-xs mr-1" aria-hidden="true"></i>',
      terminal: '<i class="fas fa-terminal fa-xs mr-1" aria-hidden="true"></i>'
    };
    
    return types.map(type => `
      <span class="px-2 py-1 ${typeStyles[type] || ''} rounded-full text-sm font-medium backdrop-blur-sm shadow-md border transform transition-transform duration-300 flex items-center gap-1" role="note">
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
           class="project-btn flex-1 bg-gray-800 dark:bg-gray-700 text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 shadow-md border border-gray-700/50 dark:border-gray-600/50 overflow-hidden"
           aria-label="View source code on GitHub">
          <span class="flex items-center justify-center gap-1 sm:gap-2">
            <i class="fab fa-github" aria-hidden="true"></i>
            <span class="hidden xs:inline-block">Source Code</span>
            <span class="xs:hidden">Code</span>
          </span>
        </a>
      `;
    }
    
    // Demo button
    if (project.url) {
      buttons += `
        <a href="${project.url}" target="_blank" rel="noopener" 
           class="project-btn flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-sm font-medium flex items-center justify-center gap-1 sm:gap-2 shadow-md border border-blue-500/50 dark:border-blue-500/30 overflow-hidden"
           aria-label="Visit live demo">
          <span class="flex items-center justify-center gap-1 sm:gap-2">
            <i class="fas fa-external-link-alt" aria-hidden="true"></i>
            <span class="hidden xs:inline-block">Live Demo</span>
            <span class="xs:hidden">Demo</span>
          </span>
        </a>
      `;
    } else if (!project.github) {
      buttons += '<div class="flex-1"></div>';
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
        .addClass('px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300')
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
        .addClass('px-4 py-2 rounded-xl bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300')
        .html('<i class="fas fa-chevron-right"></i>')
        .attr('aria-label', 'Next page')
        .on('click', () => this.displayProjects(year, type, currentPage + 1))
        .appendTo(container);
    }
    
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
      ? 'w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg scale-110 border border-blue-500/50 dark:border-blue-400/50'
      : 'w-10 h-10 rounded-xl flex items-center justify-center bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm transition-all duration-300';
    
    const btn = $('<button>')
      .addClass(btnClass)
      .text(pageNum)
      .attr('aria-label', `Page ${pageNum}`)
      .attr('aria-current', isActive ? 'page' : null);
    
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
    
    ThemeManager.init();
    console.log("Theme initialized");
    
    ProfileManager.init();
    console.log("Profile initialized");
    
    ProjectManager.init();
    console.log("Projects initialized");
    
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
