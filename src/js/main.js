import { profile, projects, experiences } from "./array.js";

const ITEMS_PER_PAGE = 6;

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "mobile", label: "Mobile" },
  { id: "web", label: "Web" },
  { id: "game", label: "Game" },
  { id: "software", label: "Software" },
];

const SOCIAL_META = {
  github: {
    label: "GitHub",
    href: (v) => v,
    icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clip-rule="evenodd"/></svg>`,
  },
  linkedin: {
    label: "LinkedIn",
    href: (v) => v,
    icon: `<svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>`,
  },
  email: {
    label: "Email",
    href: (v) => `mailto:${v}`,
    icon: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>`,
  },
  whatsapp: {
    label: "WhatsApp",
    href: (v) => `https://wa.me/${v}`,
    icon: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg>`,
  },
  company: {
    label: "Kodingin.id",
    href: (v) => v,
    icon: `<svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/></svg>`,
  },
};

const EXP_CATEGORIES = [
  { id: "all", label: "All" },
  { id: "work", label: "Work" },
  { id: "community", label: "Community" },
  { id: "academic", label: "Academic" },
];

let activeCategory = "all";
let activeYear = "all";
let activeExpCategory = "all";
let searchQuery = "";
let currentPage = 1;

function normalizeTypes(type) {
  return Array.isArray(type) ? type : [type];
}

function escapeHtml(str = "") {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function renderProfile() {
  const imgEl = document.getElementById("profile-image");
  const nameEl = document.getElementById("profile-name");
  const roleEl = document.getElementById("profile-role");
  const descEl = document.getElementById("profile-desc");
  const socialEl = document.getElementById("social-links");
  const skillsEl = document.getElementById("skills-list");

  if (imgEl) imgEl.src = `./img/profile/${profile.image}`;
  if (nameEl) nameEl.textContent = profile.name;
  if (roleEl) roleEl.textContent = profile.role;
  if (descEl) descEl.textContent = profile.description;

  if (socialEl) {
    socialEl.innerHTML = Object.entries(profile.social)
      .filter(([key, val]) => val && SOCIAL_META[key])
      .map(([key, val]) => {
        const meta = SOCIAL_META[key];
        const isExternal = key !== "email";
        return `
          <a
            href="${escapeHtml(meta.href(val))}"
            ${isExternal ? 'target="_blank" rel="noopener noreferrer"' : ""}
            class="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-xl border border-slate-800 bg-[#131C31] text-slate-200 hover:border-violet-500/60 hover:text-violet-200 transition-colors"
          >
            ${meta.icon}
            <span>${meta.label}</span>
          </a>
        `;
      })
      .join("");
  }

  if (skillsEl) {
    skillsEl.innerHTML = profile.skills
      .map(
        (skill) => `
        <span class="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#131C31] text-slate-300 border border-slate-800">
          ${escapeHtml(skill.name)}
        </span>
      `
      )
      .join("");
  }
}

function renderYearFilter() {
  const yearEl = document.getElementById("year-filter");
  if (!yearEl) return;

  const years = [...new Set(projects.map((p) => p.year))].sort((a, b) => b - a);
  yearEl.innerHTML = [
    `<option value="all">All Years</option>`,
    ...years.map(
      (y) => `<option value="${escapeHtml(y)}">${escapeHtml(y)}</option>`
    ),
  ].join("");
  yearEl.value = activeYear;
}

function getCategoryCount(catId) {
  return projects.filter((p) => {
    const matchesYear = activeYear === "all" || p.year === activeYear;
    const matchesCat =
      catId === "all" || normalizeTypes(p.type).includes(catId);
    return matchesYear && matchesCat;
  }).length;
}

function renderFilterTabs() {
  const tabsEl = document.getElementById("filter-tabs");
  if (!tabsEl) return;

  tabsEl.innerHTML = CATEGORIES.map((cat) => {
    const count = getCategoryCount(cat.id);
    const isActive = activeCategory === cat.id;
    return `
      <button
        type="button"
        role="tab"
        aria-selected="${isActive}"
        data-category="${cat.id}"
        class="shrink-0 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors border ${
          isActive
            ? "bg-violet-600 text-white border-violet-500"
            : "bg-[#131C31] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
        }"
      >
        ${cat.label}
        <span class="ml-1 opacity-70 font-mono text-[11px]">${count}</span>
      </button>
    `;
  }).join("");
}

function getFilteredProjects() {
  const q = searchQuery.trim().toLowerCase();
  return projects.filter((p) => {
    const matchesCat =
      activeCategory === "all" ||
      normalizeTypes(p.type).includes(activeCategory);
    const matchesYear = activeYear === "all" || p.year === activeYear;
    if (!matchesCat || !matchesYear) return false;
    if (!q) return true;

    const haystack = [
      p.title,
      p.desc,
      p.year,
      p.company || "",
      ...(p.stack || []),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

function renderPagination(totalItems) {
  const paginationEl = document.getElementById("pagination");
  if (!paginationEl) return;

  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  if (totalPages <= 1) {
    paginationEl.innerHTML = "";
    return;
  }

  const pageButtons = Array.from({ length: totalPages }, (_, i) => i + 1)
    .map(
      (page) => `
      <button
        type="button"
        data-page="${page}"
        aria-current="${page === currentPage ? "page" : "false"}"
        class="w-8 h-8 rounded-lg text-xs font-mono transition-colors border ${
          page === currentPage
            ? "bg-violet-600 text-white border-violet-500"
            : "bg-[#131C31] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
        }"
      >
        ${page}
      </button>
    `
    )
    .join("");

  paginationEl.innerHTML = `
    <button
      type="button"
      data-page="${currentPage - 1}"
      ${currentPage === 1 ? "disabled" : ""}
      class="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 bg-[#131C31] text-slate-300 hover:border-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      ← Prev
    </button>
    <div class="flex items-center gap-1.5">
      ${pageButtons}
    </div>
    <button
      type="button"
      data-page="${currentPage + 1}"
      ${currentPage === totalPages ? "disabled" : ""}
      class="px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-800 bg-[#131C31] text-slate-300 hover:border-slate-700 hover:text-white disabled:opacity-40 disabled:pointer-events-none transition-colors"
    >
      Next →
    </button>
  `;
}

function renderProjects() {
  const gridEl = document.getElementById("projects-grid");
  const emptyEl = document.getElementById("empty-state");
  if (!gridEl || !emptyEl) return;

  const filtered = getFilteredProjects();
  const totalPages = Math.max(1, Math.ceil(filtered.length / ITEMS_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;

  if (filtered.length === 0) {
    gridEl.innerHTML = "";
    emptyEl.classList.remove("hidden");
    renderPagination(0);
    return;
  }

  emptyEl.classList.add("hidden");
  const start = (currentPage - 1) * ITEMS_PER_PAGE;
  const pageItems = filtered.slice(start, start + ITEMS_PER_PAGE);

  gridEl.innerHTML = pageItems
    .map((p) => {
      const idx = projects.indexOf(p);
      const types = normalizeTypes(p.type)
        .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
        .join(" · ");
      const visibleStack = (p.stack || []).slice(0, 3);
      const extraStack = (p.stack || []).length - visibleStack.length;

      return `
        <article
          class="group flex flex-col rounded-2xl border border-slate-800 bg-[#131C31] overflow-hidden transition-transform duration-200 hover:-translate-y-0.5 hover:border-violet-500/40"
        >
          <div class="flex-1 flex flex-col">
            <div class="aspect-[16/10] w-full bg-slate-900 overflow-hidden border-b border-slate-800">
              <img
                src="./img/background_project/${escapeHtml(p.year)}/${escapeHtml(p.image)}"
                alt="${escapeHtml(p.title)}"
                loading="lazy"
                decoding="async"
                class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              />
            </div>

            <div class="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3 w-full">
              <div class="space-y-2">
                <div class="flex items-center justify-between gap-2 text-xs font-mono text-slate-400">
                  <span>${escapeHtml(p.year)} · ${escapeHtml(types)}</span>
                  ${
                    p.company
                      ? `<span class="truncate max-w-[140px] px-2 py-0.5 rounded-md bg-violet-500/15 text-violet-300 border border-violet-500/20">${escapeHtml(
                          p.company
                        )}</span>`
                      : ""
                  }
                </div>

                <h3 class="text-base sm:text-lg font-semibold tracking-tight text-white">
                  ${escapeHtml(p.title)}
                </h3>

                <p class="text-sm text-slate-400 leading-relaxed">
                  ${escapeHtml(p.desc)}
                </p>
              </div>

              <div class="flex flex-wrap gap-1.5 pt-1">
                ${visibleStack
                  .map(
                    (tech) => `
                  <span class="px-2 py-0.5 text-[11px] font-mono rounded-md bg-[#0B1120] text-slate-300 border border-slate-800">
                    ${escapeHtml(tech)}
                  </span>
                `
                  )
                  .join("")}
                ${
                  extraStack > 0
                    ? `<span class="px-2 py-0.5 text-[11px] font-mono rounded-md text-slate-500">+${extraStack}</span>`
                    : ""
                }
              </div>
            </div>
          </div>

          ${
            p.url || p.github
              ? `
            <div class="px-4 sm:px-5 py-3 border-t border-slate-800/80 flex items-center gap-4 text-xs font-medium">
              ${
                p.url
                  ? `<a href="${escapeHtml(
                      p.url
                    )}" target="_blank" rel="noopener noreferrer" class="text-violet-300 hover:text-violet-200 hover:underline underline-offset-4 inline-flex items-center gap-1">Live Demo ↗</a>`
                  : ""
              }
              ${
                p.github
                  ? `<a href="${escapeHtml(
                      p.github
                    )}" target="_blank" rel="noopener noreferrer" class="text-slate-400 hover:text-white hover:underline underline-offset-4 inline-flex items-center gap-1">Source Code ↗</a>`
                  : ""
              }
            </div>
          `
              : ""
          }
        </article>
      `;
    })
    .join("");

  renderPagination(filtered.length);
}

