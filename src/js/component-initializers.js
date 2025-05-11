// Initialization functions for components

// Initialize theme toggle functionality
function initializeThemeToggle() {
  // Check if element exists before operating on it
  if (!document.getElementById('theme-toggle')) return;
  
  // Set theme based on stored preference or system preference
  applyTheme();
  
  // Set up listener
  document.getElementById('theme-toggle').addEventListener('click', () => {
    const html = document.documentElement;
    const isDark = html.classList.toggle('dark');
    localStorage.theme = isDark ? 'dark' : 'light';
    updateThemeIcons(isDark);
    
    // Update accessibility attributes
    document.getElementById('theme-toggle').setAttribute('aria-pressed', isDark);
    const modeLabel = document.querySelector('#theme-toggle .mode-label');
    if (modeLabel) {
      modeLabel.textContent = isDark ? 'light' : 'dark';
    }
  });
}

// Apply theme based on stored preference or system preference
function applyTheme() {
  const html = document.documentElement;
  
  if (
    localStorage.theme === 'dark' ||
    (!localStorage.theme &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    html.classList.add('dark');
    updateThemeIcons(true);
    document.getElementById('theme-toggle').setAttribute('aria-pressed', true);
  } else {
    html.classList.remove('dark');
    updateThemeIcons(false);
    document.getElementById('theme-toggle').setAttribute('aria-pressed', false);
  }
}

// Update theme icons based on current theme
function updateThemeIcons(isDark) {
  const sunIcon = document.querySelector('#theme-toggle svg:first-child');
  const moonIcon = document.querySelector('#theme-toggle svg:last-of-type');
  
  if (!sunIcon || !moonIcon) return;
  
  const modeLabel = document.querySelector('#theme-toggle .mode-label');
  if (modeLabel) {
    modeLabel.textContent = isDark ? 'light' : 'dark';
  }
}

// Initialize profile section
function initializeProfile() {
  if (!profile) return;
  
  // Set profile information
  document.getElementById('profileName').textContent = profile.name;
  document.getElementById('profileRole').textContent = profile.role;
  document.getElementById('profileDesc').textContent = profile.description;
  
  // Set profile image
  const profileImage = document.getElementById('profileImage');
  profileImage.src = `src/img/profile/${profile.image}`;
  profileImage.alt = `${profile.name}'s profile picture`;
  
  // Add social links
  const socialLinks = document.getElementById('socialLinks');
  if (socialLinks && profile.social) {
    if (profile.social.github) {
      socialLinks.innerHTML += `
        <a href="${profile.social.github}" target="_blank" rel="noopener" aria-label="GitHub Profile" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all">
          <i class="fab fa-github text-2xl"></i>
        </a>
      `;
    }
    
    if (profile.social.linkedin) {
      socialLinks.innerHTML += `
        <a href="${profile.social.linkedin}" target="_blank" rel="noopener" aria-label="LinkedIn Profile" class="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400 transition-all">
          <i class="fab fa-linkedin text-2xl"></i>
        </a>
      `;
    }
  }
  
  // Add skills
  const skillsList = document.getElementById('skillsList');
  if (skillsList && profile.skills) {
    profile.skills.forEach(skill => {
      skillsList.innerHTML += `
        <span class="px-3 py-1 bg-blue-100/80 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium">
          ${skill.name}
        </span>
      `;
    });
  }
  
  // Profile toggle functionality
  const profileToggle = document.getElementById('profileToggle');
  const profileExpanded = document.getElementById('profileExpanded');
  const toggleText = document.getElementById('toggleText');
  const toggleIcon = document.getElementById('toggleIcon');
  
  if (profileToggle && profileExpanded) {
    profileToggle.addEventListener('click', () => {
      const isExpanded = profileToggle.getAttribute('aria-expanded') === 'true';
      
      if (isExpanded) {
        profileExpanded.style.height = '0';
        toggleText.textContent = 'See More';
        toggleIcon.style.transform = 'rotate(0deg)';
        profileToggle.setAttribute('aria-expanded', 'false');
      } else {
        profileExpanded.style.height = '300px'; // Adjust height as needed
        toggleText.textContent = 'See Less';
        toggleIcon.style.transform = 'rotate(180deg)';
        profileToggle.setAttribute('aria-expanded', 'true');
      }
    });
  }
}

// Initialize projects section
function initializeProjects() {
  if (!projects || !projects.length) return;
  
  // Set up project container
  const projectContainer = document.getElementById('projectContainer');
  if (!projectContainer) return;
  
  // Clear loading skeletons
  projectContainer.innerHTML = '';
  
  // Filter options
  const yearFilter = document.getElementById('yearFilter');
  const typeFilter = document.getElementById('typeFilter');
  
  // Add filter options
  if (yearFilter) {
    const years = [...new Set(projects.map(project => project.year))].sort().reverse();
    years.forEach(year => {
      yearFilter.innerHTML += `<option value="${year}">${year}</option>`;
    });
  }
  
  if (typeFilter) {
    const types = [...new Set(projects.map(project => project.type))].sort();
    types.forEach(type => {
      typeFilter.innerHTML += `<option value="${type}">${type.charAt(0).toUpperCase() + type.slice(1)}</option>`;
    });
  }
  
  // Initial projects display
  displayProjects(projects);
  
  // Add event listeners for filters
  if (yearFilter) {
    yearFilter.addEventListener('change', filterProjects);
  }
  
  if (typeFilter) {
    typeFilter.addEventListener('change', filterProjects);
  }
  
  function filterProjects() {
    const yearValue = yearFilter ? yearFilter.value : 'all';
    const typeValue = typeFilter ? typeFilter.value : 'all';
    
    let filteredProjects = projects;
    
    if (yearValue !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.year.toString() === yearValue);
    }
    
    if (typeValue !== 'all') {
      filteredProjects = filteredProjects.filter(project => project.type === typeValue);
    }
    
    displayProjects(filteredProjects);
  }
  
  function displayProjects(projectsList) {
    projectContainer.innerHTML = '';
    
    if (!projectsList.length) {
      projectContainer.innerHTML = `
        <div class="col-span-full py-16 text-center">
          <p class="text-gray-600 dark:text-gray-400 text-lg">No projects found matching your filters.</p>
          <button class="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors" 
                  onclick="resetFilters()">
            Reset Filters
          </button>
        </div>
      `;
      return;
    }
    
    projectsList.forEach(project => {
      const card = createProjectCard(project);
      projectContainer.innerHTML += card;
    });
  }
  
  function createProjectCard(project) {
    // Get image path
    const imgPath = `src/img/background_project/${project.year}/${project.image}`;
    
    // Create tags HTML
    const tagsHTML = project.tags && project.tags.length
      ? project.tags.map(tag => 
          `<span class="px-2 py-1 bg-blue-100/80 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-300 text-xs font-medium">${tag}</span>`
        ).join('')
      : '';
    
    // Create links HTML
    const linksHTML = [];
    
    if (project.github) {
      linksHTML.push(`
        <a href="${project.github}" target="_blank" rel="noopener" class="px-3 py-1 bg-gray-800 dark:bg-gray-700 hover:bg-black dark:hover:bg-gray-800 text-white rounded-lg flex items-center gap-2 text-sm transition-colors" aria-label="GitHub Repository">
          <i class="fab fa-github"></i>
          <span>GitHub</span>
        </a>
      `);
    }
    
    if (project.demo) {
      linksHTML.push(`
        <a href="${project.demo}" target="_blank" rel="noopener" class="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 text-sm transition-colors" aria-label="Live Demo">
          <i class="fas fa-external-link-alt"></i>
          <span>Demo</span>
        </a>
      `);
    }
    
    // Create the card HTML
    return `
      <div class="group relative bg-white/80 dark:bg-gray-800/80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-white/50 dark:border-gray-700/50 hover:border-blue-200/30 dark:hover:border-blue-700/30 flex flex-col h-full backdrop-blur-sm">
        <!-- Project Image -->
        <div class="relative h-44 sm:h-48 overflow-hidden">
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent z-10"></div>
          <img 
            src="${imgPath}" 
            alt="${project.title}" 
            class="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
            loading="lazy" 
            onerror="this.onerror=null;this.src='src/img/placeholder.jpg';"
          />
          <div class="absolute bottom-0 left-0 w-full p-3 z-20">
            <div class="flex flex-wrap gap-1.5">
              ${tagsHTML}
            </div>
          </div>
        </div>
        
        <!-- Project Content -->
        <div class="p-4 flex-grow flex flex-col">
          <h2 class="text-lg font-bold text-gray-800 dark:text-white mb-2">${project.title}</h2>
          <p class="text-gray-600 dark:text-gray-300 text-sm flex-grow">${project.description}</p>
          
          <!-- Project Links -->
          <div class="mt-4 pt-4 border-t border-gray-100 dark:border-gray-700/70 flex flex-wrap items-center justify-between gap-3">
            <span class="text-xs text-gray-500 dark:text-gray-400 font-medium">
              <i class="far fa-calendar-alt mr-1"></i> ${project.year}
            </span>
            <div class="flex gap-2">
              ${linksHTML.join('')}
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

// Function to reset filters (used in project section)
function resetFilters() {
  if (document.getElementById('yearFilter')) {
    document.getElementById('yearFilter').value = 'all';
  }
  
  if (document.getElementById('typeFilter')) {
    document.getElementById('typeFilter').value = 'all';
  }
  
  initializeProjects();
}
