const feed = document.getElementById("feed");
const USER = {
  name: "Anh Trinh",
  avatar: "https://i.pravatar.cc/50"
};

/* LOAD BÀI ĐÃ LƯU */
let posts = JSON.parse(localStorage.getItem("posts")) || [];

/* BÀI MẪU NẾU CHƯA CÓ */
if (posts.length === 0) {
  posts = [
    {
      user: USER,
      text: "Hôm nay trời đẹp quá 🌤️",
      image: "https://picsum.photos/600/350?random=1",
      time: new Date().toLocaleString(),
      likes: 0,
      comments: []
    }
  ];
  savePosts();
}

/* HIỂN THỊ */
renderPosts();

/* ĐĂNG BÀI */
function addPost() {
  const content = document.getElementById("content").value;
  const imageInput = document.getElementById("imageInput");

  if (!content && imageInput.files.length === 0) {
    alert("Nhập nội dung hoặc chọn ảnh!");
    return;
  }

  let imageSrc = "";
  if (imageInput.files.length > 0) {
    imageSrc = URL.createObjectURL(imageInput.files[0]);
  }

  const post = {
    user: USER,
    text: content,
    image: imageSrc,
    time: new Date().toLocaleString(),
    likes: 0,
    comments: []
  };

  posts.unshift(post);
  savePosts();
  renderPosts();

  content.value = "";
  imageInput.value = "";
}

/* RENDER */
function renderPosts() {
  feed.innerHTML = "<h3>Bảng tin</h3>";

  posts.forEach((post, index) => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <div class="post-header">
        <img src="${post.user.avatar}" width="40">
        <div>
          <strong>${post.user.name}</strong>
          <div class="time">${post.time}</div>
        </div>
      </div>
      <p>${post.text || ""}</p>
      ${post.image ? `<img src="${post.image}">` : ""}
      <div class="actions">
        <button onclick="likePost(${index})">
          <i class="fa-solid fa-heart"></i> ${post.likes}
        </button>
      </div>
      <div class="comment-box">
        <input placeholder="Viết bình luận..."
               onkeydown="if(event.key==='Enter') addComment(${index}, this)">
      </div>
      ${post.comments.map(c => `<div class="comment">${c}</div>`).join("")}
    `;

    feed.appendChild(div);
  });
}

/* LIKE */
function likePost(index) {
  posts[index].likes++;
  savePosts();
  renderPosts();
}

/* COMMENT */
function addComment(index, input) {
  if (input.value.trim() !== "") {
    posts[index].comments.push(input.value);
    input.value = "";
    savePosts();
    renderPosts();
  }
}

/* SAVE */
function savePosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}
