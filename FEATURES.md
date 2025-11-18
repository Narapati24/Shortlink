# Portfolio Features Documentation

## Recent Updates (Latest)

### Tech Stack Display
- **Feature**: Each project card now displays the technologies used
- **Location**: Project cards in the Projects section
- **Implementation**: 
  - Added `stack` property to all projects in `array.js`
  - Modified `createProjectCard()` function in `main.js` to render tech stack badges
  - Tech stack appears as small badges below the project description
  - Styled with midnight blue theme (bg-midnight-700/60)

### Experience Section
- **Feature**: New collapsible section showcasing work and education experience
- **Location**: Between Profile and Projects sections
- **Key Features**:
  - Toggle button to show/hide experience section
  - Remembers expanded/collapsed state in localStorage
  - Category filtering (All, Work, Education)
  - Tag filtering by skills (multiple selection)
  - Rich experience cards with:
    - Title, role, company, location
    - Time period
    - Description
    - Key achievements list
    - Related tags/skills

### Data Structure
All portfolio data is stored in `src/js/array.js`:

#### Projects
Each project includes:
```javascript
{
  title: "Project Name",
  desc: "Professional description",
  image: "image.jpg",
  year: "2025",
  type: ["web", "mobile"],
  github: "https://github.com/...",
  url: "https://demo-link.com",
  stack: ["Technology1", "Technology2", ...]
}
```

#### Experiences
Each experience includes:
```javascript
{
  title: "Position Title",
  role: "Role Name",
  company: "Company Name",
  period: "Month Year - Month Year",
  location: "City, Country",
  description: "Detailed description",
  achievements: ["Achievement 1", "Achievement 2"],
  tags: ["Skill1", "Skill2"],
  category: "work" or "education"
}
```

## Core Features

### Midnight Blue Theme
- Primary color: `#0f172a`
- Consistent gradient backgrounds
- Custom Tailwind color palette with midnight-* shades
- No dark/light mode toggle (single midnight theme)

### Performance Optimizations
- Service Worker for offline support and caching
- Lazy loading images with IntersectionObserver
- Resource hints (preconnect, dns-prefetch)
- Performance monitoring (LCP, FID)
- Optimized for GitHub Pages deployment

### Project Features
- Year and type filtering
- Pagination (6 projects per page)
- Lazy loading with smooth animations
- GitHub and demo links
- Type badges (web, mobile, terminal)
- Tech stack display

### Profile Features
- Expandable skills section
- Social media links
- Profile image
- Skills with categories
- Remembers expanded state

### Experience Features
- Collapsible section with toggle
- Category filtering (All, Work, Education)
- Multiple tag filtering
- Achievement lists
- Rich card layout
- Remembers expanded state

## File Structure

```
src/
├── js/
│   ├── main.js           # Core application logic
│   │   ├── ProfileManager
│   │   ├── ProjectManager
│   │   ├── ExperienceManager (NEW)
│   │   └── LayoutManager
│   ├── array.js          # Data storage
│   └── performance.js    # Performance monitoring
├── css/
│   ├── input.css         # Tailwind source
│   └── style.css         # Compiled CSS
└── img/
    ├── profile/
    └── background_project/
        ├── 2025/
        ├── 2024/
        ├── 2023/
        └── 2022/
```

## Browser Compatibility
- Modern browsers with ES6+ support
- Service Worker support
- IntersectionObserver support
- LocalStorage support

## GitHub Pages Deployment
- Service Worker path detection for subdirectory hosting
- Automatic caching strategy
- Static asset optimization
- Compatible with GitHub Actions for image optimization
