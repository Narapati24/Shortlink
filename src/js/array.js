// Define data in the global (window) scope
window.profile = {
  name: "Narapati Keysa Anandi",
  role: "Full-Stack Developer | Mobile App Specialist",
  image: "profile.JPG",
  description: "Passionate developer specializing in creating innovative mobile and web solutions. As a Bangkit Academy 2024 graduate with Google certification path, I combine technical expertise in Flutter, Kotlin, and Laravel with a strong foundation in AI integration. Experienced in delivering 15+ successful projects ranging from AI-powered mobile apps to enterprise web systems. Committed to writing clean, maintainable code and building user-centric applications that solve real-world problems.",
  skills: [
    { name: "Flutter Development", category: "mobile", level: "Advanced" },
    { name: "Web Development", category: "frontend", level: "Advanced" },
    { name: "Android (Kotlin)", category: "mobile", level: "Advanced" },
    { name: "Laravel & PHP", category: "backend", level: "Advanced" },
    { name: "React & JavaScript", category: "frontend", level: "Intermediate" },
    { name: "Firebase & Cloud", category: "backend", level: "Advanced" },
    { name: "AI/ML Integration", category: "tools", level: "Intermediate" },
    { name: "Git & GitHub", category: "tools", level: "Advanced" },
    { name: "MySQL & MongoDB", category: "backend", level: "Advanced" },
    { name: "UI/UX Design", category: "design", level: "Intermediate" }
  ],
  social: {
    github: "https://github.com/Narapati24",
    linkedin: "https://www.linkedin.com/in/narapati-keysa/"
  }
};

window.projects = [
  {
    title: "Todolist App with AI",
    desc: "Smart task management application with AI-powered suggestions and productivity insights",
    year: "2025",
    image: "todolistAI.jpg",
    type: "mobile",
    stack: ["Flutter", "Firebase", "AI/ML"]
  },
  {
    title: "Birthday Reminder App",
    url: "https://birthday.narapatis.my.id",
    desc: "Never miss a birthday! Web app with notifications and personalized reminders for friends and family",
    year: "2025",
    image: "birthdayReminder.png",
    type: "web",
    stack: ["React", "Node.js", "MongoDB"]
  },
  {
    title: "SiKujang",
    desc: "Financial management mobile app for entrepreneurs to track expenses and revenue",
    year: "2025",
    image: "siKujang.jpg",
    type: "mobile",
    stack: ["Flutter", "Firebase", "Chart.js"]
  },
  {
    title: "Glucoscan",
    github: "https://github.com/GlucoScan-Bangkit/GlucoScan-App",
    desc: "AI-powered glucose monitoring app for diabetes management - Bangkit Academy Capstone Project",
    year: "2024",
    image: "glucoscan.jpg",
    type: "mobile",
    stack: ["Kotlin", "TensorFlow", "Cloud Vision"]
  },
  {
    title: "Realact",
    desc: "Comprehensive tour agent management system with booking and customer relationship features",
    year: "2024",
    image: "realAct.jpg",
    type: "web",
    stack: ["Laravel", "MySQL", "Bootstrap"]
  },
  {
    title: "Dicoding Event App",
    github: "https://github.com/Narapati24/Dicoding-Event-APK",
    desc: "Event discovery and management Android app - Bangkit Academy submission project",
    year: "2024",
    image: "dicodingEvent.jpg",
    type: "mobile",
    stack: ["Kotlin", "Retrofit", "Room DB"]
  },
  {
    title: "League of Legend Champion",
    github: "https://github.com/Narapati24/League-Of-Legend-Champion",
    desc: "Interactive champion directory with detailed stats and abilities - Bangkit Academy project",
    year: "2024",
    image: "leagueOfLegendChampion.jpg",
    type: "mobile",
    stack: ["Kotlin", "Retrofit", "Glide"]
  },
  {
    title: "Graph Akademic",
    github: "https://github.com/Narapati24/2_Tubes_PP1",
    desc: "Academic performance visualization tool with interactive charts and analytics",
    year: "2024",
    image: "grafAkademik.jpg",
    type: ["web", "terminal"],
    stack: ["Python", "Matplotlib", "Pandas"]
  },
  {
    title: "Automated Teller Machine (ATM)",
    github: "https://github.com/Narapati24/Alpro2_Project1_ATM",
    desc: "Console-based ATM simulation with banking operations and security features",
    year: "2023",
    image: "atm.png",
    type: "terminal",
    stack: ["C++", "OOP"]
  },
  {
    title: "Pptq Ponpes AM",
    desc: "Student registration management system for Islamic boarding school with admin dashboard",
    year: "2023",
    image: "pptqPonpes.jpg",
    type: "web",
    stack: ["PHP", "MySQL", "Bootstrap"]
  },
  {
    title: "Company Profile Wifiku",
    url: "https://www.wifiku.net.id/",
    desc: "Professional company profile website for internet service provider with service catalog",
    year: "2023",
    image: "wifiku.png",
    type: "web",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Game Balap Karung",
    url: "https://lompat-karung.narapatis.my.id/",
    github: "https://github.com/Narapati24/LompatKarung",
    desc: "Fun web-based sack race game created for Indonesian Independence Day competition",
    year: "2023",
    image: "balapkarung.png",
    type: "web",
    stack: ["JavaScript", "Canvas API", "CSS3"]
  },
  {
    title: "Pnews",
    url: "http://project.narapatis.my.id",
    github: "https://github.com/Narapati24/pw2023_223040155/tree/main/tubes",
    desc: "News portal with CRUD operations, authentication, and admin panel",
    year: "2023",
    image: "pnews.png",
    type: "web",
    stack: ["PHP", "MySQL", "Bootstrap"]
  },
  {
    title: "FIFA Website",
    url: "https://fifa.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project2_223040155",
    desc: "FIFA-themed website showcasing football players and teams with responsive design",
    year: "2022",
    image: "fifa.png",
    type: "web",
    stack: ["HTML", "CSS", "JavaScript"]
  },
  {
    title: "Portfolio Website",
    url: "https://porto.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project1_223040155",
    desc: "My first portfolio website built as a web development course project",
    year: "2022",
    image: "portofolio.png",
    type: "web",
    stack: ["HTML", "CSS", "JavaScript"]
  },
];

