// Component loading verification script
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM Content loaded, waiting for components...');
  
  // Listen for component loading events
  document.addEventListener('componentLoaded', function(e) {
    console.log(`Component loaded: ${e.detail.componentName}`);
  });
  
  // Check if all components have loaded after 2 seconds
  setTimeout(function() {
    checkComponentsLoaded();
  }, 2000);
});

function checkComponentsLoaded() {
  const components = [
    { name: 'header', id: 'header-container' },
    { name: 'profile', id: 'profile-container' },
    { name: 'projects', id: 'projects-container' },
    { name: 'footer', id: 'footer-container' }
  ];
  
  let allLoaded = true;
  
  components.forEach(component => {
    const element = document.getElementById(component.id);
    if (!element || element.innerHTML.trim() === '') {
      console.error(`Component ${component.name} did not load correctly`);
      allLoaded = false;
    } else {
      console.log(`Component ${component.name} verified.`);
    }
  });
  
  if (allLoaded) {
    console.log('All components loaded successfully!');
  } else {
    console.error('Some components failed to load. Check network and file paths.');
  }
}
