// Define data in the global (window) scope
window.profile = {
  name: "Narapati Keysa Anandi",
  role: "Mobile Developer & Web Developer",
  image: "profile.JPG",
  description: "Seorang mahasiswa yang berfokus pada pengembangan website dan mobile apps. Memiliki pengalaman dalam pembuatan aplikasi web responsif dan aplikasi Android native.",
  skills: [
    { name: "Web Development", category: "frontend", level: "Advanced" },
    { name: "Android Development", category: "mobile", level: "Intermediate" },
    { name: "Flutter", category: "mobile", level: "Intermediate" },
    { name: "Laravel", category: "backend", level: "Intermediate" },
    { name: "Git", category: "tools", level: "Advanced" }
  ],
  social: {
    github: "https://github.com/Narapati24",
    linkedin: "https://www.linkedin.com/in/narapati-keysa/"
  }
};

window.projects = [
  {
    title: "Portofolio",
    url: "https://porto.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project1_223040155",
    desc: "Merupakan Sebuah Porto sekaligus Project untuk memenuhi tugas besar 1 ITW",
    year: "2022",
    image: "portofolio.png",
    type: "web" // Add type
  },
  {
    title: "FIFA",
    url: "https://fifa.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project2_223040155",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar 2 ITW",
    year: "2022",
    image: "fifa.png",
    type: "web"
  },
  {
    title: "Pnews",
    url: "http://project.narapatis.my.id",
    github: "https://github.com/Narapati24/pw2023_223040155/tree/main/tubes",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar Pemrograman Website",
    year: "2023",
    image: "pnews.png",
    type: "web"
  },
  {
    title: "Game Balap Karung",
    url: "https://lompat-karung.narapatis.my.id/",
    github: "https://github.com/Narapati24/LompatKarung",
    desc: "Merupakan Sebuah Project untuk mengikuti perlombaan 17 agustus",
    year: "2023",
    image: "balapkarung.png",
    type: "web"
  },
  {
    title: "Company Profile Wifiku",
    url: "https://www.wifiku.net.id/",
    desc: "Merupakan Sebuah Project untuk company profile Wifiku yang bergerak di bidang internet",
    year: "2023",
    image: "wifiku.png",
    type: "web"
  },
  {
    title: "Pptq Ponpes AM",
    desc: "Merupakan Sebuah Project untuk mengelola data pendaftaran santri baru",
    year: "2023",
    image: "pptqPonpes.jpg",
    type: "web"
  },
  {
    title: "Automated Teller Machine (ATM)",
    github: "https://github.com/Narapati24/Alpro2_Project1_ATM",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar Algoritma dan Pemrograman 2",
    year: "2023",
    image: "atm.png",
    type: "terminal"
  },
  {
    title: "Graph Akademic",
    github: "https://github.com/Narapati24/2_Tubes_PP1",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar praktikum pemrograman 1",
    year: "2024",
    image: "grafAkademik.jpg",
    type: ["web", "terminal"]  // Changed to array of types
  },
  {
    title: "League of Legend Champion",
    github: "https://github.com/Narapati24/League-Of-Legend-Champion",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas bangkit academy",
    year: "2024",
    image: "leagueOfLegendChampion.jpg",
    type: "mobile"
  },
  {
    title: "Dicoding Event Apk",
    github: "https://github.com/Narapati24/Dicoding-Event-APK",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas bangkit academy",
    year: "2024",
    image: "dicodingEvent.jpg",
    type: "mobile"
  },
  {
    title: "Glucoscan",
    github: "https://github.com/GlucoScan-Bangkit/GlucoScan-App",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas capstone project pada bangkit academy",
    year: "2024",
    image: "glucoscan.jpg",
    type: "mobile"
  },
  {
    title: "Realact",
    desc: "Merupakan Sebuah Project untuk mengelola tour Agent",
    year: "2024",
    image: "realAct.jpg",
    type: "web"
  },
];

// Note: Projects are stored in chronological order but will be 
// displayed with newest years first and newest additions within
// each year appearing first in the UI.

// Generate years dynamically from projects
window.projectYears = [...new Set(window.projects.map(project => project.year))].sort((a, b) => b - a);

// Update projectTypes to handle arrays of types
window.projectTypes = [...new Set(window.projects.flatMap(project => 
  Array.isArray(project.type) ? project.type : [project.type]
))].sort();

// Make sure years are properly formatted as strings or numbers consistently
window.projects.forEach(project => {
  // Ensure year is stored as a number for proper sorting
  project.year = project.year.toString();
});

// Log successful loading of data
console.log('Array data loaded successfully:', {
  profile: window.profile.name,
  projects: window.projects.length,
  years: window.projectYears.length,
  types: window.projectTypes.length
});