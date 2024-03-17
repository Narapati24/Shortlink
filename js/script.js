// Function to create project elements for a specific year
function createProjectsForYear(year) {
  const wrapper = document.createElement("div");
  wrapper.id = "project" + year;
  wrapper.classList.add("wrapperProject");
  
  projectsWrapper.innerHTML = ""; // Clear existing project elements
  
  projects.forEach(project => {
    if (project.year === year) {
      const projectElement = document.createElement("div");
      projectElement.classList.add("project");

      const linkProject = document.createElement("a");
      linkProject.href = project.url;
      linkProject.target = "_blank";

      const bg = document.createElement("div");
      bg.id = project.title.toLowerCase();
      bg.classList.add("project-item");
      bg.style.backgroundImage = `url(img/background_project/${project.year}/${project.title.toLowerCase()}.png)`;
      linkProject.appendChild(bg);

      const title = document.createElement("h4");
      title.id = `title${project.title.toLowerCase()}`;
      title.innerHTML = project.title;
      linkProject.appendChild(title);

      const desc = document.createElement("p");
      desc.id = `desc${project.title.toLowerCase()}`;
      desc.innerHTML = project.desc;
      linkProject.appendChild(desc);

      projectElement.appendChild(linkProject);
      wrapper.appendChild(projectElement);
    }
  });

  projectsWrapper.appendChild(wrapper);
}

// Function to handle click on year button
function handleYearButtonClick(year) {
  createProjectsForYear(year);
}

// Create years buttons
const projectYearsContainer = document.getElementById("projectYears");
projectYears.forEach(year => {
  const h3 = document.createElement("h3");
  h3.textContent = year;
  h3.onclick = function () {
    handleYearButtonClick(year);
  };
  projectYearsContainer.appendChild(h3);
});

// Initialize projects wrapper
const projectsWrapper = document.getElementById("wrapperProject");
createProjectsForYear(projectYears[0]);

// Portofolio Font
document.getElementById("portofolio").onmouseover = function () {
  mouseOverPorto();
};
document.getElementById("portofolio").onmouseout = function () {
  mouseOutPorto();
};

function mouseOverPorto() {
  document.getElementById("titleportofolio").style.opacity = "0";
  document.getElementById("descportofolio").style.opacity = "1";
}
function mouseOutPorto() {
  document.getElementById("titleportofolio").style.opacity = "1";
  document.getElementById("descportofolio").style.opacity = "0";
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
  document.getElementById("titlefifa").style.opacity = "0";
  document.getElementById("descfifa").style.opacity = "1";
}
function mouseOutFifa() {
  document.getElementById("titlefifa").style.opacity = "1";
  document.getElementById("descfifa").style.opacity = "0";
}
// End Fifa Font
