// Add Dark Mode Toggle Function
function initTheme() {
  const themeToggle = document.getElementById('theme-toggle');
  
  // Check initial theme
  if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // Toggle theme
  themeToggle.addEventListener('click', () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
  });
}

// Initialize theme
initTheme();

// Display profile - Simplified
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

// Add pagination state
const ITEMS_PER_PAGE = 6;
let currentPage = 1;

// Display projects with pagination
function displayProjects(year = 'all', page = 1) {
  const container = document.getElementById('projectContainer');
  container.innerHTML = '';
  
  const filteredProjects = year === 'all' 
    ? [...projects].reverse() // Reverse the array to show newest projects first
    : projects.filter(project => project.year === year).reverse();

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  
  filteredProjects
    .slice(startIndex, endIndex)
    .forEach(project => {
      const card = document.createElement('div');
      card.className = 'group bg-white dark:bg-gray-800 rounded-3xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden transform hover:-translate-y-1';
      
      const buttonsHTML = `
        <div class="flex justify-between items-center gap-4">
          <div class="flex items-center gap-2 flex-wrap">
            <span class="px-4 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm font-medium">${project.year}</span>
            <span class="px-3 py-1 ${
              project.type === 'web' 
                ? 'bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' 
                : 'bg-purple-50 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
            } rounded-full text-xs font-medium">${
              project.type === 'web' ? 'Web' : 'Mobile'
            }</span>
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

      card.innerHTML = `
        <div class="relative h-60 overflow-hidden">
          <img src="src/img/background_project/${project.year + '/' + project.image}" 
               alt="${project.title}" 
               class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
          <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div class="p-8">
          <h2 class="text-xl font-bold mb-3 text-gray-800 dark:text-white">${project.title}</h2>
          <p class="text-gray-600 dark:text-gray-300 mb-6 text-sm leading-relaxed">${project.desc}</p>
          ${buttonsHTML}
        </div>
      `;
      container.appendChild(card);
    });

  // Display pagination controls
  displayPagination(totalPages, page, year);
}

// Add pagination controls
function displayPagination(totalPages, currentPage, year) {
  // Remove existing pagination if any
  const existingPagination = document.getElementById('paginationContainer');
  if (existingPagination) {
    existingPagination.remove();
  }

  const paginationContainer = document.createElement('div');
  paginationContainer.id = 'paginationContainer'; // Add ID for easy removal
  paginationContainer.className = 'flex justify-center gap-3 mt-12 mb-6';
  
  for (let i = 1; i <= totalPages; i++) {
    const pageBtn = document.createElement('button');
    pageBtn.className = `px-5 py-2.5 rounded-xl transition-all duration-300 ${
      currentPage === i 
        ? 'bg-gradient-to-r from-blue-500 to-indigo-500 dark:from-blue-600 dark:to-indigo-600 text-white shadow-lg scale-110' 
        : 'bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700/80 hover:scale-105 shadow-md border border-gray-100 dark:border-gray-700'
    }`;
    pageBtn.textContent = i;
    pageBtn.onclick = () => displayProjects(year, i);
    paginationContainer.appendChild(pageBtn);
  }
  
  document.getElementById('projectContainer').after(paginationContainer);
}

// Initial display
displayProjects('all', 1);

// Filter handler
yearFilter.addEventListener('change', (e) => {
  currentPage = 1; // Reset to first page on filter change
  displayProjects(e.target.value, currentPage);
});