function openProjectModal(index) {
  const project = projects[index];
  const modal = document.getElementById("project-modal");
  const content = document.getElementById("modal-content");
  if (!project || !modal || !content) return;

  const types = normalizeTypes(project.type)
    .map((t) => t.charAt(0).toUpperCase() + t.slice(1))
    .join(" · ");

  content.innerHTML = `
    <div class="flex items-start justify-between gap-4">
      <div>
        <p class="text-xs font-mono text-violet-300">
          ${escapeHtml(project.year)} · ${escapeHtml(types)}${
    project.company ? ` · ${escapeHtml(project.company)}` : ""
  }
        </p>
        <h3 class="text-xl font-bold tracking-tight text-white mt-1">${escapeHtml(
          project.title
        )}</h3>
      </div>
      <button
        id="close-modal"
        type="button"
        aria-label="Close modal"
        class="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
      >
        <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      </button>
    </div>

    <div class="aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
      <img
        src="./img/background_project/${escapeHtml(project.year)}/${escapeHtml(project.image)}"
        alt="${escapeHtml(project.title)}"
        class="w-full h-full object-cover"
      />
    </div>

    <p class="text-sm leading-relaxed text-slate-300">
      ${escapeHtml(project.desc)}
    </p>

    <div class="flex flex-wrap gap-1.5">
      ${(project.stack || [])
        .map(
          (tech) => `
        <span class="px-2.5 py-1 text-xs font-mono rounded-lg bg-[#0B1120] text-slate-300 border border-slate-800">
          ${escapeHtml(tech)}
        </span>
      `
        )
        .join("")}
    </div>

    ${
      project.url || project.github
        ? `
      <div class="pt-2 flex flex-wrap gap-2.5">
        ${
          project.url
            ? `<a href="${escapeHtml(
                project.url
              )}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium bg-violet-600 text-white hover:bg-violet-500 transition-colors">Live Demo ↗</a>`
            : ""
        }
        ${
          project.github
            ? `<a href="${escapeHtml(
                project.github
              )}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium border border-slate-700 text-slate-200 hover:bg-slate-800 transition-colors">Source Code ↗</a>`
            : ""
        }
      </div>
    `
        : ""
    }
  `;

  modal.showModal();
  document
    .getElementById("close-modal")
    ?.addEventListener("click", () => modal.close());
}

