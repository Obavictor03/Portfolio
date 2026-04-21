
/* TYPING EFFECT */
const text = ["Fullstack Developer", "React Developer", "Django Backend Developer", "REST API Developer"];
let i = 0, j = 0, current = "", isDeleting = false;

function type() {
  current = text[i];
  document.getElementById("typing").textContent = current.substring(0, j);

  if (!isDeleting && j++ === current.length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j-- === 0) {
    isDeleting = false;
    i = (i + 1) % text.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}
type();


/* CONTACT FORM */
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = Object.fromEntries(new FormData(e.target));

  const res = await fetch("https://portfolio-pvre.onrender.com/api/contact/", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(formData)
  });

  alert("Message sent!");
});

/* PROJECTS */
async function loadProjects() {
  const res = await fetch("https://portfolio-pvre.onrender.com/api/projects/");
  const projects = await res.json();

  const container = document.getElementById("projectsContainer");
  container.innerHTML = "";

  projects.forEach(project => {
    container.innerHTML += `
      <div class="flex flex-col text-start p-6 mx-6 rounded-xl bg-gray-100 dark:bg-gray-900 hover:scale-105 transition">
        <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-3">${project.description}</p>
        <p class="text-sm mb-3"><strong>Tech:</strong> ${project.tech_stack}</p>

        <div class="flex gap-3 text-start">
          ${project.github_link ? `<a href="${project.github_link}" target="_blank" class="text-blue-500">GitHub</a>` : ""}
          ${project.live_link ? `<a href="${project.live_link}" target="_blank" class="text-green-500">Live</a>` : ""}
        </div>
      </div>
    `;
  });
}

loadProjects();