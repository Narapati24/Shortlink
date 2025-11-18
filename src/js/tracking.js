// SETTING
var KetUsernameBot = "Seseorang Mengunjungi Website shortlink!";
var urlToDiscord = "https://apiv2.bhadrikais.my.id/webhook.php?kode=24";

// fungsi
function discord_message(username, message) {
  // Option 1: Use a CORS proxy (dev environment only)
  const proxyUrl = 'https://corsproxy.io/?';
  const targetUrl = encodeURIComponent(urlToDiscord);
  const finalUrl = proxyUrl + targetUrl;
  
  var params = "username=" + encodeURIComponent(username) + "&message=" + encodeURIComponent(message);
  
  // Use fetch API with error handling
  fetch(finalUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    },
    body: params
  })
  .then(response => {
    if (response.ok) {
      // Visitor tracked successfully
    } else {
      // Tracking failed
    }
  })
  .catch(error => {
    // Tracking error
  });
}

// kirim ip
window.addEventListener("load", (event) => {
  // Skip tracking for local development environments
  const isLocalhost = window.location.hostname === 'localhost' || 
                      window.location.hostname === '127.0.0.1' || 
                      window.location.protocol === 'file:';
  
  if (isLocalhost) {
    // Visitor tracking skipped in local development
    return;
  }
  
  // Only track in production environment
  fetch("https://ipapi.co/json/")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then((data) => {
      // Visitor IP logged
      discord_message(
        KetUsernameBot,
        "LINK :\n" +
          window.location.href +
          "\nIP :\n" +
          data.ip +
          "\nKOTA :\n" +
          data.city +
          "\nISP :\n" +
          data.org +
          "\nDEVICE :\n" +
          navigator.userAgent
      );
    })
    .catch(error => {});
});
