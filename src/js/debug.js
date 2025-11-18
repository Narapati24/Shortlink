/**
 * Debug Utility - JavaScript Data Loading Validator
 * Place this script at the end of your body tag to validate data loading
 */
(function() {
  // Execute when DOM is fully loaded
  document.addEventListener('DOMContentLoaded', function() {
    console.group('Debug Utility - Data Loading Check');
    
    // Check window objects
    const dataObjects = ['profile', 'projects', 'projectYears', 'projectTypes'];
    const results = {};
    
    dataObjects.forEach(objName => {
      const obj = window[objName];
      results[objName] = {
        exists: typeof obj !== 'undefined',
        type: typeof obj,
        isArray: Array.isArray(obj),
        length: Array.isArray(obj) ? obj.length : (obj && typeof obj === 'object' ? Object.keys(obj).length : 0),
        sample: obj ? (Array.isArray(obj) ? obj.slice(0, 1) : (typeof obj === 'object' ? Object.keys(obj).slice(0, 3) : obj)) : null
      };
    });
    
    // Print table summary
    console.table({
      'profile': { 
        status: results.profile.exists ? '✅ Available' : '❌ Missing', 
        properties: results.profile.exists ? results.profile.length : 0,
        sample: results.profile.exists ? results.profile.sample : 'undefined'
      },
      'projects': { 
        status: results.projects.exists ? '✅ Available' : '❌ Missing', 
        items: results.projects.exists && results.projects.isArray ? results.projects.length : 0,
        sample: results.projects.exists && results.projects.isArray ? (results.projects.length > 0 ? 'First item title: ' + window.projects[0].title : 'Empty array') : 'undefined or not array'
      },
      'projectYears': { 
        status: results.projectYears.exists ? '✅ Available' : '❌ Missing', 
        items: results.projectYears.exists && results.projectYears.isArray ? results.projectYears.length : 0,
        sample: results.projectYears.exists && results.projectYears.isArray ? window.projectYears.join(', ').substring(0, 30) : 'undefined or not array'
      },
      'projectTypes': { 
        status: results.projectTypes.exists ? '✅ Available' : '❌ Missing', 
        items: results.projectTypes.exists && results.projectTypes.isArray ? results.projectTypes.length : 0,
        sample: results.projectTypes.exists && results.projectTypes.isArray ? window.projectTypes.join(', ').substring(0, 30) : 'undefined or not array'
      }
    });
    
    // Check script loading order
    const scripts = Array.from(document.scripts).map(script => {
      const src = script.src.split('/').pop();
      return src || 'inline script';
    }).filter(src => src !== 'inline script');
    
    // Script loading order checked
    
    // Provide suggestions
    if (!results.profile.exists || !results.projects.exists) {
      console.warn('💡 SUGGESTION: Make sure array.js defines variables in the global scope using window.varName');
      console.warn('             Example: window.profile = { ... } instead of const profile = { ... }');
    }
    
    if (!results.projectYears.exists || !results.projectTypes.exists) {
      console.warn('💡 SUGGESTION: Make sure filter arrays are created in the global scope');
      console.warn('             Example: window.projectYears = [...] instead of const projectYears = [...]');
    }
    
    console.groupEnd();
  });
})();