const MONTHS = {
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11,
};

function parseMonthYear(str) {
  const parts = str.trim().toLowerCase().split(/\s+/);
  if (parts.length !== 2) return null;
  const month = MONTHS[parts[0]];
  const year = Number(parts[1]);
  if (month === undefined || Number.isNaN(year)) return null;
  return { year, month };
}

function calculateDuration(period = "") {
  const [startRaw, endRaw] = period.split("-").map((s) => s.trim());
  if (!startRaw || !endRaw) return "";

  const start = parseMonthYear(startRaw);
  const now = new Date();
  const end =
    endRaw.toLowerCase() === "present"
      ? { year: now.getFullYear(), month: now.getMonth() }
      : parseMonthYear(endRaw);

  if (!start || !end) return "";

  const totalMonths =
    (end.year - start.year) * 12 + (end.month - start.month) + 1;
  if (totalMonths <= 0) return "";

  const yrs = Math.floor(totalMonths / 12);
  const mos = totalMonths % 12;
  const parts = [];
  if (yrs > 0) parts.push(`${yrs} ${yrs === 1 ? "yr" : "yrs"}`);
  if (mos > 0) parts.push(`${mos} ${mos === 1 ? "mo" : "mos"}`);
  return parts.join(" ");
}

function renderExpFilterTabs() {
  const tabsEl = document.getElementById("exp-filter-tabs");
  if (!tabsEl) return;

  tabsEl.innerHTML = EXP_CATEGORIES.map((cat) => {
    const count =
      cat.id === "all"
        ? experiences.length
        : experiences.filter((e) => e.category === cat.id).length;
    const isActive = activeExpCategory === cat.id;
    return `
      <button
        type="button"
        role="tab"
        aria-selected="${isActive}"
        data-exp-category="${cat.id}"
        class="shrink-0 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-medium transition-colors border ${
          isActive
            ? "bg-violet-600 text-white border-violet-500"
            : "bg-[#131C31] text-slate-300 border-slate-800 hover:border-slate-700 hover:text-white"
        }"
      >
        ${cat.label}
        <span class="ml-1 opacity-70 font-mono text-[11px]">${count}</span>
      </button>
    `;
  }).join("");
}

