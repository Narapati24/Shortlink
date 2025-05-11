/**
 * Data Check Script - Ensures array.js data is properly loaded
 */
(function() {
  // Verify that array.js has been loaded and initialized
  const ensureDataLoaded = () => {
    // Check for global variables that should be defined in array.js
    if (typeof window.profile === 'undefined' || typeof window.projects === 'undefined') {
      console.error('CRITICAL ERROR: Data from array.js is not loaded or not available in global scope');
      
      // Create fallback profile if needed
      if (typeof window.profile === 'undefined') {
        console.error('CRITICAL ERROR: Profile data not loaded from array.js');
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
      
      // Create fallback projects if needed
      if (typeof window.projects === 'undefined') {
        console.error('CRITICAL ERROR: Projects data not loaded from array.js');
        window.projects = [];
        
        // Add dummy project
        window.projects.push({
          title: "Error Loading Projects",
          desc: "The projects data could not be loaded from array.js. Please check your browser console for errors.",
          year: "2024",
          image: "placeholder.jpg",
          type: "web"
        });
      }
    }
    
    // Ensure filter arrays are initialized properly
    if (!window.projectYears || window.projectYears.length === 0) {
      console.warn('Project years array is missing or empty, initializing from projects data');
      try {
        // Safely create projectYears from projects array
        if (window.projects && Array.isArray(window.projects)) {
          window.projectYears = [...new Set(window.projects.map(project => project.year))].sort((a, b) => b - a);
        } else {
          throw new Error('Projects array is not available or not an array');
        }
      } catch (e) {
        console.error('Failed to create projectYears array', e);
        window.projectYears = ['2024', '2023', '2022'];
      }
    }
    
    if (!window.projectTypes || window.projectTypes.length === 0) {
      console.warn('Project types array is missing or empty, initializing from projects data');
      try {
        // Safely create projectTypes from projects array
        if (window.projects && Array.isArray(window.projects)) {
          window.projectTypes = [...new Set(window.projects.flatMap(project => 
            Array.isArray(project.type) ? project.type : [project.type]
          ))].sort();
        } else {
          throw new Error('Projects array is not available or not an array');
        }
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
  };

  // First attempt immediately in case array.js has already been loaded
  ensureDataLoaded();
  
  // Retry after a delay to give array.js time to load if it hasn't already
  setTimeout(ensureDataLoaded, 100);
  
  // Last resort - check once the DOM is fully loaded
  document.addEventListener('DOMContentLoaded', ensureDataLoaded);
})();
