let allBlogs = [];
let currentCategory = "all";

// Category config for styling
const categoryConfig = {
  "IITM BS": { class: "tag-iitm" },
  "Technology": { class: "tag-tech" },
  "Lifestyle": { class: "tag-life" },
  "default": { class: "tag-tech" } // Fallback
};

async function fetchBlogs() {
  try {
    const response = await fetch("blogs.json");
    if (!response.ok) throw new Error("Failed to load");
    allBlogs = await response.json();
    
    generateCategories();
    renderBlogs(allBlogs);
  } catch (error) {
    console.error("Error loading blogs:", error);
    document.getElementById("blogGrid").innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-dim);">
        <h2>Unable to load stories 😔</h2>
        <p>Please try again later.</p>
      </div>
    `;
  }
}

function generateCategories() {
  const categories = [...new Set(allBlogs.map((b) => b.category))];
  const container = document.getElementById("categoriesContainer");
  
  // Clear existing buttons except "All"
  container.innerHTML = '<button class="pill active" data-category="all">All Stories</button>';
  
  categories.forEach((cat) => {
    const btn = document.createElement("button");
    btn.className = "pill";
    btn.dataset.category = cat;
    btn.textContent = cat;
    btn.onclick = () => filterByCategory(cat);
    container.appendChild(btn);
  });
}

function filterByCategory(category) {
  currentCategory = category;
  
  // Update active state of pills
  document.querySelectorAll(".pill").forEach((btn) => {
    if (btn.dataset.category === category) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  
  const searchInput = document.getElementById("searchInput").value.toLowerCase();
  
  let filtered =
    currentCategory === "all"
      ? allBlogs
      : allBlogs.filter((b) => b.category === currentCategory);
  
  if (searchInput) {
    filtered = filtered.filter(
      (b) =>
        b.title.toLowerCase().includes(searchInput) ||
        b.excerpt.toLowerCase().includes(searchInput)
    );
  }
  
  renderBlogs(filtered);
}

function renderBlogs(blogs) {
  const grid = document.getElementById("blogGrid");
  
  if (!blogs.length) {
    grid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 4rem; color: var(--text-dim);">
        <h3>No matches found 🔍</h3>
        <p>Try searching for something else.</p>
      </div>
    `;
    return;
  }
  
  grid.innerHTML = blogs
    .map((b, index) => {
      const config = categoryConfig[b.category] || categoryConfig.default;
      const isFeatured = b.featured === true; // Check if featured
      
      return `
        <article class="blog-card ${isFeatured ? 'featured' : ''}" onclick="openModal(${b.id})" style="animation: fadeUp 0.6s ease ${index * 0.1}s backwards;">
            <div class="category-tag ${config.class}">${b.category}</div>
            
            <div class="card-image-wrapper">
                <img src="${b.image}" alt="${b.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'">
            </div>
            
            <div class="card-content">
                <div class="card-meta">
                    <span>${formatDate(b.date)} • ${b.readTime}</span>
                </div>
                <h3 class="card-title">${b.title}</h3>
                <p class="card-excerpt">${b.excerpt}</p>
                <div class="read-more-link">
                    <span>➞</span> Read Story
                </div>
            </div>
        </article>
      `;
    })
    .join("");
}

function formatDate(d) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function openModal(id) {
  const b = allBlogs.find((x) => x.id === id);
  if (!b) return;
  
  const config = categoryConfig[b.category] || categoryConfig.default;
  
  document.getElementById("modalImage").src = b.image;
  // Reset scroll position
  document.querySelector(".modal-window").scrollTop = 0;
  
  // Update category style
  const catEl = document.getElementById("modalCategory");
  catEl.textContent = b.category;
  catEl.className = `category-tag ${config.class}`;
  catEl.style.position = 'relative';
  catEl.style.top = '0';
  catEl.style.left = '0';
  catEl.style.display = 'inline-block';
  catEl.style.marginBottom = '1rem';

  document.getElementById("modalTitle").textContent = b.title;
  document.getElementById("modalMeta").innerHTML = `
    <span>Written by <strong>${b.author}</strong></span>
    <span>•</span>
    <span>${formatDate(b.date)}</span>
    <span>•</span>
    <span>${b.readTime}</span>
  `;
  document.getElementById("modalContent").innerHTML = b.content;
  
  const backdrop = document.getElementById("blogModal");
  backdrop.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const backdrop = document.getElementById("blogModal");
  backdrop.classList.remove("active");
  document.body.style.overflow = "";
}

// Close on backdrop click
document.getElementById("blogModal").addEventListener("click", (e) => {
  if (e.target.id === "blogModal") closeModal();
});

// Close on Escape key
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

// Search Listener
document.getElementById("searchInput").addEventListener("input", (e) => {
  // Use a tiny debounce for better performance if needed, but not strictly necessary for small lists
  filterByCategory(currentCategory); 
});

// Header scroll effect
window.addEventListener("scroll", () => {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }
});

// Initial Load
fetchBlogs();
