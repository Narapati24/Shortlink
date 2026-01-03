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
  renderContact();
  renderFooter();
  setupSmoothNavigation();
});

function setupSmoothNavigation() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      
      if (targetId === '#' || targetId === '#top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Calculate offset to account for fixed navbar (approx 100px)
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initializeFilters() {
  const typeContainer = document.getElementById('type-filter-container');
  const yearContainer = document.getElementById('year-filter-container');

  if (!typeContainer || !yearContainer) return;

  // Get unique types and years
  const types = ['all', ...[...new Set(projects.flatMap(p => Array.isArray(p.type) ? p.type : [p.type]))].sort()];
  const years = ['all', ...[...new Set(projects.map(p => p.year))].sort((a, b) => b - a)];

  // Helper to create filter button
  const createButton = (value, label, isActive, onClick) => {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.className = `whitespace-nowrap px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 border border-white/5 ${
      isActive 
      ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20' 
      : 'bg-white/5 text-midnight-300 hover:bg-white/10 hover:text-white'
    }`;
    btn.onclick = onClick;
    return btn;
  };

  // Render Type Filters
  const renderTypes = () => {
    typeContainer.innerHTML = '';
    types.forEach(type => {
      const isAll = type === 'all';
      const label = isAll ? 'All Categories' : type.charAt(0).toUpperCase() + type.slice(1);
      const isActive = currentFilterType === type;
      
      const btn = createButton(type, label, isActive, () => {
        currentFilterType = type;
        currentPage = 1;
        renderTypes(); // Re-render to update active state
        renderProjects();
      });
      typeContainer.appendChild(btn);
    });
  };

  // Render Year Filters
  const renderYears = () => {
    yearContainer.innerHTML = '';
    years.forEach(year => {
      const isAll = year === 'all';
      const label = isAll ? 'All Years' : year;
      const isActive = currentFilterYear === String(year);
      
      const btn = createButton(year, label, isActive, () => {
        currentFilterYear = String(year);
        currentPage = 1;
        renderYears(); // Re-render to update active state
        renderProjects();
      });
      yearContainer.appendChild(btn);
    });
  };

  renderTypes();
  renderYears();
}

function renderProfile() {
  const profileContainer = document.getElementById('profile-section');
  if (!profileContainer) return;

  // Clear skeleton if present (simple innerHTML replacement is fine as long as we had the skeleton initially)
  // For smoother transition, we could fade out skeleton, but replacement is standard for CSR after load.


  const skillsHtml = profile.skills.map(skill => `
    <span class="px-3 py-1 text-xs font-medium text-white/90 bg-white/5 rounded-full border border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors cursor-default">
      ${skill.name}
    </span>
  `).join('');

  profileContainer.innerHTML = `
    <div class="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto pt-8">
      <div class="relative group">
        <div class="absolute -inset-1 bg-gradient-to-r from-accent-400 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000 group-hover:duration-200"></div>
        <img 
          src="/img/profile/${profile.image}" 
          alt="${profile.name}" 
          class="relative w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-midnight-950 shadow-2xl"
          onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name)}&background=0f172a&color=22d3ee'"
        />
      </div>
      
      <div class="space-y-4 animate-fade-in delay-100">
        <h1 class="text-4xl md:text-6xl font-bold text-white tracking-tight leading-tight">
          Hello, I'm <br class="block md:hidden" />
          <span class="bg-clip-text text-transparent bg-accent-gradient">${profile.name}</span>
        </h1>
        <p class="text-xl md:text-2xl text-midnight-200 font-light tracking-wide">${profile.role}</p>
      </div>

      <p class="text-midnight-300 leading-relaxed max-w-2xl text-base md:text-lg animate-fade-in delay-200">
        ${profile.description}
      </p>

      <div class="flex flex-wrap justify-center gap-2 pt-4 animate-fade-in delay-300">
        ${skillsHtml}
      </div>

      <div class="flex gap-4 pt-6 animate-fade-in delay-500">
        <a href="${profile.social.github}" target="_blank" class="p-3 bg-white/5 rounded-full text-white hover:bg-accent-500/20 hover:text-accent-400 hover:scale-110 transition-all border border-white/10">
          <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
        </a>
        <a href="${profile.social.linkedin}" target="_blank" class="p-3 bg-white/5 rounded-full text-white hover:bg-accent-500/20 hover:text-accent-400 hover:scale-110 transition-all border border-white/10">
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
      <div class="group relative flex flex-col h-full bg-midnight-900/40 backdrop-blur-md border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:border-accent-500/20 hover:shadow-2xl hover:shadow-accent-500/5 transform-gpu will-change-transform">
        
        <!-- Image Section with Overlay -->
        <div class="aspect-[16/10] w-full overflow-hidden relative">
          <div class="absolute inset-0 bg-midnight-950/20 group-hover:bg-transparent transition-colors z-10"></div>
          <img 
            src="/img/background_project/${project.year}/${project.image}" 
            alt="${project.title}" 
            loading="lazy"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
            onerror="this.src='https://placehold.co/600x400/020617/1e293b?text=${encodeURIComponent(project.title)}'"
          />
          <!-- Year Badge - Unified Glass Style -->
          <div class="absolute top-4 right-4 z-20">
            <span class="px-3 py-1 text-[10px] font-bold tracking-widest text-white bg-black/40 backdrop-blur-md border border-white/10 rounded-full shadow-lg">
              ${project.year}
            </span>
          </div>
        </div>
        
        <!-- Content Section -->
        <div class="p-6 flex flex-col flex-grow relative">
          <!-- Type Badges -->
          <div class="mb-3 flex flex-wrap gap-2">
            ${(Array.isArray(project.type) ? project.type : [project.type]).map(t => `
             <span class="inline-flex items-center text-[10px] uppercase tracking-wider font-bold px-2 py-1 rounded text-accent-300 bg-accent-500/10 border border-accent-500/10">
               ${t}
             </span>
            `).join('')}
          </div>

          <!-- Title -->
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-accent-400 transition-colors line-clamp-1">
            ${project.title}
          </h3>
          
          <!-- Description -->
          <p class="text-midnight-400 text-sm mb-6 line-clamp-2 leading-relaxed flex-grow font-normal">
            ${project.desc}
          </p>
          
          <!-- Tech Stack - Minimal list -->
          <div class="flex flex-wrap gap-2 mb-6 border-t border-white/5 pt-4">
            ${project.stack.slice(0, 4).map(tech => `
              <span class="px-2 py-1 text-[10px] font-medium text-midnight-300 bg-white/5 rounded border border-white/5">
                ${tech}
              </span>
            `).join('')}
            ${project.stack.length > 4 ? `<span class="px-2 py-1 text-[10px] text-midnight-500">+${project.stack.length - 4}</span>` : ''}
          </div>

          <!-- Actions -->
          ${(() => {
            const hasUrl = project.url && project.url !== '#';
            const hasGithub = project.github && project.github !== '#';
            
            if (!hasUrl && !hasGithub) {
              return `
                <button disabled class="mt-auto w-full px-4 py-2 text-sm font-medium text-midnight-500 bg-white/5 rounded-lg cursor-not-allowed border border-white/5">
                  Internal Project
                </button>
              `;
            }

            return `
              <div class="mt-auto flex gap-3">
                ${hasUrl ? `
                  <a href="${project.url}" target="_blank" class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-white bg-accent-600 hover:bg-accent-500 rounded-lg transition-all shadow-lg shadow-accent-600/20 hover:shadow-accent-600/30 hover:-translate-y-0.5 group/btn">
                    <span class="flex items-center gap-2">
                       Live <svg class="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
                    </span>
                  </a>
                ` : ''}
                
                ${hasGithub ? `
                  <a href="${project.github}" target="_blank" class="flex-1 inline-flex items-center justify-center px-4 py-2 text-sm font-semibold text-midnight-200 bg-white/5 hover:bg-white/10 hover:text-white rounded-lg transition-all border border-white/5 hover:border-white/10 hover:-translate-y-0.5 group/git">
                    <span class="flex items-center gap-2">
                       Code <svg class="w-3.5 h-3.5 group-hover/git:rotate-12 transition-transform" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
                    </span>
                  </a>
                ` : ''}
              </div>
            `;
          })()}
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
  
  // Container wrapper
  paginationHtml += '<div class="flex items-center gap-2 p-1.5 bg-midnight-950/30 backdrop-blur-sm border border-white/5 rounded-2xl">';

  // Previous button
  paginationHtml += `
    <button 
      onclick="window.changePage(${currentPage - 1})"
      class="w-10 h-10 flex items-center justify-center rounded-xl bg-midnight-800 text-midnight-300 hover:bg-midnight-700 hover:text-white hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-midnight-800 transition-all duration-300 group"
      ${currentPage === 1 ? 'disabled' : ''}
      aria-label="Previous Page"
    >
      <svg class="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path></svg>
    </button>
  `;

  // Page numbers
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 || 
      i === totalPages || 
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      const isActive = i === currentPage;
      paginationHtml += `
        <button 
          onclick="window.changePage(${i})"
          class="w-10 h-10 flex items-center justify-center rounded-xl font-bold text-sm transition-all duration-300 ${isActive ? 'bg-accent-600 text-white shadow-lg shadow-accent-600/20 scale-105' : 'text-midnight-300 hover:bg-white/5 hover:text-white hover:scale-105'}"
        >
          ${i}
        </button>
      `;
    } else if (
      i === currentPage - 2 || 
      i === currentPage + 2
    ) {
      paginationHtml += `<span class="w-10 h-10 flex items-center justify-center text-midnight-600 font-bold">···</span>`;
    }
  }

  // Next button
  paginationHtml += `
    <button 
      onclick="window.changePage(${currentPage + 1})"
      class="w-10 h-10 flex items-center justify-center rounded-xl bg-midnight-800 text-midnight-300 hover:bg-midnight-700 hover:text-white hover:-translate-y-0.5 disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:bg-midnight-800 transition-all duration-300 group"
      ${currentPage === totalPages ? 'disabled' : ''}
       aria-label="Next Page"
    >
      <svg class="w-5 h-5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
    </button>
  `;
  
  paginationHtml += '</div>';

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
  currentFilterType = 'all';
  currentFilterYear = 'all';
  currentPage = 1;
  
  // Re-render filters to update active state
  initializeFilters();
  renderProjects();
};

function renderContact() {
  const contactContainer = document.getElementById('contact-section');
  if (!contactContainer) return;

  contactContainer.innerHTML = `
    <div class="relative bg-midnight-900/40 backdrop-blur-md border border-white/5 rounded-3xl p-8 md:p-12 overflow-hidden text-center max-w-4xl mx-auto">
      <!-- Background Glow -->
      <div class="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-accent-500/10 rounded-full blur-[100px]"></div>
      <div class="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-indigo-500/10 rounded-full blur-[100px]"></div>
      
      <div class="relative z-10 space-y-6">
        <div class="space-y-2">
           <h2 class="text-3xl md:text-4xl font-bold text-white">Let's Connect</h2>
           <p class="text-midnight-300 text-lg max-w-xl mx-auto">
             Interested in working together or have a question? Feel free to reach out. I'm always open to discussing new projects and opportunities.
           </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
          <!-- Email -->
          <a href="mailto:${profile.social.email}" class="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-accent-500/30 hover:bg-accent-500/5 transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-accent-500/10 flex items-center justify-center text-accent-400 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Email</h3>
            <p class="text-xs md:text-sm text-midnight-400 break-all">${profile.social.email}</p>
          </a>

          <!-- WhatsApp -->
          <a href="https://wa.me/${profile.social.whatsapp}" target="_blank" class="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-green-500/30 hover:bg-green-500/5 transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">WhatsApp</h3>
            <p class="text-sm text-midnight-400">Fast Response</p>
          </a>

          <!-- Company -->
          <a href="${profile.social.company}" target="_blank" class="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">Kodingin.id</h3>
            <p class="text-sm text-midnight-400">My Company</p>
          </a>

          <!-- LinkedIn -->
          <a href="${profile.social.linkedin}" target="_blank" class="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 transition-all duration-300 hover:-translate-y-1">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform duration-300">
               <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clip-rule="evenodd" /></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">LinkedIn</h3>
            <p class="text-sm text-midnight-400">Connect Professionally</p>
          </a>

          <!-- GitHub -->
          <a href="${profile.social.github}" target="_blank" class="group p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/10 transition-all duration-300 hover:-translate-y-1 md:col-span-2 lg:col-span-1">
            <div class="w-12 h-12 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300">
               <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd" /></svg>
            </div>
            <h3 class="text-lg font-bold text-white mb-1">GitHub</h3>
            <p class="text-sm text-midnight-400">View Repositories</p>
          </a>
        </div>
      </div>
    </div>
  `;
}

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
