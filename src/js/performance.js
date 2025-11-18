// Performance monitoring and optimization
(function() {
  'use strict';
  
  // Debounce function for scroll/resize events
  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  // Lazy load images on scroll
  function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      }, {
        rootMargin: '50px 0px',
        threshold: 0.01
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      });
    }
  }
  
  // Optimize animations on low-end devices
  function optimizeForDevice() {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEnd = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2;
    
    if (isMobile || isLowEnd) {
      document.documentElement.classList.add('reduce-motion');
      
      // Disable heavy animations
      const style = document.createElement('style');
      style.textContent = `
        .reduce-motion * {
          animation-duration: 0.01ms !important;
          transition-duration: 0.01ms !important;
        }
      `;
      document.head.appendChild(style);
    }
  }
  
  // Monitor Web Vitals
  function reportWebVitals() {
    if ('PerformanceObserver' in window) {
      // Largest Contentful Paint
      try {
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          // LCP: lastEntry.renderTime || lastEntry.loadTime
        });
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
      } catch (e) {
        // Ignore if not supported
      }
      
      // First Input Delay
      try {
        const fidObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            // FID: entry.processingStart - entry.startTime
          });
        });
        fidObserver.observe({ entryTypes: ['first-input'] });
      } catch (e) {
        // Ignore if not supported
      }
    }
    
    // Log page load time
    window.addEventListener('load', () => {
      setTimeout(() => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        // Page Load Time: pageLoadTime + 'ms'
      }, 0);
    });
  }
  
  // Prefetch links on hover
  function prefetchOnHover() {
    const links = document.querySelectorAll('a[href^="http"]');
    
    links.forEach(link => {
      link.addEventListener('mouseenter', function() {
        const url = this.href;
        if (!url) return;
        
        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = url;
        document.head.appendChild(prefetchLink);
      }, { once: true });
    });
  }
  
  // Initialize optimizations
  document.addEventListener('DOMContentLoaded', () => {
    optimizeForDevice();
    lazyLoadImages();
    
    // Defer non-critical tasks
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        reportWebVitals();
        prefetchOnHover();
      });
    } else {
      setTimeout(() => {
        reportWebVitals();
        prefetchOnHover();
      }, 1000);
    }
  });
  
  // Optimize scroll performance
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        // Your scroll handling code here
        ticking = false;
      });
      ticking = true;
    }
  });
  
})();
