// Add Dark Mode Toggle Function
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check initial theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Fix icon visibility based on current theme
  updateThemeIcons();

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
    
    // Update icon visibility after theme change
    updateThemeIcons();
  });
}

// New helper function to ensure correct icon visibility
function updateThemeIcons() {
  const isDark = document.documentElement.classList.contains('dark');
  const sunIcon = document.querySelector('#theme-toggle svg:first-child');
  const moonIcon = document.querySelector('#theme-toggle svg:last-child');
  
  if (isDark) {
    // Show sun icon in dark mode
    sunIcon.classList.remove('opacity-0', 'scale-0');
    sunIcon.classList.add('opacity-100', 'scale-100');
    moonIcon.classList.remove('opacity-100', 'scale-100');
    moonIcon.classList.add('opacity-0', 'scale-0');
  } else {
    // Show moon icon in light mode
    moonIcon.classList.remove('opacity-0', 'scale-0');
    moonIcon.classList.add('opacity-100', 'scale-100');
    sunIcon.classList.remove('opacity-100', 'scale-100');
    sunIcon.classList.add('opacity-0', 'scale-0');
  }
}

// Initialize theme
initTheme();

// Display profile - Enhanced with better animations and styling
function displayProfile() {
  document.getElementById('profileImage').src = `src/img/profile/${profile.image}`;
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileRole').textContent = profile.role;
  
  const socialContainer = document.getElementById('socialLinks');
  socialContainer.innerHTML = '';
  
  const socialIcons = {
    github: 'github',
    linkedin: 'linkedin-in'
  };

  Object.entries(profile.social).forEach(([platform, url]) => {
    const link = document.createElement('a');
    link.href = url;
    link.target = "_blank";
    link.className = "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400 text-2xl transition-all duration-300 transform hover:scale-110 hover:-translate-y-1";
    link.innerHTML = `<i class="fab fa-${socialIcons[platform]}"></i>`;
    socialContainer.appendChild(link);
  });

  // Add expanded content
  document.getElementById('profileDesc').textContent = profile.description;
  
  // Display skills with visual enhancements - improved colors and animations
  const skillsContainer = document.getElementById('skillsList');
  skillsContainer.innerHTML = profile.skills
    .map((skill, index) => {
      // Assign colors based on category - enhanced for better dark/light mode contrast
      const categoryColors = {
        frontend: 'bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800/70',
        backend: 'bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/70',
        mobile: 'bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 border-violet-200 dark:border-violet-800/70',
        design: 'bg-rose-100 dark:bg-rose-900/40 text-rose-700 dark:text-rose-300 border-rose-200 dark:border-rose-800/70',
        tools: 'bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800/70'
      };
      
      const colorClass = categoryColors[skill.category] || 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300';
      
      return `
        <span class="px-3 py-1 ${colorClass} rounded-full text-sm border border-opacity-40 hover:scale-105 transition-all duration-300 cursor-default flex items-center gap-1 shadow-sm" style="animation: fadeIn 0.5s ease forwards; animation-delay: ${index * 0.1}s; opacity: 0;">
          ${getSkillIcon(skill.category)}
          ${skill.name}
          ${skill.level ? `<span class="ml-1 text-xs opacity-80">${levelDot(skill.level)}</span>` : ''}
        </span>
      `;
    })
    .join('');

  // Add toggle functionality with enhanced animation
  setupProfileToggle();
  
  // Flag that profile has been displayed
  document.body.dataset.profileLoaded = 'true';
}

