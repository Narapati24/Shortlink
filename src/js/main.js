import { profile, projects } from './array.js';

// State management
let currentPage = 1;
const itemsPerPage = 6;
let currentFilterType = 'all';
let currentFilterYear = 'all';

document.addEventListener('DOMContentLoaded', () => {
  renderProfile();
  initializeFilters();
  renderProjects();
  renderFooter();
});

function initializeFilters() {
  const typeSelect = document.getElementById('filter-type');
  const yearSelect = document.getElementById('filter-year');

  // Get unique types and years
  const types = [...new Set(projects.flatMap(p => Array.isArray(p.type) ? p.type : [p.type]))].sort();
  const years = [...new Set(projects.map(p => p.year))].sort((a, b) => b - a);

  // Populate type filter
  types.forEach(type => {
    const option = document.createElement('option');
    option.value = type;
    option.textContent = type.charAt(0).toUpperCase() + type.slice(1);
    typeSelect.appendChild(option);
  });

  // Populate year filter
  years.forEach(year => {
    const option = document.createElement('option');
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  });

  // Add event listeners
  typeSelect.addEventListener('change', (e) => {
    currentFilterType = e.target.value;
    currentPage = 1; // Reset to first page on filter change
    renderProjects();
  });

  yearSelect.addEventListener('change', (e) => {
    currentFilterYear = e.target.value;
    currentPage = 1; // Reset to first page on filter change
    renderProjects();
  });
}

function renderProfile() {
  const profileContainer = document.getElementById('profile-section');
  if (!profileContainer) return;

  const skillsHtml = profile.skills.map(skill => `
    <span class="px-3 py-1 text-xs font-medium text-midnight-100 bg-midnight-800/50 rounded-full border border-midnight-700/50 backdrop-blur-sm">
      ${skill.name}
    </span>
  `).join('');

  profileContainer.innerHTML = `
    <div class="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-midnight-400 to-midnight-600 rounded-full blur opacity-25 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <img 
          src="/img/profile/${profile.image}" 
          alt="${profile.name}" 
          class="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-midnight-800 shadow-2xl"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0f172a&color=fff'"
        />
      </div>
      
      <div class="space-y-2">
        <h1 class="text-3xl md:text-4xl font-bold text-white tracking-tight">${profile.name}</h1>
        <p class="text-midnight-300 font-medium text-lg">${profile.role}</p>
      </div>

      <p class="text-midnight-200 leading-relaxed max-w-2xl text-sm md:text-base">
        ${profile.description}
      </p>

      <div class="flex flex-wrap justify-center gap-2 pt-2">
        ${skillsHtml}
      </div>

      <div class="flex gap-4 pt-4">
        <a href="${profile.social.github}" target="_blank" class="p-2 text-midnight-300 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
        </a>
        <a href="${profile.social.linkedin}" target="_blank" class="p-2 text-midnight-300 hover:text-white transition-colors">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>
        </a>
      </div>
    </div>
  `;
}

function renderProjects() {
  const projectsContainer = document.getElementById('projects-grid');
  const paginationContainer = document.getElementById('pagination-controls');
  if (!projectsContainer || !paginationContainer) return;

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const typeMatch = currentFilterType === 'all' || 
      (Array.isArray(project.type) ? project.type.includes(currentFilterType) : project.type === currentFilterType);
    const yearMatch = currentFilterYear === 'all' || project.year === currentFilterYear;
    return typeMatch && yearMatch;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, endIndex);

  // Render projects
  if (currentProjects.length === 0) {
    projectsContainer.innerHTML = `
      <div class="col-span-full text-center py-12 text-midnight-300">
        <p class="text-lg">No projects found matching your criteria.</p>
      </div>
    `;
  } else {
    projectsContainer.innerHTML = currentProjects.map(project => `
      <div class="group relative bg-midnight-900/50 border border-midnight-800 rounded-xl overflow-hidden hover:border-midnight-600 transition-all duration-300 hover:shadow-xl hover:shadow-midnight-900/20 flex flex-col h-full animate-fade-in">
        <div class="aspect-video w-full overflow-hidden bg-midnight-950 relative">
          <img 
            src="/img/background_project/${project.year}/${project.image}" 
            alt="${project.title}" 
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
            onerror="this.src='https://placehold.co/600x400/1e293b/cbd5e1?text=${encodeURIComponent(project.title)}'"
          />
          <div class="absolute top-2 right-2">
            <span class="px-2 py-1 text-xs font-bold bg-midnight-950/80 text-midnight-200 rounded backdrop-blur-sm border border-midnight-800">
              ${project.year}
            </span>
          </div>
        </div>
        
        <div class="p-5 flex flex-col flex-grow">
          <div class="flex justify-between items-start mb-2">
            <h3 class="text-lg font-bold text-white group-hover:text-midnight-300 transition-colors line-clamp-1">
              ${project.title}
            </h3>
            <span class="text-xs px-2 py-0.5 rounded bg-midnight-800 text-midnight-300 border border-midnight-700">
              ${Array.isArray(project.type) ? project.type[0] : project.type}
            </span>
          </div>
          
          <p class="text-midnight-300 text-sm mb-4 line-clamp-2 flex-grow">
            ${project.desc}
          </p>
          
          <div class="flex flex-wrap gap-2 mb-4">
            ${project.stack.map(tech => `
              <span class="px-2 py-1 text-xs font-medium text-midnight-200 bg-midnight-800/50 rounded-md border border-midnight-700/50">
                ${tech}
              </span>
            `).join('')}
          </div>

          ${project.url ? `
            <a href="${project.url}" target="_blank" class="mt-auto inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-white bg-midnight-600 hover:bg-midnight-500 rounded-lg transition-colors">
              Visit Project
              <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
            </a>
          ` : `
            <button disabled class="mt-auto inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium text-midnight-500 bg-midnight-900/50 rounded-lg cursor-not-allowed border border-midnight-800">
              Private / Internal
            </button>
          `}
        </div>
      </div>
    `).join('');
  }

  // Render pagination controls
  renderPagination(totalPages, paginationContainer);
}

