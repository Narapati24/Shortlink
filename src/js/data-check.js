/**
 * Data Check Script - Ensures array.js data is properly loaded
 */
(function() {
  // Check if data is available after a short delay
  setTimeout(() => {
    if (typeof profile === 'undefined') {
      console.error('CRITICAL ERROR: Profile data not loaded from array.js');
      // Create fallback profile
      window.profile = {
        name: "Data Not Loaded",
        role: "Please check console for errors",
        image: "profile.jpg",
        description: "The data from array.js could not be loaded. Please check your browser console for errors or verify that array.js exists and contains valid data.",
        skills: [{
          name: "Error Loading Skills",
          category: "frontend",
          level: "Beginner"
        }],
        social: {
          github: "#",
          linkedin: "#"
        }
      };
      
      // Add error notification in the DOM
      document.addEventListener('DOMContentLoaded', () => {
        const errorNotice = document.createElement('div');
        errorNotice.style = 'position:fixed;top:0;left:0;right:0;background:#f44336;color:white;padding:10px;text-align:center;z-index:9999;';
        errorNotice.innerHTML = '<strong>Error:</strong> Profile data could not be loaded. Check the console for details.';
        document.body.prepend(errorNotice);
      });
    }
    
    if (typeof projects === 'undefined') {
      console.error('CRITICAL ERROR: Projects data not loaded from array.js');
      // Create fallback projects data
      window.projects = [];
      window.projectYears = [];
      window.projectTypes = [];
      
      // Add dummy project
      window.projects.push({
        title: "Error Loading Projects",
        desc: "The projects data could not be loaded from array.js. Please check your browser console for errors.",
        year: "2024",
        image: "placeholder.jpg",
        type: "web"
      });
    }
    
    // Ensure filter arrays are initialized properly
    if (!window.projectYears || !window.projectYears.length) {
      console.warn('Project years array is missing or empty, initializing from projects data');
      try {
        window.projectYears = [...new Set(window.projects.map(project => project.year))].sort((a, b) => b - a);
      } catch (e) {
        console.error('Failed to create projectYears array', e);
        window.projectYears = ['2024', '2023', '2022'];
      }
    }
    
    if (!window.projectTypes || !window.projectTypes.length) {
      console.warn('Project types array is missing or empty, initializing from projects data');
      try {
        window.projectTypes = [...new Set(window.projects.flatMap(project => 
          Array.isArray(project.type) ? project.type : [project.type]
        ))].sort();
      } catch (e) {
        console.error('Failed to create projectTypes array', e);
        window.projectTypes = ['web', 'mobile', 'terminal'];
      }
    }
    
    console.log('Data check complete: ', {
      profile: !!window.profile,
      projects: window.projects ? window.projects.length : 0,
      years: window.projectYears ? window.projectYears.length : 0,
      types: window.projectTypes ? window.projectTypes.length : 0
    });
  }, 50);
})();
