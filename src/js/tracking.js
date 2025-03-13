// SETTING
var KetUsernameBot = "Seseorang Mengunjungi Website shortlink!";
var urlToDiscord = "https://apiv2.bhadrikais.my.id/webhook.php?kode=24";

// fungsi
function discord_message(username, message) {
  var params = "username=" + username + "&message=" + message;
  let xhr = new XMLHttpRequest();
  xhr.open("POST", urlToDiscord, true);
  xhr.setRequestHeader(
    "Content-type",
    "application/x-www-form-urlencoded; charset=UTF-8"
  );
  xhr.send(params);
  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Visitor tracked successfully");
    }
  };
}

// kirim ip
window.addEventListener("load", (event) => {
  fetch("https://ipapi.co/json/")
    .then((response) => response.json())
    .then((data) => {
      console.log("Visitor IP:", data.ip);
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
    .catch(error => console.log("Tracking error:", error));
});
