# Narapati Keysa - Portfolio Website

A modern, high-performance portfolio website built with **Vite** and **Tailwind CSS**. This project showcases my profile, skills, and collection of projects with advanced filtering and pagination features.

![Portfolio Preview](public/img/logo/RainyDeepLogo.png)

## 🚀 Features

- **Dynamic Content**: All data (profile, projects, experiences) is managed in a structured JSON-like format (`src/js/array.js`), making it easy to update.
- **Advanced Filtering**: Filter projects by **Type** (Mobile, Web, etc.) and **Year**.
- **Pagination**: Client-side pagination for the project grid to ensure optimal performance and UX.
- **Responsive Design**: Fully responsive layout using Tailwind CSS with a custom "Midnight Blue" theme.
- **Modern UI**: Glassmorphism effects, smooth transitions, and interactive elements.
- **Automated Deployment**: Configured with GitHub Actions for automatic deployment to GitHub Pages.
- **SEO Friendly**: Includes sitemap, robots.txt, and meta tags.

## 🛠️ Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/) - For lightning-fast development and optimized builds.
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework.
- **Language**: Modern JavaScript (ES Modules).
- **Deployment**: GitHub Pages (via GitHub Actions).

## 📦 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm (Node Package Manager)

### Installation

1.  **Clone the repository**
    ```bash
    git clone https://github.com/Narapati24/Shortlink.git
    cd Shortlink
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

### Development

Start the local development server:

```bash
npm run dev
```

The site will be available at `http://localhost:5173`.

### Production Build

Build the project for production (generates `dist` folder):

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

## 🚀 Deployment

This project is configured to deploy automatically to **GitHub Pages** using GitHub Actions.

1.  Push your changes to the `newModel` (or `main`) branch.
2.  The workflow defined in `.github/workflows/deploy.yml` will trigger.
3.  It builds the project and deploys the `dist` folder to the `gh-pages` environment.

**Note**: Ensure your GitHub Repository Settings > Pages is set to deploy from **GitHub Actions**.

## 📂 Project Structure

```
├── .github/            # GitHub Actions workflows
├── public/             # Static assets (images, favicon, robots.txt)
├── src/
│   ├── css/            # Tailwind directives and custom CSS
│   ├── js/
│   │   ├── array.js    # Data source (Profile & Projects)
│   │   └── main.js     # Application logic (Rendering, Filtering)
├── index.html          # Entry point
├── tailwind.config.js  # Tailwind configuration
└── vite.config.js      # Vite configuration
```

## 👤 Author

**Narapati Keysa Anandi**

- Website: [kodingin.id](https://kodingin.id)
- GitHub: [@Narapati24](https://github.com/Narapati24)
- LinkedIn: [Narapati Keysa](https://www.linkedin.com/in/narapati-keysa/)

---
&copy; 2025 Kodingin.id. All Rights Reserved.
