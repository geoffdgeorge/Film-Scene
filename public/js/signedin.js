// HTML Variables

const main = document.querySelector('main');

// Event-Listener and DOM-Manipulations Functions

function postComment(e) {
  e.preventDefault();
  const { id } = this.dataset;
  const parentDiv = this.parentNode;
  const data = {
    username: main.dataset.username,
    message: parentDiv.querySelector('textarea').value.trim(),
    article_id: id,
  };

  axios.post('/data/comment', data).then((response) => {
    location.reload();
  });
}

function deleteComment() {
  const { id } = this.dataset;
  const commentBtnID = this.parentNode.parentNode.parentNode.querySelector('.comment-btn').dataset
    .id;
  axios
    .post('/data/delete-comment', {
      commentID: id,
      articleID: commentBtnID,
      username: main.dataset.username,
    })
    .then((response) => {
      location.reload();
    });
}

function closeComments() {
  const { id } = this.dataset;
  const parentDiv = this.parentNode;
  parentDiv.parentNode.removeChild(parentDiv);
  axios.get(`/data/close/${id}`);
}

function printComments(comments, commentDisplayDiv) {
  comments.forEach((comment) => {
    const commentDiv = document.createElement('div');
    const textDiv = document.createElement('div');
    const commentUsername = document.createElement('h4');
    const commentP = document.createElement('p');
    commentDiv.classList.add('comment');
    commentUsername.textContent = comment.username;
    commentP.textContent = comment.message;
    textDiv.appendChild(commentUsername);
    textDiv.appendChild(commentP);
    commentDiv.appendChild(textDiv);
    commentDiv.style.gridTemplate = 'min-content / 1fr';

    if (comment.username === main.dataset.username) {
      const deleteBtn = document.createElement('button');
      const trashIcon = document.createElement('i');
      trashIcon.classList.add('far');
      trashIcon.classList.add('fa-trash-alt');
      deleteBtn.classList.add('delete-btn');
      deleteBtn.addEventListener('click', deleteComment);
      deleteBtn.setAttribute('data-id', comment._id);
      deleteBtn.appendChild(trashIcon);
      commentDiv.style.gridTemplate = 'min-content / 4fr 1fr';
      commentDiv.appendChild(deleteBtn);
    }

    commentDisplayDiv.prepend(commentDiv);
  });
}

function printCommentsDiv(commentsDiv, id, articleDiv, commentDisplayDiv) {
  const commentTextArea = document.createElement('textarea');
  const submitBtn = document.createElement('button');
  const closeCommentsIcon = document.createElement('i');
  const closeCommentsSpan = document.createElement('span');
  closeCommentsIcon.classList.add('far');
  closeCommentsIcon.classList.add('fa-window-close');
  closeCommentsSpan.textContent = ' Close';
  closeCommentsSpan.prepend(closeCommentsIcon);
  closeCommentsSpan.setAttribute('data-id', id);
  closeCommentsSpan.addEventListener('click', closeComments);
  submitBtn.textContent = 'Comment';
  submitBtn.setAttribute('data-id', id);
  submitBtn.classList.add('comment-btn');
  submitBtn.addEventListener('click', postComment);
  commentsDiv.appendChild(commentDisplayDiv);
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
    const commentDisplayDiv = document.createElement('div');
    commentsDiv.classList.add('comments-div');
    commentDisplayDiv.classList.add('comment-display-div');

    if (comments.length !== 0 && !this.parentNode.querySelector('.comments-div')) {
      // Append existing comments to comments div first.
      printComments(comments, commentDisplayDiv);
      // Append comment text area last.
      printCommentsDiv(commentsDiv, id, articleDiv, commentDisplayDiv);
    } else if (!this.parentNode.querySelector('.comments-div')) {
      printCommentsDiv(commentsDiv, id, articleDiv, commentDisplayDiv);
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
    const newArticleTitleLink = document.createElement('a');
    const newArticleImgLink = document.createElement('a');
    const newArticleSummary = document.createElement('p');
    const newCommentsBtn = document.createElement('button');
    const newCommentsIcon = document.createElement('i');
    newArticleDiv.classList.add('article');
    newArticleImg.src = article.imgURL;
    newArticleTitle.textContent = article.title;
    newArticleWebsite.textContent = article.siteURL;
    newArticleSummary.textContent = article.summary;
    newArticleSummary.classList.add('summary');
    newCommentsIcon.classList.add('far');
    newCommentsIcon.classList.add('fa-comments');
    newCommentsBtn.textContent = ' Comments';
    newCommentsBtn.setAttribute('data-id', article._id);
    newCommentsBtn.classList.add('comment-btn');
    newCommentsBtn.prepend(newCommentsIcon);
    newCommentsBtn.addEventListener('click', getComments);
    newArticleTitleLink.setAttribute('href', article.linkURL);
    newArticleTitleLink.appendChild(newArticleTitle);
    newArticleImgLink.setAttribute('href', article.linkURL);
    newArticleImgLink.appendChild(newArticleImg);
    newArticleDiv.appendChild(newArticleTitleLink);
    newArticleDiv.appendChild(newArticleImgLink);
    newArticleDiv.appendChild(newArticleSummary);
    newArticleDiv.appendChild(newArticleWebsite);
    newArticleDiv.appendChild(newCommentsBtn);
    main.prepend(newArticleDiv);

    if (article.open) {
      axios.get(`/data/comments/${article._id}`).then((response) => {
        const { comments } = response.data[0];

        const commentsDiv = document.createElement('div');
        const commentDisplayDiv = document.createElement('div');
        commentsDiv.classList.add('comments-div');
        commentDisplayDiv.classList.add('comment-display-div');

        if (comments.length !== 0) {
          // Append existing comments to comments div first.
          printComments(comments, commentDisplayDiv);
          // Append comment text area last.
          printCommentsDiv(commentsDiv, article._id, newArticleDiv, commentDisplayDiv);
        } else {
          printCommentsDiv(commentsDiv, article._id, newArticleDiv, commentDisplayDiv);
        }
      });
    }
  });
});
