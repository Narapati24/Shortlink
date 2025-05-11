/**
 * Development version of tracking.js
 * This version disables actual tracking and just logs actions
 */

// In development mode, simply log instead of making network requests
console.log("Development mode: Visitor tracking disabled");

// Mock tracking function for development
function discord_message(username, message) {
  console.log("DEV MODE: Would have sent the following tracking data:");
  console.log("Username:", username);
  console.log("Message:", message);
}

// Event listener for demonstration purposes
window.addEventListener("load", () => {
  console.log("DEV MODE: Page loaded, tracking would be triggered here");
  console.log("DEV MODE: Current URL:", window.location.href);
  console.log("DEV MODE: User Agent:", navigator.userAgent);
  
  // You can uncomment this to test the data format without making actual API calls
  /*
  discord_message(
    "Development Testing",
    "LINK: " + window.location.href + 
    "\nDEVICE: " + navigator.userAgent
  );
  */
});
