// HTML Variables

const main = document.querySelector('main');

// Event Listener Functions

function postComment(e) {
  e.preventDefault();
  const { id } = this.dataset;
  const parentDiv = this.parentNode;
  const data = {
    username: 'Anon',
    message: parentDiv.querySelector('textarea').value.trim(),
    article_id: id,
  };
  axios.post('/data/comment', data).then((response) => {
    location.reload();
  });
}

function closeComments(e) {
  const { id } = this.dataset;
  const parentDiv = this.parentNode;
  parentDiv.parentNode.removeChild(parentDiv);
  axios.get(`/data/close/${id}`);
}

function printComments(comments, commentsDiv) {
  comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    const commentUsername = document.createElement('h4');
    const commentP = document.createElement('p');
    commentDiv.classList.add('comment');
    commentUsername.textContent = comment.username;
    commentP.textContent = comment.message;
    commentDiv.appendChild(commentUsername);
    commentDiv.appendChild(commentP);
    commentsDiv.appendChild(commentDiv);
  });
}

function printCommentsDiv(commentsDiv, id, articleDiv) {
  const commentTextArea = document.createElement('textarea');
  const submitBtn = document.createElement('button');
  const closeCommentsIcon = document.createElement('i');
  const closeCommentsSpan = document.createElement('span');
  closeCommentsIcon.classList.add('far');
  closeCommentsIcon.classList.add('fa-window-close');
  closeCommentsSpan.textContent = ' Close Comments';
  closeCommentsSpan.prepend(closeCommentsIcon);
  closeCommentsSpan.setAttribute('data-id', id);
  closeCommentsSpan.addEventListener('click', closeComments);
  submitBtn.textContent = 'Comment';
  submitBtn.setAttribute('data-id', id);
  submitBtn.classList.add('comment-btn');
  submitBtn.addEventListener('click', postComment);
  commentsDiv.appendChild(commentTextArea);
  commentsDiv.appendChild(submitBtn);
  commentsDiv.appendChild(closeCommentsSpan);
  articleDiv.appendChild(commentsDiv);
}

function getComments() {
  const { id } = this.dataset;
  const articleDiv = this.parentNode;

  axios.get(`/data/comments/${id}`).then((response) => {
    axios.get(`/data/open/${id}`);
    const { comments } = response.data[0];

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments-div');

    if (comments.length !== 0 && !this.parentNode.querySelector('.comments-div')) {
      // Append existing comments to comments div first.
      printComments(comments, commentsDiv);
      // Append comment text area last.
      printCommentsDiv(commentsDiv, id, articleDiv);
    } else if (!this.parentNode.querySelector('.comments-div')) {
      printCommentsDiv(commentsDiv, id, articleDiv);
    }
  });
}

// Page-Load Calls

axios.get('/data/articleScrape').then((response) => {
  console.log(response);
});

axios.get('/data/articles').then((response) => {
  const articles = response.data;

  articles.forEach((article) => {
    const newArticleDiv = document.createElement('div');
    const newArticleImg = document.createElement('img');
    const newArticleTitle = document.createElement('h3');
    const newArticleWebsite = document.createElement('h6');
    const newArticleLink = document.createElement('a');
    const newCommentsBtn = document.createElement('button');
    newArticleDiv.classList.add('article');
    newArticleImg.src = article.imgURL;
    newArticleTitle.textContent = article.title;
    newArticleWebsite.textContent = article.siteURL;
    newCommentsBtn.textContent = 'Comments';
    newCommentsBtn.setAttribute('data-id', article._id);
    newCommentsBtn.classList.add('comment-btn');
    newCommentsBtn.addEventListener('click', getComments);
    newArticleLink.setAttribute('href', article.linkURL);
    newArticleLink.appendChild(newArticleTitle);
    newArticleDiv.appendChild(newArticleLink);
    newArticleDiv.appendChild(newArticleImg);
    newArticleDiv.appendChild(newArticleWebsite);
    newArticleDiv.appendChild(newCommentsBtn);
    main.appendChild(newArticleDiv);

    if (article.open) {
      axios.get(`/data/comments/${article._id}`).then((response) => {
        const { comments } = response.data[0];

        const commentsDiv = document.createElement('div');
        commentsDiv.classList.add('comments-div');

        if (comments.length !== 0) {
          // Append existing comments to comments div first.
          printComments(comments, commentsDiv);
          // Append comment text area last.
          printCommentsDiv(commentsDiv, article._id, newArticleDiv);
        } else {
          printCommentsDiv(commentsDiv, article._id, newArticleDiv);
        }
      });
    }
  });
});
