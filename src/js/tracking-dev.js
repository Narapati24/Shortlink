/**
 * Development version of tracking.js
 * This version disables actual tracking and just logs actions
 */

// In development mode, tracking is disabled
// Development mode: Visitor tracking disabled

// Mock tracking function for development
function discord_message(username, message) {
  // DEV MODE: Would have sent tracking data
}

// Event listener for demonstration purposes
window.addEventListener("load", () => {
  // DEV MODE: Page loaded, tracking would be triggered here
  
  // You can uncomment this to test the data format without making actual API calls
  /*
  discord_message(
    "Development Testing",
    "LINK: " + window.location.href + 
    "\nDEVICE: " + navigator.userAgent
  );
  */
});
