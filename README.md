<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&height=280&section=header&text=Varshika's%20Digital%20Garden&fontSize=70&fontAlignY=35&desc=Thoughts%20%7C%20Code%20%7C%20Creativity&descAlignY=55&descAlign=50&animation=twinkling" alt="Varshika Blogs Header" />
  
  <br />

  <a href="https://varshikaa29.github.io/varshika-blogs/">
    <img src="https://img.shields.io/badge/READ_BLOG-ENTER_HERE-FF69B4?style=for-the-badge&logo=rss&logoColor=white" alt="Read Blog">
  </a>
  
  <br />
  <br />

  <img src="https://img.shields.io/badge/Status-Blooming%20%F0%9F%8C%B8-pink?style=flat-square">
  <img src="https://img.shields.io/badge/Content-Tech%20%26%20Life-blue?style=flat-square">
  <img src="https://img.shields.io/github/last-commit/Varshikaa29/varshika-blogs?style=flat-square&color=orange" alt="Last Update">
</div>

---

### 🌸 About The Space

Welcome to my corner of the internet. **Varshika Blogs** isn't just a website; it's a digital garden where I cultivate ideas, share my journey in tech (IITM BS & beyond), and document the things that inspire me.

Unlike standard static sites, this project features a **custom-built CMS** (Content Management System) using `editor.html` and `blogs.json`, allowing me to write and publish directly from the browser!

> *"Writing is the painting of the voice."*

---

### ✨ Features

| Component | Magic 🪄 |
| :--- | :--- |
| **📝 Dynamic Content** | Posts are fetched dynamically from a JSON "database". |
| **✍️ Built-in Editor** | A custom `editor.html` interface to draft new posts. |
| **🎨 Minimal Aesthetic** | Designed for readability with a soothing UI. |
| **📱 Responsive** | beautifully optimized for mobile, tablet, and desktop. |

---

### 🛠️ Tech Stack

Built with love and vanilla web technologies.

* **Frontend:** ![HTML5](https://img.shields.io/badge/-HTML5-E34F26?style=flat-square&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/-CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
* **Logic:** ![JavaScript](https://img.shields.io/badge/-JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
* **Data:** ![JSON](https://img.shields.io/badge/-JSON-000000?style=flat-square&logo=json&logoColor=white)
* **Hosting:** ![GitHub Pages](https://img.shields.io/badge/-GitHub_Pages-222222?style=flat-square&logo=github&logoColor=white)

---

### 📂 How It Works

This blog uses a clever serverless architecture:

1.  **Storage:** All blog posts are stored as objects in `blogs.json`.
2.  **Display:** `index.html` uses JavaScript (`script.js`) to fetch the JSON data and generate the blog cards instantly.
3.  **Creation:** The `editor.html` allows for drafting content which can then be added to the JSON file.

```javascript
// Sneak peek of the fetching logic
fetch('blogs.json')
  .then(response => response.json())
  .then(data => renderPosts(data));

```

---

### 🚀 Run It Yourself

Want to see how the code works?

1. **Clone the Repo**
```bash
git clone [https://github.com/Varshikaa29/varshika-blogs.git](https://github.com/Varshikaa29/varshika-blogs.git)

```


2. **Open Locally**
Just double-click `index.html`!
3. **Try the Editor**
Open `editor.html` to see the custom writing interface.

---

### 🔮 Future Plans

* [ ] 🌙 **Dark Mode Toggle:** For late-night reading sessions.
* [ ] 🏷️ **Tags/Categories:** Filter posts by "Tech", "Lifestyle", etc.
* [ ] 💬 **Comments:** Integration with Giscus or Disqus.
* [ ] 🖼️ **Image Gallery:** Better support for photo-heavy posts.

---

### 🤝 Connect

**Varshikaa**

* **GitHub:** [@Varshikaa29](https://github.com/Varshikaa29)
* **Repo:** [varshika-blogs](https://github.com/Varshikaa29/varshika-blogs)

---

<div align="center">
<p>Thanks for visiting! Don't forget to leave a ⭐ star if you like the design!</p>
<!-- <img src="https://www.google.com/search?q=https://media.giphy.com/media/UuB5lh1bL1Dl6svihe/giphy.gif" width="50"> -->
</div>
