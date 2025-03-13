document.addEventListener('DOMContentLoaded', function() {
  // Only initialize particles if the script is loaded
  if (window.particlesJS) {
    particlesJS("particles-js", {
      particles: {
        number: { value: 30, density: { enable: true, value_area: 800 } }, // Further reduced
        color: {
          value: document.documentElement.classList.contains("dark")
            ? "#6366f1"
            : "#3b82f6",
        },
        shape: { type: "circle" },
        opacity: { value: 0.2 },
        size: { value: 3 },
        move: { speed: 0.3 },
        line_linked: {
          enable: true,
          distance: 150,
          color: document.documentElement.classList.contains("dark")
            ? "#6366f1"
            : "#3b82f6",
          opacity: 0.1,
          width: 1
        }
      },
      interactivity: {
        detect_on: "canvas",
        events: {
          onhover: { enable: false }, // Disable hover effects
          onclick: { enable: false }, // Disable click effects
          resize: true
        }
      },
      retina_detect: false // Disable retina detection
    });
  }
});
