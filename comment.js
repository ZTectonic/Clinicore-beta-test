let selectedRating = 0;

// Star rating tanlash
document.querySelectorAll('.star').forEach(star => {
  star.addEventListener('click', function () {
    selectedRating = parseInt(this.getAttribute('data-value'));
    document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));
    for (let i = 0; i < selectedRating; i++) {
      document.querySelectorAll('.star')[i].classList.add('selected');
    }
  });
});

// Yuborish
document.getElementById('submitComment').addEventListener('click', () => {
  const text = document.getElementById('commentText').value.trim();
  const name = document.getElementById('userName').value.trim() || "Mehmon";

  if (!text || selectedRating === 0) {
    alert("Iltimos, sharh va bahoni to‘ldiring.");
    return;
  }

  const newComment = {
    text,
    rating: selectedRating,
    name,
    profilePic: "https://www.gravatar.com/avatar?d=identicon",
    time: new Date().toISOString()
  };

  const comments = JSON.parse(localStorage.getItem('comments')) || [];
  comments.push(newComment);
  localStorage.setItem('comments', JSON.stringify(comments));

  document.getElementById('commentText').value = '';
  document.getElementById('userName').value = '';
  selectedRating = 0;
  document.querySelectorAll('.star').forEach(s => s.classList.remove('selected'));

  renderComments();
});

// Sharhlarni ko‘rsatish
function renderComments() {
  const comments = JSON.parse(localStorage.getItem('comments')) || [];

  // Pastki ro‘yxat
  const container = document.getElementById('commentsContainer');
  container.innerHTML = '';
  comments.slice().reverse().forEach(comment => {
    container.innerHTML += `
      <div class="comment">
        <div class="comment-header">
          <img src="${comment.profilePic}" />
          <strong>${comment.name}</strong>
        </div>
        <div class="comment-rating">${'★'.repeat(comment.rating)}</div>
        <p>${comment.text}</p>
      </div>
    `;
  });

  // Yuqoridagi top 3
  const topContainer = document.getElementById('top-comments');
  const top = comments.filter(c => c.rating === 5).slice(-3).reverse();
  topContainer.innerHTML = '';
  top.forEach(c => {
    topContainer.innerHTML += `<p>"${c.text}" ★★★★★</p>`;
  });
}

renderComments();
