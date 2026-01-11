let allBlogs = [];
let currentCategory = "all";

// Category icons and colors
const categoryConfig = {
  "IITM BS": { icon: "🎓", class: "iitm" },
  Technology: { icon: "💻", class: "tech" },
  Lifestyle: { icon: "🌟", class: "life" },
  default: { icon: "📝", class: "" },
};

async function fetchBlogs() {
  try {
    const response = await fetch("blogs.json");
    allBlogs = await response.json();

    // Update blog count in hero
    const countEl = document.getElementById("blogCount");
    if (countEl) {
      countEl.textContent = `${allBlogs.length}+`;
    }

    generateCategories();
    renderBlogs(allBlogs);
  } catch (error) {
    console.error("Error loading blogs:", error);
    document.getElementById("blogGrid").innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">📝</div>
        <h3 class="empty-state-title">No blogs yet</h3>
        <p class="empty-state-text">Start writing your first blog post!</p>
      </div>
    `;
  }
}

function generateCategories() {
  const categories = [...new Set(allBlogs.map((b) => b.category))];
  const container = document.getElementById("categoriesContainer");

  categories.forEach((cat) => {
    const config = categoryConfig[cat] || categoryConfig.default;
    const btn = document.createElement("button");
    btn.className = "category-btn";
    btn.dataset.category = cat;
    btn.innerHTML = `${config.icon} ${cat}`;
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

  if (search) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(search) ||
        b.excerpt.toLowerCase().includes(search) ||
        b.category.toLowerCase().includes(search)
    );
  }

  renderBlogs(filtered);
}

function renderBlogs(blogs) {
  const grid = document.getElementById("blogGrid");

  if (!blogs.length) {
    grid.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3 class="empty-state-title">No blogs found</h3>
        <p class="empty-state-text">Try adjusting your search or filters</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = blogs
    .map((b, index) => {
      const config = categoryConfig[b.category] || categoryConfig.default;
      const featured = b.featured
        ? `<span class="featured-badge">⭐ Featured</span>`
        : "";

      return `
        <article class="blog-card" onclick="openModal(${
          b.id
        })" style="animation-delay: ${index * 0.1}s">
          <div class="image-container">
            <span class="blog-category ${config.class}">${config.icon} ${
        b.category
      }</span>
            ${featured}
            <img src="${b.image}" alt="${
        b.title
      }" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1432821596592-e2c18b78144f?w=800&q=80'">
          </div>
          <div class="blog-content">
            <div class="blog-meta">
              <span>👤 ${b.author}</span>
              <span>📅 ${formatDate(b.date)}</span>
              <span>⏱️ ${b.readTime}</span>
            </div>
            <h2 class="blog-title">${b.title}</h2>
            <p class="blog-excerpt">${b.excerpt}</p>
            <span class="read-more">Read More</span>
          </div>
        </article>
      `;
    })
    .join("");

  // Add staggered animation
  const cards = grid.querySelectorAll(".blog-card");
  cards.forEach((card, i) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";
    setTimeout(() => {
      card.style.transition = "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, i * 100);
  });
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

  const config = categoryConfig[b.category] || categoryConfig.default;

  document.getElementById("modalImage").src = b.image;
  document.getElementById("modalImage").alt = b.title;
  document.getElementById(
    "modalCategory"
  ).innerHTML = `${config.icon} ${b.category}`;
  document.getElementById("modalTitle").textContent = b.title;
  document.getElementById("modalMeta").innerHTML = `
    <span>👤 ${b.author}</span>
    <span>📅 ${formatDate(b.date)}</span>
    <span>⏱️ ${b.readTime}</span>
  `;
  document.getElementById("modalContent").innerHTML = b.content;
  document.getElementById("blogModal").classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  document.getElementById("blogModal").classList.remove("active");
  document.body.style.overflow = "";
}

// Event Listeners
document.getElementById("blogModal").addEventListener("click", (e) => {
  if (e.target.id === "blogModal") closeModal();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

document
  .getElementById("searchInput")
  .addEventListener("input", (e) => filterBlogs(e.target.value.toLowerCase()));

// Header scroll effect
let lastScroll = 0;
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  const currentScroll = window.pageYOffset;

  if (currentScroll > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  lastScroll = currentScroll;
});

// Parallax effect for particles
document.addEventListener("mousemove", (e) => {
  const particles = document.querySelectorAll(".particle");
  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  particles.forEach((p, i) => {
    const speed = (i + 1) * 0.3;
    p.style.transform = `translate(${x * speed * 20}px, ${y * speed * 20}px)`;
  });
});

// Initialize
fetchBlogs();

// Add smooth reveal on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements after DOM loads
document.addEventListener("DOMContentLoaded", () => {
  document
    .querySelectorAll(".blog-card, .hero, .search-container")
    .forEach((el) => {
      observer.observe(el);
    });
});
