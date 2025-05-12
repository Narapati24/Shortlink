# Narapati Shortcut - Portfolio Website

A modern, responsive portfolio website showcasing the web and mobile development projects of Narapati Keysa Anandi.

![Portfolio Preview](src/img/profile/profile.JPG)

## 🚀 Features

- **Responsive Design**: Optimized for all device sizes from mobile to desktop
- **Dark Mode**: Toggle between light and dark themes
- **Project Filtering**: Filter projects by year and type
- **Performance Optimized**:
  - Critical CSS inlined
  - Deferred loading of non-critical resources
  - Image optimization
  - Lazy loading
- **Animated UI Elements**: Smooth transitions and animations for better user experience
- **Accessibility Features**: ARIA labels, semantic HTML, and keyboard navigation
- **SEO Optimized**: Meta tags, JSON-LD structured data, and sitemap

## 🛠️ Technologies Used

- HTML5
- CSS3 (with TailwindCSS)
- JavaScript (with jQuery)
- Particles.js (for background effects)
- PostCSS
- Vite (bundler)

## 📁 Project Structure

```
├── index.html              # Main HTML file
├── src/
│   ├── css/                # Stylesheet files
│   │   ├── font-size-fix.css
│   │   ├── input.css
│   │   └── style.css
│   ├── img/                # Image resources
│   │   ├── background_project/
│   │   │   ├── 2022/
│   │   │   ├── 2023/
│   │   │   └── 2024/
│   │   ├── logo/
│   │   └── profile/
│   └── js/                 # JavaScript files
│       ├── accessibility-check.js
│       ├── array.js        # Project data
│       ├── card-fix.js
│       ├── data-check.js
│       ├── main.js         # Main application logic
│       ├── particles-config.js
│       └── tracking.js
├── CNAME                   # Custom domain configuration
├── robots.txt              # Robots exclusion standard
├── sitemap.xml             # XML sitemap for search engines
├── package.json            # Dependencies and scripts
├── postcss.config.js       # PostCSS configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── vite.config.js          # Vite bundler configuration
```

## 🚩 Getting Started

### Prerequisites

- Node.js (v14 or later recommended)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Narapati24/Shortlink.git
   cd Shortlink
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## 🔧 Development

### Building for production

```bash
npm run build
```

### Customizing the content

Edit the `src/js/array.js` file to update project information and personal details.

## 📱 Performance Optimizations

- Critical CSS is inlined in the `<head>` for faster initial rendering
- Non-critical CSS is loaded asynchronously with `media="print"` and `onload`
- Particles.js is only loaded on devices that can handle it efficiently
- Image preloading for important assets
- Custom loading animations and shimmer effects

## 🌐 Deployment

This site is deployed using GitHub Pages. The live version can be accessed at:

[https://narapati24.github.io/Shortlink/](https://narapati24.github.io/Shortlink/)

## 📝 License

[MIT License](LICENSE)

## 👤 Author

**Narapati Keysa Anandi**

- GitHub: [@Narapati24](https://github.com/Narapati24)
- LinkedIn: [Narapati Keysa](https://www.linkedin.com/in/narapati-keysa/)

---

© 2025 Narapati Keysa Anandi. All rights reserved.