// Separate function for profile toggle to allow reinitialization
function setupProfileToggle() {
  const toggle = document.getElementById('profileToggle');
  const expanded = document.getElementById('profileExpanded');
  const toggleIcon = document.getElementById('toggleIcon');
  const toggleText = document.getElementById('toggleText');
  
  // Preserve expanded state using localStorage
  let isExpanded = localStorage.getItem('profileExpanded') === 'true';
  
  // Apply initial state
  if (isExpanded) {
    expanded.style.height = `${expanded.scrollHeight}px`;
    toggleIcon.style.transform = 'rotate(180deg)';
    toggleText.textContent = 'See Less';
    
    // Ensure skills are visible
    setTimeout(() => {
      const elements = expanded.querySelectorAll('h2, p, #skillsList span');
      elements.forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      });
    }, 300);
  } else {
    expanded.style.height = '0';
    toggleIcon.style.transform = '';
    toggleText.textContent = 'See More';
  }

  toggle.addEventListener('click', () => {
    isExpanded = !isExpanded;
    
    // Store state in localStorage
    localStorage.setItem('profileExpanded', isExpanded);
    
    if (isExpanded) {
      expanded.style.height = `${expanded.scrollHeight}px`;
      toggleIcon.style.transform = 'rotate(180deg)';
      toggleText.textContent = 'See Less';
      
      // Add subtle animation to content
      setTimeout(() => {
        const elements = expanded.querySelectorAll('h2, p, #skillsList span');
        elements.forEach((el, i) => {
          el.style.animation = `fadeIn 0.5s ease forwards`;
          el.style.animationDelay = `${i * 0.05}s`;
        });
      }, 300);
    } else {
      expanded.style.height = '0';
      toggleIcon.style.transform = '';
      toggleText.textContent = 'See More';
    }
  });
}

// Helper function to get appropriate icon for skill category
function getSkillIcon(category) {
  const icons = {
    frontend: '<i class="fas fa-code fa-sm mr-1"></i>',
    backend: '<i class="fas fa-server fa-sm mr-1"></i>',
    mobile: '<i class="fas fa-mobile-alt fa-sm mr-1"></i>',
    design: '<i class="fas fa-palette fa-sm mr-1"></i>',
    tools: '<i class="fas fa-tools fa-sm mr-1"></i>'
  };
  
  return icons[category] || '';
}

// Helper function to show level as dots
function levelDot(level) {
  const levels = {
    'Beginner': '•',
    'Intermediate': '••',
    'Advanced': '•••',
    'Expert': '••••'
  };
  
  return levels[level] || '';
}

// Initialize profile
displayProfile();

// Populate year filter
const yearSelect = document.getElementById('yearFilter');
projectYears.forEach(year => {
  const option = document.createElement('option');
  option.value = year;
  option.textContent = year;
  yearSelect.appendChild(option);
});

// Populate type filter
const typeSelect = document.getElementById('typeFilter');
projectTypes.forEach(type => {
  const option = document.createElement('option');
  option.value = type;
  option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
  typeSelect.appendChild(option);
});

// Add pagination state
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Display projects with pagination
function displayProjects(year = 'all', type = 'all', page = 1) {
  const container = document.getElementById('projectContainer');
  container.innerHTML = '';
  
  // Update container class to limit max columns to 3 on all screen sizes
  container.className = 'grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 xs:gap-4 sm:gap-5 lg:gap-6';
  
  let filteredProjects = [...projects];

  if (year !== 'all') {
    filteredProjects = filteredProjects.filter(project => project.year === year);
  }

  if (type !== 'all') {
    filteredProjects = filteredProjects.filter(project => {
      const projectTypes = Array.isArray(project.type) ? project.type : [project.type];
      return projectTypes.includes(type);
    });
  }

  filteredProjects.reverse(); // Show newest projects first

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  // If we have fewer than ITEMS_PER_PAGE items, add placeholders to maintain grid
  const projectsToDisplay = filteredProjects.slice(startIndex, endIndex);
  
  projectsToDisplay.forEach(project => {
    const card = createProjectCard(project);
    container.appendChild(card);
  });

  // Display pagination controls
  displayPagination(totalPages, page, year, type);
  
  // Add a small delay before enhancing cards to ensure DOM is ready
  setTimeout(() => enhanceExistingCards(), 50);
}

// Update the type badge display in the project card with fixed position and improved light mode
function getTypeBadges(projectTypes) {
  const typeColors = {
    web: 'bg-emerald-600/90 dark:bg-emerald-500/90 text-white border-emerald-500/50 dark:border-emerald-400/30',
    mobile: 'bg-violet-600/90 dark:bg-violet-500/90 text-white border-violet-500/50 dark:border-violet-400/30',
    terminal: 'bg-amber-600/90 dark:bg-amber-500/90 text-white border-amber-500/50 dark:border-amber-400/30'
  };

  const types = Array.isArray(projectTypes) ? projectTypes : [projectTypes];
  return types.map(type => `
    <span class="px-2 py-1 ${typeColors[type]} rounded-full text-xs font-medium backdrop-blur-sm shadow-md border transform transition-transform duration-300 flex items-center gap-1 badge-glow">
      ${getTypeIcon(type)}
      ${type.charAt(0).toUpperCase() + type.slice(1)}
    </span>
  `).join('');
}

