// btn 2022
document.getElementById("2022").onclick = function () {
  project2022Show();
  project2023Hidden();
  project2024Hidden();
  project2025Hidden();
};

// btn 2023
document.getElementById("2023").onclick = function () {
  project2023Show();
  project2022Hidden();
  project2024Hidden();
  project2025Hidden();
};
document.getElementById("2024").onclick = function () {
  project2024Show();
  project2022Hidden();
  project2023Hidden();
  project2025Hidden();
};
document.getElementById("2025").onclick = function () {
  project2025Show();
  project2022Hidden();
  project2023Hidden();
  project2024Hidden();
};

// Years Button
// function 2022
function project2022Show() {
  document.getElementById("project2022").style.display = "flex";
}
function project2022Hidden() {
  document.getElementById("project2022").style.display = "none";
}

// function 2023
function project2023Show() {
  document.getElementById("project2023").style.display = "flex";
}
function project2023Hidden() {
  document.getElementById("project2023").style.display = "none";
}

// function 2024
function project2024Show() {
  document.getElementById("project2024").style.display = "flex";
}
function project2024Hidden() {
  document.getElementById("project2024").style.display = "none";
}

// function 2025
function project2025Show() {
  document.getElementById("project2025").style.display = "flex";
}
function project2025Hidden() {
  document.getElementById("project2025").style.display = "none";
}

// Portofolio Font
document.getElementById("portofolio").onmouseover = function () {
  mouseOverPorto();
};
document.getElementById("portofolio").onmouseout = function () {
  mouseOutPorto();
};

function mouseOverPorto() {
  document.getElementById("textPorto").style.opacity = "0";
  document.getElementById("descPorto").style.opacity = "1";
}
function mouseOutPorto() {
  document.getElementById("textPorto").style.opacity = "1";
  document.getElementById("descPorto").style.opacity = "0";
}
// End Portofolio Font

// Fifa Font
document.getElementById("fifa").onmouseover = function () {
  mouseOverFifa();
};
document.getElementById("fifa").onmouseout = function () {
  mouseOutFifa();
};

function mouseOverFifa() {
  document.getElementById("textFifa").style.opacity = "0";
  document.getElementById("descFifa").style.opacity = "1";
}
function mouseOutFifa() {
  document.getElementById("textFifa").style.opacity = "1";
  document.getElementById("descFifa").style.opacity = "0";
}
// End Fifa Font
