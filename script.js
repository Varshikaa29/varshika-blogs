let allBlogs = [];
let currentCategory = "all";

async function fetchBlogs() {
  try {
    const response = await fetch("blogs.json");
    allBlogs = await response.json();
    generateCategories();
    renderBlogs(allBlogs);
  } catch (error) {
    document.getElementById("blogGrid").innerHTML =
      '<p style="text-align:center;color:#94a3b8;">No blogs found. Add some in the editor!</p>';
  }
}

function generateCategories() {
  const categories = [...new Set(allBlogs.map((b) => b.category))];
  const container = document.getElementById("categoriesContainer");
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.dataset.category = cat;
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    container.appendChild(btn);
  });
}

function filterByCategory(category) {
  currentCategory = category;
  document.querySelectorAll(".category-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.category === category);
  });
  filterBlogs(document.getElementById("searchInput").value.toLowerCase());
}

function filterBlogs(search) {
  let filtered =
    currentCategory === "all"
      ? allBlogs
      : allBlogs.filter((b) => b.category === currentCategory);
  if (search)
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.excerpt.toLowerCase().includes(search)
    );
  renderBlogs(filtered);
}

function renderBlogs(blogs) {
  const grid = document.getElementById("blogGrid");
  if (!blogs.length) {
    grid.innerHTML =
      '<p style="text-align:center;color:#94a3b8;padding:3rem;">No blogs found.</p>';
    return;
  }
  grid.innerHTML = blogs
    .map(
      (b) => `
        <article class="blog-card" onclick="openModal(${b.id})">
            <div class="image-container">
                <span class="blog-category">${b.category}</span>
                <img src="${b.image}" alt="${b.title}" loading="lazy">
            </div>
            <div class="blog-content">
                <div class="blog-meta"><span>👤 ${
                  b.author
                }</span><span>📅 ${formatDate(b.date)}</span></div>
                <h2 class="blog-title">${b.title}</h2>
                <p class="blog-excerpt">${b.excerpt}</p>
                <span class="read-more">Read More →</span>
            </div>
        </article>
    `
    )
    .join("");
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function openModal(id) {
  const b = allBlogs.find((x) => x.id === id);
  if (!b) return;
  document.getElementById("modalImage").src = b.image;
  document.getElementById("modalCategory").textContent = b.category;
  document.getElementById("modalTitle").textContent = b.title;
  document.getElementById("modalMeta").innerHTML = `<span>👤 ${
    b.author
  }</span><span>📅 ${formatDate(b.date)}</span><span>⏱️ ${b.readTime}</span>`;
  document.getElementById("modalContent").innerHTML = b.content;
  document.getElementById("blogModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("blogModal").classList.remove("active");
  document.body.style.overflow = "";
}

document.getElementById("blogModal").addEventListener("click", (e) => {
  if (e.target.id === "blogModal") closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});
document
  .getElementById("searchInput")
  .addEventListener("input", (e) => filterBlogs(e.target.value.toLowerCase()));

fetchBlogs();