// Helper function to get icon for project type
function getTypeIcon(type) {
  const icons = {
    web: '<i class="fas fa-globe fa-xs mr-1"></i>',
    mobile: '<i class="fas fa-mobile-alt fa-xs mr-1"></i>',
    terminal: '<i class="fas fa-terminal fa-xs mr-1"></i>'
  };
  
  return icons[type] || '';
}

// Update the project card creation for better responsiveness
function createProjectCard(project) {
  const card = document.createElement('div');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        generateCardContent(card, project);
        
        // Enhanced animation when card enters viewport
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px) scale(0.98)';
        
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0) scale(1)';
          
          // Add interaction effects right after cards become visible
          addCardInteractionEffects(card);
        }, 100);
        
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px 50px 0px'
  });
  
  // Ensure proper structure for hover effects
  card.className = 'group bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-md hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col border border-gray-100/50 dark:border-gray-700/50 hover:border-blue-200/50 dark:hover:border-blue-700/50 hover:-translate-y-1';
  card.style.transition = 'all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1), opacity 0.5s ease, transform 0.5s ease';
  observer.observe(card);
  return card;
}

function generateCardContent(card, project) {
  const imagePath = `src/img/background_project/${project.year}/${project.image}`;
  
  // Responsive content structure with adaptive padding and sizing
  card.innerHTML = `
    <div class="relative h-36 sm:h-40 overflow-hidden group-hover:h-40 sm:group-hover:h-44 transition-all duration-500">
      <img src="${imagePath}" 
           alt="${project.title}" 
           loading="lazy"
           decoding="async"
           class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
           onerror="this.onerror=null; this.src='src/img/placeholder.jpg';"
      >
      <div class="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/80 dark:from-black/30 dark:via-black/50 dark:to-black/80 group-hover:opacity-80 transition-all duration-300"></div>
      
      <!-- Type badges with improved responsive layout -->
      <div class="absolute top-2 sm:top-3 left-2 sm:left-3 flex gap-1 sm:gap-2 flex-wrap transition-all duration-300">
        ${getTypeBadges(project.type)}
      </div>
      
      <!-- Year badge - Responsive positioning -->
      <div class="absolute bottom-2 sm:bottom-3 left-2 sm:left-3">
        <span class="px-2 sm:px-3 py-0.5 sm:py-1 bg-blue-600/90 dark:bg-blue-500/90 text-white rounded-full text-xs font-medium backdrop-blur-sm shadow-md transform group-hover:scale-105 transition-transform duration-300 border border-blue-500/30 dark:border-blue-400/30">
          ${project.year}
        </span>
      </div>
    </div>
    <div class="p-3 sm:p-4 md:p-5 flex flex-col flex-grow bg-gradient-to-br from-white/0 via-white/70 to-blue-50/50 dark:from-transparent dark:via-transparent dark:to-blue-900/20 relative">
      <!-- Enhanced background element - improved for light mode -->
      <div class="absolute inset-0 opacity-20 dark:opacity-10 pointer-events-none bg-[radial-gradient(circle_at_bottom_left,rgba(59,130,246,0.15),transparent_70%)]"></div>
      
      <!-- Card shine effect overlay - enhanced for light mode -->
      <div class="card-shine absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700"></div>
      
      <h2 class="text-base sm:text-lg font-bold text-gray-800 dark:text-white mb-1 sm:mb-2 line-clamp-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 relative z-10">${project.title}</h2>
      <p class="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed line-clamp-3 mb-3 sm:mb-4 flex-grow relative z-10">${project.desc}</p>
      
      <!-- Enhanced card divider - improved for light mode -->
      <div class="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-3 sm:mb-4 opacity-70"></div>
      
      <div class="flex gap-2 mt-auto relative z-10">
        ${project.github ? `
          <a href="${project.github}" target="_blank" rel="noopener" 
             class="project-btn project-github-btn flex-1 bg-gray-800 dark:bg-gray-700 text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:shadow-xl border border-gray-700/50 dark:border-gray-600/50 overflow-hidden group/btn">
            <span class="flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 group-hover/btn:translate-y-0">
              <i class="fab fa-github transition-all duration-300 group-hover/btn:scale-110"></i>
              <span class="transition-all duration-300 group-hover/btn:font-semibold hidden xs:inline-block">Source Code</span>
              <span class="transition-all duration-300 group-hover/btn:font-semibold xs:hidden">Code</span>
            </span>
          </a>
        ` : ''}
        ${project.url ? `
          <a href="${project.url}" target="_blank" rel="noopener" 
             class="project-btn project-demo-btn flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 dark:from-blue-500 dark:to-blue-600 dark:hover:from-blue-600 dark:hover:to-blue-700 text-white px-2 sm:px-3 py-2 sm:py-2.5 rounded-lg text-xs font-medium flex items-center justify-center gap-1 sm:gap-2 shadow-md hover:shadow-xl border border-blue-500/50 dark:border-blue-500/30 overflow-hidden group/btn">
            <span class="flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 group-hover/btn:translate-y-0">
              <i class="fas fa-external-link-alt transition-all duration-300 group-hover/btn:scale-110"></i>
              <span class="transition-all duration-300 group-hover/btn:font-semibold hidden xs:inline-block">Live Demo</span>
              <span class="transition-all duration-300 group-hover/btn:font-semibold xs:hidden">Demo</span>
            </span>
          </a>
        ` : project.github ? '' : '<div class="flex-1"></div>'}
      </div>
    </div>
  `;
  
  // Add enhanced interaction effects
  addCardInteractionEffects(card);
}

