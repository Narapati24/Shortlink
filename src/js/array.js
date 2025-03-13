const profile = {
  name: "Narapati Keysa Anandi",
  role: "Mobile Developer & Web Developer",
  image: "profile.JPG",
  description: "Seorang mahasiswa yang berfokus pada pengembangan website",
  social: {
    github: "https://github.com/Narapati24",
    linkedin: "https://www.linkedin.com/in/narapati-keysa/"
  }
};

const projects = [
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
];

// Generate years dynamically from projects
const projectYears = [...new Set(projects.map(project => project.year))].sort((a, b) => b - a);