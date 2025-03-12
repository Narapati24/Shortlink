export const profile = {
  name: "Narapati Keysa Anandi",
  role: "Mobile Developer & Web Developer",
  image: "profile.jpg",
  description: "Seorang mahasiswa yang berfokus pada pengembangan website",
  social: {
    github: "https://github.com/Narapati24",
    linkedin: "https://www.linkedin.com/in/narapati-keysa/"
  }
};

export const projects = [
  {
    title: "Portofolio",
    url: "https://porto.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project1_223040155",
    desc: "Merupakan Sebuah Porto sekaligus Project untuk memenuhi tugas besar 1 ITW",
    year: "2022",
    image: "portofolio.png"
  },
  {
    title: "FIFA",
    url: "https://fifa.narapatis.my.id",
    github: "https://github.com/Narapati24/itw2022_project2_223040155",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar 2 ITW",
    year: "2022",
    image: "fifa.png"
  },
  {
    title: "Pnews",
    url: "http://project.narapatis.my.id",
    github: "https://github.com/Narapati24/pw2023_223040155/tree/main/tubes",
    desc: "Merupakan Sebuah Project untuk memenuhi tugas besar Pemrograman Website",
    year: "2023",
    image: "pnews.png"
  },
];

// Generate years dynamically from projects
export const projectYears = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);