// Separate buttons HTML generation for cleaner code
function getButtonsHTML(project) {
  return `
    <div class="flex justify-between items-center gap-4">
      <div class="flex items-center gap-2 flex-wrap">
        <span class="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">${project.year}</span>
        ${getTypeBadges(project.type)}
      </div>
      <div class="flex gap-3">
        ${project.github ? `
          <a href="${project.github}" target="_blank" 
             class="bg-gray-800 dark:bg-gray-700 text-white px-4 py-2 rounded-xl hover:bg-gray-700 dark:hover:bg-gray-600 transition-all duration-300 text-sm font-medium flex items-center gap-2">
            <i class="fab fa-github"></i>
            <span>Code</span>
          </a>
        ` : ''}
        ${project.url ? `
          <a href="${project.url}" target="_blank" 
             class="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 text-sm font-medium flex items-center gap-2">
            <i class="fas fa-external-link-alt"></i>
            <span>Visit</span>
          </a>
        ` : ''}
      </div>
    </div>
  `;
}

// Enhanced pagination controls
function displayPagination(totalPages, currentPage, year, type) {
  // Remove existing pagination if any
  const existingPagination = document.getElementById('paginationContainer');
  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'paginationContainer';
  paginationContainer.className = 'flex justify-center gap-2 mt-12 mb-8';
  
  // Add previous page button if not on first page
  if (currentPage > 1) {
    const prevBtn = document.createElement('button');
    prevBtn.className = 'px-4 py-2 rounded-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm hover:text-blue-600 dark:hover:text-blue-400';
    prevBtn.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevBtn.onclick = () => displayProjects(year, type, currentPage - 1);
    paginationContainer.appendChild(prevBtn);
  }
  
  for (let i = 1; i <= totalPages; i++) {
    // Show limited page numbers for cleaner UI
    if (totalPages > 5) {
      // Always show first, last, current, and pages around current
      if (i !== 1 && i !== totalPages && i !== currentPage && 
          i !== currentPage - 1 && i !== currentPage + 1 &&
          i !== currentPage - 2 && i !== currentPage + 2) {
        // Show ellipsis for skipped pages
        if (i === 2 || i === totalPages - 1) {
          const ellipsis = document.createElement('span');
          ellipsis.className = 'flex items-center justify-center px-2';
          ellipsis.textContent = '...';
          paginationContainer.appendChild(ellipsis);
        }
        continue;
      }
    }
    
    const pageBtn = document.createElement('button');
    pageBtn.className = `w-10 h-10 rounded-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm ${
      currentPage === i 
        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 text-white shadow-lg scale-110 border border-blue-500/50 dark:border-blue-400/50' 
        : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700'
    }`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => displayProjects(year, type, i);
    paginationContainer.appendChild(pageBtn);
  }
  
  // Add next page button if not on last page
  if (currentPage < totalPages) {
    const nextBtn = document.createElement('button');
    nextBtn.className = 'px-4 py-2 rounded-xl transition-all duration-300 bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 hover:scale-105 shadow-md border border-gray-200 dark:border-gray-700 backdrop-blur-sm';
    nextBtn.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextBtn.onclick = () => displayProjects(year, type, currentPage + 1);
    paginationContainer.appendChild(nextBtn);
  }
  
  document.getElementById('projectContainer').after(paginationContainer);

  // Add custom pagination styles in JS to ensure better animation and hover effects
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    #paginationContainer button {
      transition: all 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    #paginationContainer button:hover {
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }
  `;
  document.head.appendChild(style);
}

// Initial display
displayProjects('all', 'all', 1);

// Debounce filter changes
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Debounced filter handlers
yearFilter.addEventListener('change', debounce((e) => {
  currentPage = 1;
  displayProjects(e.target.value, typeFilter.value, currentPage);
}, 250));

typeFilter.addEventListener('change', debounce((e) => {
  currentPage = 1;
  displayProjects(yearFilter.value, e.target.value, currentPage);
}, 250));

// Add additional initialization
window.addEventListener('load', () => {
  // Add smooth scroll behavior
  document.documentElement.style.scrollBehavior = 'smooth';
  
  // Remove shimmer loading elements
  const shimmerElements = document.querySelectorAll('.shimmer');
  shimmerElements.forEach(el => el.remove());
  
  // Update initial container class to match displayProjects
  const container = document.getElementById('projectContainer');
  if (container) {
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8';
  }

  // Fix the bouncing animation for the "j" in Projects heading
  const projectHeading = document.querySelector('h1[class*="text-3xl"]');
  if (projectHeading) {
    projectHeading.innerHTML = projectHeading.innerHTML.replace(
      'Pro<span class="inline-block animate-bounce">j</span>ects',
      'Pro<span class="inline-block animate-bounce text-blue-600 dark:text-blue-400">j</span>ects'
    );
  }

  // Apply theme-based subtle animations
  const isDarkMode = document.documentElement.classList.contains('dark');
  
  // Adjust particles based on theme if particles.js is loaded
  if (window.pJSDom && window.pJSDom.length > 0) {
    const particles = window.pJSDom[0].pJS.particles;
    
    if (isDarkMode) {
      // More subtle particles for dark mode
      particles.color.value = '#4b5563';
      particles.opacity.value = 0.3;
    } else {
      // Brighter particles for light mode
      particles.color.value = '#93c5fd';
      particles.opacity.value = 0.5;
    }
    
    // Refresh particles
    window.pJSDom[0].pJS.fn.particlesRefresh();
  }

  // Fix dropdowns styling and behavior
  fixDropdowns();

  // Add custom animations to the page
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
    
    .animate-on-scroll {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
    }
    
    .animate-on-scroll.visible {
      opacity: 1;
      transform: translateY(0);
    }
    
    /* Enhanced card effects */
    .badge-glow {
      animation: badgePulse 2s infinite alternate ease-in-out;
    }
    
    @keyframes badgePulse {
      0% { box-shadow: 0 0 5px rgba(0,0,0,0.15); }
      100% { box-shadow: 0 0 8px rgba(59,130,246,0.3); }
    }
    
    .dark .badge-glow {
      animation: darkBadgePulse 2s infinite alternate ease-in-out;
    }
    
    @keyframes darkBadgePulse {
      0% { box-shadow: 0 0 5px rgba(0,0,0,0.2); }
      100% { box-shadow: 0 0 8px rgba(59,130,246,0.4); }
    }
    
    /* Fix for project buttons */
    .project-btn {
      position: relative;
      overflow: hidden;
      z-index: 1;
      transition: all 0.3s ease-out;
    }
    
    .project-btn:before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
      transition: all 0.6s;
      z-index: -1;
    }
    
    .project-btn:hover:before {
      left: 100%;
    }
    
    .project-github-btn:hover {
      background: #000 !important;
      transform: translateY(-2px) scale(1.02);
    }
    
    .project-demo-btn:hover {
      box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.3) !important;
      transform: translateY(-2px) scale(1.02);
    }
    
    .project-btn i {
      transition: transform 0.3s ease;
    }
    
    .project-btn:active {
      transform: scale(0.95) !important;
    }
    
    /* Card shine effect - improved for light mode */
    .card-shine {
      border-radius: 1rem;
      transition: opacity 0.5s;
    }
    
    /* Better card border in light mode */
    .group {
      box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }
    
    .group:hover {
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
    }
    
    /* Light mode specific styles */
    html:not(.dark) .group {
      border-color: rgba(226, 232, 240, 0.8);
    }
    
    html:not(.dark) .group:hover {
      border-color: rgba(196, 224, 252, 0.8);
    }

    /* Enhanced dropdown styles for light & dark mode */
    select {
      appearance: none;
      background-position: right 0.5rem center;
      background-repeat: no-repeat;
      background-size: 1.5em 1.5em;
      padding-right: 2.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    /* Light mode dropdown fixes */
    html:not(.dark) select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      color: #374151;
      border-color: #e2e8f0;
    }
    
    html:not(.dark) select:hover {
      border-color: #93c5fd;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    html:not(.dark) select:focus {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      outline: none;
    }
    
    /* Dark mode dropdown fixes */
    html.dark select {
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23e2e8f0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e");
      color: #e2e8f0;
      border-color: #374151;
    }
    
    html.dark select:hover {
      border-color: #3b82f6;
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
    }
    
    html.dark select:focus {
      border-color: #3b82f6; 
      box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
      outline: none;
    }
  `;
  document.head.appendChild(style);
  
  // Fix any existing project buttons
  enhanceExistingCards();
  
  // Immediately enhance any initially rendered cards
  enhanceExistingCards();
  
  // Setup a mutation observer to detect dynamically added cards
  setupCardObserver();

  // Set up intersection observer for profile section
  setupProfileObserver();
  
  // Set up observers for profile section
  setupProfileObserver();
  setupProfileMutationObserver();

  // Adjust page layout for better spacing
  adjustLayoutSpacing();

  // Initialize responsive layout controls
  setupResponsiveControls();
  
  // Initialize all card interactivity
  setTimeout(() => {
    enhanceExistingCards();
    addHoverPolyfill();
  }, 200);
});

