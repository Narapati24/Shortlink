// Component loader script
document.addEventListener('DOMContentLoaded', function() {
  // Load all components
  loadComponent('header', 'header-container');
  loadComponent('profile', 'profile-container');
  loadComponent('projects', 'projects-container');
  loadComponent('footer', 'footer-container');
});

// Function to load HTML components
function loadComponent(componentName, targetId) {
  fetch(`src/components/${componentName}.html`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.text();
    })
    .then(html => {
      document.getElementById(targetId).innerHTML = html;
      
      // Dispatch event that component is loaded
      const event = new CustomEvent('componentLoaded', {
        detail: { componentName: componentName }
      });
      document.dispatchEvent(event);
      
      // Call any initialization functions that depend on this component
      if (componentName === 'header' && typeof initializeThemeToggle === 'function') {
        initializeThemeToggle();
      }
      else if (componentName === 'profile' && typeof initializeProfile === 'function') {
        initializeProfile();
      }
      else if (componentName === 'projects' && typeof initializeProjects === 'function') {
        initializeProjects();
      }
    })
    .catch(error => {
      console.error(`Could not load ${componentName} component:`, error);
    });
}
