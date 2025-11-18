/**
 * Accessibility Check Script - Enhances accessibility of links and buttons
 */
(function() {
  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Run initial check
    setTimeout(fixAccessibility, 1000);
    
    // Run check again after all resources loaded
    window.addEventListener('load', function() {
      setTimeout(fixAccessibility, 1000);
    });
    
    // Add mutation observer to check dynamically added content
    const observer = new MutationObserver(function(mutations) {
      let shouldCheck = false;
      
      mutations.forEach(function(mutation) {
        // Check if any links or elements with role=link were added
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          for (let i = 0; i < mutation.addedNodes.length; i++) {
            const node = mutation.addedNodes[i];
            if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.tagName === 'A' || 
                  node.getAttribute('role') === 'link' || 
                  node.querySelector('a, [role="link"]')) {
                shouldCheck = true;
                break;
              }
            }
          }
        }
      });
      
      if (shouldCheck) {
        fixAccessibility();
      }
    });
    
    // Start observing the document body for added links
    observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  });
  
  function fixAccessibility() {
    // Running accessibility check
    
    // Fix links that don't have discernible names
    const links = document.querySelectorAll('a:not([aria-hidden="true"])');
    let fixedCount = 0;
    
    links.forEach(function(link) {
      // Skip links that already have accessible names
      if (hasAccessibleName(link)) {
        return;
      }
      
      fixedCount++;
      
      // Try to determine what this link is for based on content
      let accessibleName = determineAccessibleName(link);
      
      // Apply the accessible name
      link.setAttribute('aria-label', accessibleName);
      
      // Also add screen reader text if there's no visible text
      if (!link.textContent.trim()) {
        const srSpan = document.createElement('span');
        srSpan.className = 'sr-only';
        srSpan.textContent = accessibleName;
        link.appendChild(srSpan);
      }
      
      // Make any icons inside non-readable by screen readers
      const icons = link.querySelectorAll('i, svg');
      icons.forEach(function(icon) {
        icon.setAttribute('aria-hidden', 'true');
      });
    });
    
    if (fixedCount > 0) {
      // Fixed links without accessible names
    }
  }
  
  function hasAccessibleName(element) {
    // Check if element already has accessible name via various methods
    return element.hasAttribute('aria-label') || 
           element.hasAttribute('aria-labelledby') || 
           (element.textContent && element.textContent.trim()) ||
           element.title ||
           element.querySelector('img[alt]') ||
           element.querySelector('.sr-only, .visually-hidden');
  }
  
  function determineAccessibleName(link) {
    // Check for icon classes to determine link purpose
    if (link.querySelector('.fa-github')) {
      return 'GitHub Profile';
    } else if (link.querySelector('.fa-linkedin, .fa-linkedin-in')) {
      return 'LinkedIn Profile'; 
    } else if (link.querySelector('.fa-twitter')) {
      return 'Twitter Profile';
    } else if (link.querySelector('.fa-facebook')) {
      return 'Facebook Page';
    } else if (link.querySelector('.fa-instagram')) {
      return 'Instagram Profile';
    } else if (link.querySelector('.fa-youtube')) {
      return 'YouTube Channel';
    } else if (link.querySelector('.fa-external-link-alt, .fa-external-link')) {
      return 'Visit Website';
    } else if (link.href) {
      // Try to extract a meaningful name from the URL
      try {
        const url = new URL(link.href);
        const hostname = url.hostname.replace('www.', '');
        
        // Check for known domains
        if (hostname.includes('github.com')) {
          return 'GitHub Profile';
        } else if (hostname.includes('linkedin.com')) {
          return 'LinkedIn Profile';
        } else if (hostname.includes('twitter.com') || hostname.includes('x.com')) {
          return 'Twitter Profile';
        } else {
          // Use the domain name as part of the accessible name
          const domain = hostname.split('.')[0];
          return `Visit ${domain.charAt(0).toUpperCase() + domain.slice(1)}`;
        }
      } catch (e) {
        // If URL parsing fails, use a generic name
        return 'Visit Website';
      }
    } 
    
    // Default generic name
    return 'External Link';
  }
})();