// New function to adjust page layout for better spacing
function adjustLayoutSpacing() {
  // Get the viewport width
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  
  // Adjust container width based on viewport
  const container = document.querySelector('.container');
  if (container) {
    if (viewportWidth >= 1536) {
      // Extra large screens
      container.style.maxWidth = '1280px';
    } else if (viewportWidth >= 1280) {
      // Large screens
      container.style.maxWidth = '80%';
    } else if (viewportWidth >= 1024) {
      // Medium-large screens (laptops)
      container.style.maxWidth = '90%';
    }
  }
  
  // Apply additional spacing to cards on larger screens
  if (viewportWidth >= 1024) {
    const projectCards = document.querySelectorAll('.group');
    projectCards.forEach(card => {
      card.style.margin = '0 auto';
    });
  }
}

// Listen for window resize to adjust spacing
window.addEventListener('resize', debounce(() => {
  adjustLayoutSpacing();
}, 250));

// New function to enhance existing cards - improved with error handling
function enhanceExistingCards() {
  try {
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
      // Skip cards that are already enhanced
      if (card.dataset.enhanced === 'true') {
        return;
      }
      
      // Add interaction effects to all cards
      addCardInteractionEffects(card);
    });
  } catch (error) {
    console.log('Error enhancing cards:', error);
  }
}