function renderExperiences() {
  const listEl = document.getElementById("experience-list");
  if (!listEl) return;

  const filtered =
    activeExpCategory === "all"
      ? experiences
      : experiences.filter((e) => e.category === activeExpCategory);

  listEl.innerHTML = filtered
    .map((exp) => {
      const duration = calculateDuration(exp.period) || exp.duration;
      return `
      <article class="rounded-2xl border border-slate-800 bg-[#131C31] p-4 sm:p-5 space-y-3">
        <div class="flex flex-col sm:flex-row sm:items-start justify-between gap-1.5">
          <div>
            <h3 class="text-base sm:text-lg font-semibold text-white tracking-tight">
              ${escapeHtml(exp.role)}
            </h3>
            <p class="text-sm font-medium text-violet-300">
              ${escapeHtml(exp.company)}
            </p>
          </div>
          <div class="text-xs font-mono text-slate-400 sm:text-right shrink-0">
            <p>${escapeHtml(exp.period)}</p>
            ${
              duration || exp.location
                ? `<p class="text-slate-500 mt-0.5">${[duration, exp.location]
                    .filter(Boolean)
                    .map(escapeHtml)
                    .join(" · ")}</p>`
                : ""
            }
          </div>
        </div>
        ${
          exp.highlights && exp.highlights.length > 0
            ? `<ul class="space-y-1.5 text-sm text-slate-300 list-disc list-inside leading-relaxed">
                ${exp.highlights
                  .map((item) => `<li>${escapeHtml(item)}</li>`)
                  .join("")}
              </ul>`
            : ""
        }
      </article>
    `;
    })
    .join("");
}

function switchMainTab(tabName) {
  const projectsSection = document.getElementById("projects");
  const expSection = document.getElementById("experience-panel");
  const tabProjects = document.getElementById("tab-projects");
  const tabExp = document.getElementById("tab-experience");
  if (!projectsSection || !expSection || !tabProjects || !tabExp) return;

  const isProjects = tabName === "projects";
  projectsSection.classList.toggle("hidden", !isProjects);
  expSection.classList.toggle("hidden", isProjects);

  tabProjects.setAttribute("aria-selected", String(isProjects));
  tabExp.setAttribute("aria-selected", String(!isProjects));

  tabProjects.className = `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
    isProjects
      ? "bg-violet-600 text-white"
      : "text-slate-400 hover:text-white hover:bg-[#131C31]"
  }`;
  tabExp.className = `px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${
    !isProjects
      ? "bg-violet-600 text-white"
      : "text-slate-400 hover:text-white hover:bg-[#131C31]"
  }`;
}

function initEvents() {
  // Primary Projects / Experience tab switcher
  document.querySelectorAll("[data-main-tab]").forEach((btn) => {
    btn.addEventListener("click", () => switchMainTab(btn.dataset.mainTab));
  });
  // Experience category filter delegation
  document.getElementById("exp-filter-tabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-exp-category]");
    if (!btn) return;
    activeExpCategory = btn.dataset.expCategory;
    renderExpFilterTabs();
    renderExperiences();
  });

  // Category filter delegation
  document.getElementById("filter-tabs")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-category]");
    if (!btn) return;
    activeCategory = btn.dataset.category;
    currentPage = 1;
    renderFilterTabs();
    renderProjects();
  });

  // Year filter
  document.getElementById("year-filter")?.addEventListener("change", (e) => {
    activeYear = e.target.value;
    currentPage = 1;
    renderFilterTabs();
    renderProjects();
  });

  // Search input
  document.getElementById("project-search")?.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    currentPage = 1;
    renderProjects();
  });

  // Reset filters
  document.getElementById("reset-filters")?.addEventListener("click", () => {
    activeCategory = "all";
    activeYear = "all";
    searchQuery = "";
    currentPage = 1;
    const searchInput = document.getElementById("project-search");
    if (searchInput) searchInput.value = "";
    const yearSelect = document.getElementById("year-filter");
    if (yearSelect) yearSelect.value = "all";
    renderFilterTabs();
    renderProjects();
  });

  // Pagination delegation
  document.getElementById("pagination")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-page]");
    if (!btn || btn.disabled) return;
    currentPage = Number(btn.dataset.page);
    renderProjects();
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  });
}

function init() {
  const yearEl = document.getElementById("footer-year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  renderProfile();
  renderYearFilter();
  renderFilterTabs();
  renderProjects();
  renderExpFilterTabs();
  renderExperiences();
  initEvents();
}

init();
