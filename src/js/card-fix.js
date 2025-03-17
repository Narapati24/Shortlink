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