// Note: Projects are stored in chronological order but will be 
// displayed with newest years first and newest additions within
// each year appearing first in the UI.

// Experience data
window.experiences = [
  {
    title: "Bangkit Academy 2024",
    role: "Mobile Development Cohort",
    company: "Google, GoTo, Traveloka",
    period: "Feb 2024 - Jul 2024",
    location: "Remote",
    description: "Intensive 6-month program focusing on Android development with Kotlin, machine learning integration, and soft skills",
    achievements: [
      "Completed 300+ hours of structured learning",
      "Built Glucoscan AI app as capstone project",
      "Earned Google Associate Android Developer certification path"
    ],
    tags: ["Mobile Development", "Kotlin", "Machine Learning", "Cloud Computing"],
    category: "education"
  },
  {
    title: "Freelance Web Developer",
    role: "Full Stack Developer",
    company: "Self-Employed",
    period: "2023 - Present",
    location: "Remote",
    description: "Building custom websites and web applications for clients, focusing on responsive design and modern frameworks",
    achievements: [
      "Delivered 10+ client projects successfully",
      "Specialized in Laravel and React development",
      "Maintained 100% client satisfaction rate"
    ],
    tags: ["Web Development", "Laravel", "React", "Freelance"],
    category: "work"
  },
  {
    title: "Wifiku Internet Provider",
    role: "Web Developer",
    company: "Wifiku",
    period: "2023",
    location: "Indonesia",
    description: "Developed and maintained company profile website with service catalog and customer portal",
    achievements: [
      "Built responsive company website from scratch",
      "Improved online presence and customer engagement",
      "Implemented SEO best practices"
    ],
    tags: ["Web Development", "HTML/CSS", "JavaScript"],
    category: "work"
  },
  {
    title: "Web Programming Course",
    role: "Student",
    company: "University",
    period: "2022 - 2023",
    location: "Campus",
    description: "Comprehensive web development curriculum covering HTML, CSS, JavaScript, PHP, and MySQL",
    achievements: [
      "Built multiple projects including Pnews portal",
      "Learned full-stack development fundamentals",
      "Achieved excellent grades in all web courses"
    ],
    tags: ["Web Development", "PHP", "MySQL", "Education"],
    category: "education"
  },
  {
    title: "Mobile App Development Learning",
    role: "Self-Taught Developer",
    company: "Independent Study",
    period: "2024 - Present",
    location: "Self-Paced",
    description: "Continuous learning in Flutter and Android development through online courses and personal projects",
    achievements: [
      "Mastered Flutter framework fundamentals",
      "Built 5+ mobile applications",
      "Integrated Firebase and various APIs"
    ],
    tags: ["Mobile Development", "Flutter", "Android", "Self-Learning"],
    category: "education"
  }
];

// Experience categories
window.experienceCategories = ["all", "work", "education"];

// Experience tags for filtering
window.experienceTags = [...new Set(window.experiences.flatMap(exp => exp.tags))].sort();

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

// Data loaded successfully