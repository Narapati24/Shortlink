/**
 * Card sizing fix - Ensures all project cards maintain consistent height
 */
(function() {
  // Wait for DOM content to be loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Fix applied after cards are created
    const fixCardSizes = function() {
      // Find all project cards
      const cards = document.querySelectorAll('#projectContainer > div');
      if (cards.length === 0) return;
      
      // Reset heights to auto first
      cards.forEach(card => {
        if (card.classList.contains('shimmer')) return;
        card.style.height = '';
      });
      
      // Set timeout to allow the DOM to update
      setTimeout(() => {
        // Find the tallest card
        let maxHeight = 0;
        cards.forEach(card => {
          if (card.classList.contains('shimmer')) return;
          const height = card.offsetHeight;
          maxHeight = Math.max(maxHeight, height);
        });
        
        // Set all cards to the same height
        if (maxHeight > 0) {
          cards.forEach(card => {
            if (card.classList.contains('shimmer')) return;
            card.style.height = maxHeight + 'px';
          });
          
          // Add accessibility checks for buttons
          setTimeout(() => {
            // Find all buttons without accessible names within project cards
            const buttonsWithoutNames = document.querySelectorAll('#projectContainer button:not([aria-label]):not(:has(span:not(.sr-only)))');
            buttonsWithoutNames.forEach(button => {
              // Add appropriate labels based on content
              if (button.querySelector('.fa-github')) {
                button.setAttribute('aria-label', 'View source code on GitHub');
              } else if (button.querySelector('.fa-external-link-alt')) {
                button.setAttribute('aria-label', 'View live demo');
              } else if (!button.textContent.trim()) {
                button.setAttribute('aria-label', 'Project action');
              }
            });
            
            // Check all links that act as buttons or don't have text content
            const cardLinks = document.querySelectorAll('#projectContainer a, #socialLinks a');
            cardLinks.forEach(link => {
              // Check if link has no accessible name
              if (!link.hasAttribute('aria-label') && !link.textContent.trim()) {
                if (link.querySelector('.fa-github')) {
                  link.setAttribute('aria-label', 'View source code on GitHub');
                } else if (link.querySelector('.fa-external-link-alt')) {
                  link.setAttribute('aria-label', 'View live demo');
                } else if (link.querySelector('.fa-linkedin, .fa-linkedin-in')) {
                  link.setAttribute('aria-label', 'LinkedIn Profile');
                } else if (link.querySelector('.fa-twitter')) {
                  link.setAttribute('aria-label', 'Twitter Profile');
                } else if (link.querySelector('.fa-facebook')) {
                  link.setAttribute('aria-label', 'Facebook Page');
                } else if (link.querySelector('.fa-instagram')) {
                  link.setAttribute('aria-label', 'Instagram Profile');
                } else {
                  // Extract icon class to determine what it might be
                  const iconEl = link.querySelector('i.fab, i.fas, i.far');
                  if (iconEl) {
                    const classList = Array.from(iconEl.classList);
                    const iconClass = classList.find(cls => cls.startsWith('fa-'));
                    if (iconClass) {
                      const iconName = iconClass.replace('fa-', '');
                      link.setAttribute('aria-label', `${iconName.charAt(0).toUpperCase() + iconName.slice(1)} link`);
                    } else {
                      link.setAttribute('aria-label', 'Social media link');
                    }
                  } else {
                    link.setAttribute('aria-label', 'Project link');
                  }
                }
                
                // Add screen reader text
                const srSpan = document.createElement('span');
                srSpan.className = 'sr-only';
                srSpan.textContent = link.getAttribute('aria-label');
                link.appendChild(srSpan);
              }
            });
            
            console.log('Applied accessibility improvements to card links and buttons');
          }, 100);
        }
        
        console.log('Card heights normalized to', maxHeight, 'px');
      }, 100);
    };
    
    // Apply when projects are loaded
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length) {
          fixCardSizes();
        }
      });
    });
    
    // Start observing project container
    const projectContainer = document.getElementById('projectContainer');
    if (projectContainer) {
      observer.observe(projectContainer, { childList: true, subtree: true });
    }
    
    // Also fix on window resize
    window.addEventListener('resize', fixCardSizes);
    
    // Fix on load as well
    window.addEventListener('load', fixCardSizes);
  });
  
  // jQuery integration if available
  if (typeof $ !== 'undefined') {
    $(document).ready(function() {
      // Fix when filter changes
      $('#yearFilter, #typeFilter').on('change', function() {
        setTimeout(function() {
          console.log('Filter changed, normalizing card heights');
          const event = new Event('card-fix');
          document.dispatchEvent(event);
        }, 200);
      });
    });
  }
  
  // Create custom event listener for card fixes
  document.addEventListener('card-fix', function() {
    const cards = document.querySelectorAll('#projectContainer > div');
    if (cards.length === 0) return;
    
    let maxHeight = 0;
    cards.forEach(card => {
      if (card.classList.contains('shimmer')) return;
      // Reset height first to get natural height
      card.style.height = '';
      maxHeight = Math.max(maxHeight, card.offsetHeight);
    });
    
    if (maxHeight > 0) {
      cards.forEach(card => {
        if (card.classList.contains('shimmer')) return;
        card.style.height = maxHeight + 'px';
      });
    }
  });
})();