// New function to observe DOM changes and enhance new cards
function setupCardObserver() {
  // Only proceed if the browser supports MutationObserver
  if (!('MutationObserver' in window)) return;
  
  const observer = new MutationObserver((mutations) => {
    let needsEnhancement = false;
    
    mutations.forEach(mutation => {
      if (mutation.addedNodes.length) {
        mutation.addedNodes.forEach(node => {
          if (node.classList && node.classList.contains('group')) {
            needsEnhancement = true;
          }
        });
      }
    });
    
    if (needsEnhancement) {
      enhanceExistingCards();
    }
  });
  
  // Start observing the container for added cards
  const container = document.getElementById('projectContainer');
  if (container) {
    observer.observe(container, { 
      childList: true, 
      subtree: true 
    });
  }
}

// Add new function to fix dropdowns
function fixDropdowns() {
  const selects = document.querySelectorAll('select');
  selects.forEach(select => {
    // Fix visual appearance
    select.classList.add('dropdown-fixed');
    
    // Update dropdown arrow on theme change
    const updateDropdownArrow = () => {
      const isDarkMode = document.documentElement.classList.contains('dark');
      if (isDarkMode) {
        select.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23e2e8f0' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;
      } else {
        select.style.backgroundImage = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`;
      }
    };
    
    updateDropdownArrow();
    
    // Add hover effect
    select.addEventListener('mouseenter', () => {
      select.style.borderColor = document.documentElement.classList.contains('dark') ? '#3b82f6' : '#93c5fd';
      select.style.boxShadow = '0 0 0 3px rgba(59, 130, 246, 0.1)';
    });
    
    select.addEventListener('mouseleave', () => {
      if (document.activeElement !== select) {
        select.style.borderColor = document.documentElement.classList.contains('dark') ? '#374151' : '#e2e8f0';
        select.style.boxShadow = '';
      }
    });
    
    // Update on theme toggle
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', updateDropdownArrow);
    }
  });
  
  // Listen for theme changes from system preference
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    setTimeout(fixDropdowns, 100);
  });
}

// Add new function to observe if profile is visible
function setupProfileObserver() {
  // Check if profile section exists
  const profileSection = document.querySelector('.container > div:first-child');
  if (!profileSection) return;
  
  // Create IntersectionObserver to monitor profile section visibility
  const profileObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      // When profile section comes into view
      if (entry.isIntersecting) {
        // Check if profile data needs to be restored
        checkAndRestoreProfileData();
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -20% 0px'
  });
  
  // Start observing profile section
  profileObserver.observe(profileSection);
  
  // Also attach scroll event to ensure profile data is always available
  window.addEventListener('scroll', debounce(() => {
    checkAndRestoreProfileData();
  }, 100));
}

// Function to check if profile data is missing and restore it
function checkAndRestoreProfileData() {
  const profileName = document.getElementById('profileName');
  const profileImage = document.getElementById('profileImage');
  
  // Check if profile data is missing
  if (!profileName.textContent || !profileImage.src.includes(profile.image)) {
    console.log('Profile data missing, restoring...');
    displayProfile(); // Re-display profile data
  }
  
  // Also check if expanded content is correct
  const expanded = document.getElementById('profileExpanded');
  const isExpanded = localStorage.getItem('profileExpanded') === 'true';
  
  if (isExpanded && expanded.style.height === '0px') {
    expanded.style.height = `${expanded.scrollHeight}px`;
    document.getElementById('toggleIcon').style.transform = 'rotate(180deg)';
    document.getElementById('toggleText').textContent = 'See Less';
  }
}

// Helper function to watch for DOM changes that might affect profile
function setupProfileMutationObserver() {
  // Only proceed if MutationObserver is supported
  if (!window.MutationObserver) return;
  
  const profileSection = document.querySelector('.container > div:first-child');
  if (!profileSection) return;
  
  const observer = new MutationObserver((mutations) => {
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' || mutation.type === 'attributes') {
        // Check if profile data is intact
        checkAndRestoreProfileData();
      }
    });
  });
  
  observer.observe(profileSection, { 
    childList: true,
    subtree: true,
    attributes: true
  });
}

// New function to manage responsive behavior
function setupResponsiveControls() {
  // Add special xs breakpoint for better mobile support
  if (window.innerWidth <= 480) {
    document.documentElement.classList.add('xs');
  } else {
    document.documentElement.classList.remove('xs');
  }
  
  // Listen for resize events to update xs class
  window.addEventListener('resize', debounce(() => {
    if (window.innerWidth <= 480) {
      document.documentElement.classList.add('xs');
    } else {
      document.documentElement.classList.remove('xs');
    }
    
    // Adjust button text for small screens
    adjustButtonsForScreenSize();
    
    // Update layout spacing
    adjustLayoutSpacing();
  }, 250));
  
  // Initial button text adjustment
  adjustButtonsForScreenSize();
}

// Helper function to adjust button text based on screen size
function adjustButtonsForScreenSize() {
  const isSmall = window.innerWidth <= 480;
  
  document.querySelectorAll('.project-github-btn span:last-child').forEach(span => {
    span.textContent = isSmall ? 'Code' : 'Source Code';
  });
  
  document.querySelectorAll('.project-demo-btn span:last-child').forEach(span => {
    span.textContent = isSmall ? 'Demo' : 'Live Demo';
  });
}

// New function to add more sophisticated card interaction effects
function addCardInteractionEffects(card) {
  // Prevent duplicate event handlers by adding a data attribute
  if (card.dataset.enhanced === 'true') {
    return;
  }
  
  // Button hover effects
  const projectBtns = card.querySelectorAll('.project-btn');
  projectBtns.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('span span');
      if (icon) {
        icon.style.transform = 'scale(1.2)';
      }
      if (text) {
        text.style.fontWeight = '600';
      }
    });
    
    btn.addEventListener('mouseleave', function() {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('span span');
      if (icon) {
        icon.style.transform = '';
      }
      if (text) {
        text.style.fontWeight = '';
      }
    });
  });
  
  // Make sure the card shine effect is properly initialized
  initCardShineEffect(card);
  
  // Mark card as enhanced
  card.dataset.enhanced = 'true';
}

// Separate function to initialize card shine effect
function initCardShineEffect(card) {
  // Make sure the card has a shine element
  const contentDiv = card.querySelector('div:nth-child(2)');
  if (contentDiv && !contentDiv.querySelector('.card-shine')) {
    const shine = document.createElement('div');
    shine.className = 'card-shine absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-700';
    contentDiv.prepend(shine);
  }
  
  // Add the mousemove event listener to handle the shine effect
  card.addEventListener('mousemove', handleCardShineEffect);
  
  // Add mouseleave to reset shine
  card.addEventListener('mouseleave', resetCardShine);
}

// Separate the card shine effect into its own function
function handleCardShineEffect(e) {
  try {
    const card = this;
    const shine = card.querySelector('.card-shine');
    if (shine) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const isDarkMode = document.documentElement.classList.contains('dark');
      shine.style.opacity = "1";
      if (isDarkMode) {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 50%)`;
      } else {
        shine.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(59,130,246,0.15) 0%, rgba(255,255,255,0) 50%)`;
      }
    }
  } catch (error) {
    console.log('Error in card shine effect:', error);
  }
}

// Add function to reset card shine on mouse leave
function resetCardShine() {
  try {
    const card = this;
    const shine = card.querySelector('.card-shine');
    if (shine) {
      shine.style.opacity = "0";
    }
  } catch (error) {
    console.log('Error resetting card shine:', error);
  }
}

// Add hover polyfill for touch devices
function addHoverPolyfill() {
  // Check if it's a touch device
  const isTouchDevice = 'ontouchstart' in window || 
                       navigator.maxTouchPoints > 0 || 
                       navigator.msMaxTouchPoints > 0;
  
  if (isTouchDevice) {
    const cards = document.querySelectorAll('.group');
    cards.forEach(card => {
      // Add touch event to simulate hover on touch devices
      card.addEventListener('touchstart', function(e) {
        e.preventDefault();
        if (this.classList.contains('hover')) {
          this.classList.remove('hover');
        } else {
          const hoverElements = document.querySelectorAll('.hover');
          hoverElements.forEach(el => el.classList.remove('hover'));
          this.classList.add('hover');
        }
      }, {passive: false});
    });
    
    // Remove hover class when touching elsewhere
    document.addEventListener('touchstart', function(e) {
      if (!e.target.closest('.group')) {
        const hoverElements = document.querySelectorAll('.hover');
        hoverElements.forEach(el => el.classList.remove('hover'));
      }
    });
  }
}
