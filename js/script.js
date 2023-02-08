// Portofolio Font
document.getElementById("portofolio").onmouseover = function () {
  mouseOverPorto();
};
document.getElementById("portofolio").onmouseout = function () {
  mouseOutPorto();
};

function mouseOverPorto() {
  document.getElementById("textPorto").style.opacity = "0";
}
function mouseOutPorto() {
  document.getElementById("textPorto").style.opacity = "1";
}

// Fifa Font
document.getElementById("fifa").onmouseover = function () {
  mouseOverFifa();
};
document.getElementById("fifa").onmouseout = function () {
  mouseOutFifa();
};

function mouseOverFifa() {
  document.getElementById("textFifa").style.opacity = "0";
}
function mouseOutFifa() {
  document.getElementById("textFifa").style.opacity = "1";
}