function renderPagination(totalPages, container) {
  if (totalPages <= 1) {
    container.innerHTML = '';
    return;
  }

  let paginationHtml = '';

  // Previous button
  paginationHtml += `
    <button 
      onclick="window.changePage(${currentPage - 1})"
      class="px-3 py-1 rounded-lg border border-midnight-800 bg-midnight-900 text-midnight-300 hover:bg-midnight-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      ${currentPage === 1 ? 'disabled' : ''}
    >
      &larr;
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationHtml += `
        <button 
          onclick="window.changePage(${i})"
          class="px-3 py-1 rounded-lg border ${i === currentPage ? 'border-midnight-500 bg-midnight-600 text-white' : 'border-midnight-800 bg-midnight-900 text-midnight-300 hover:bg-midnight-800 hover:text-white'} transition-colors"
        >
          ${i}
        </button>
      `;
    } else if (
      i === currentPage - 2 || 
      i === currentPage + 2
    ) {
      paginationHtml += `<span class="text-midnight-500">...</span>`;
    }
  }

  // Next button
  paginationHtml += `
    <button 
      onclick="window.changePage(${currentPage + 1})"
      class="px-3 py-1 rounded-lg border border-midnight-800 bg-midnight-900 text-midnight-300 hover:bg-midnight-800 hover:text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      ${currentPage === totalPages ? 'disabled' : ''}
    >
      &rarr;
    </button>
  `;

  container.innerHTML = paginationHtml;
}

// Expose changePage to window for onclick events
window.changePage = (page) => {
  currentPage = page;
  renderProjects();
  // Scroll to top of projects section
  document.getElementById('projects-section').scrollIntoView({ behavior: 'smooth' });
};

// Expose resetFilters to window
window.resetFilters = () => {
  const typeSelect = document.getElementById('filter-type');
  const yearSelect = document.getElementById('filter-year');
  
  if (typeSelect) typeSelect.value = 'all';
  if (yearSelect) yearSelect.value = 'all';
  
  currentFilterType = 'all';
  currentFilterYear = 'all';
  currentPage = 1;
  
  renderProjects();
};

function renderFooter() {
  const footerContainer = document.getElementById('footer-content');
  if (!footerContainer) return;

  const currentYear = new Date().getFullYear();
  
  footerContainer.innerHTML = `
    <div class="flex flex-col items-center space-y-4">
      <div class="flex items-center space-x-2 text-midnight-300 font-medium">
        <span>&copy; ${currentYear}</span>
        <span class="text-midnight-500">&bull;</span>
        <a href="https://kodingin.id" target="_blank" class="text-white hover:text-midnight-300 transition-colors">Kodingin.id</a>
      </div>
      
      <!-- Visitor Counter -->
      <div class="flex justify-center p-2 bg-white/5 rounded-lg backdrop-blur-sm border border-white/5">
        <img
          src="https://api.visitorbadge.io/api/visitors?path=narapatis.my.id&label=Visitors&countColor=%23263759"
          alt="Visitor Count"
          class="opacity-75 hover:opacity-100 transition-opacity h-5"
          loading="lazy"
        />
      </div>
    </div>
  `;
}
