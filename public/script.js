const postsContainer = document.getElementById("posts");
const postBtn = document.getElementById("postBtn");

async function loadPosts() {
  const res = await fetch("/posts");
  const posts = await res.json();

  postsContainer.innerHTML = "";

  posts.forEach(post => {
    const article = document.createElement("article");
    article.className = "post";

    article.innerHTML = `
      <h2>${escapeHTML(post.title)}</h2>
      <p class="date">${formatDate(post.created_at)}</p>
      <p class="content">${escapeHTML(post.content)}</p>
    `;

    postsContainer.appendChild(article);
  });
}

postBtn.addEventListener("click", async () => {
  const title = document.getElementById("title").value.trim();
  const content = document.getElementById("content").value.trim();

  if (!title || !content) return;

  await fetch("/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content })
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadPosts();
});

function formatDate(dateString) {
  return new Date(dateString).toLocaleString();
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;"
  })[m]);
}

loadPosts();
