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
    console.log(response);
  });
}

function getComments() {
  const { id } = this.dataset;
  const articleDiv = this.parentNode;
  axios.get(`/data/comments/${id}`).then((response) => {
    const { comments } = response.data[0];

    const commentsDiv = document.createElement('div');
    commentsDiv.classList.add('comments-div');

    if (comments.length !== 0) {
      console.log(comments);

      // Append existing comments to comments div first.

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

      // Append comment text area last.

      const commentTextArea = document.createElement('textarea');
      const submitBtn = document.createElement('button');
      submitBtn.textContent = 'Comment';
      submitBtn.setAttribute('data-id', id);
      submitBtn.addEventListener('click', postComment);
      commentsDiv.appendChild(commentTextArea);
      commentsDiv.appendChild(submitBtn);
      articleDiv.appendChild(commentsDiv);
    } else {
      const commentTextArea = document.createElement('textarea');
      const submitBtn = document.createElement('button');
      commentsDiv.classList.add('comments-div');
      submitBtn.textContent = 'Comment';
      submitBtn.setAttribute('data-id', id);
      submitBtn.addEventListener('click', postComment);
      commentsDiv.appendChild(commentTextArea);
      commentsDiv.appendChild(submitBtn);
      articleDiv.appendChild(commentsDiv);
    }
  });
}

// Page-Load Calls

axios.get('/data/articleScrape').then((response) => {
  console.log(response);
});

axios.get('/data/articles').then((response) => {
  console.log(response.data);

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
    newCommentsBtn.addEventListener('click', getComments);
    newArticleLink.setAttribute('href', article.linkURL);
    newArticleLink.appendChild(newArticleTitle);
    newArticleDiv.appendChild(newArticleLink);
    newArticleDiv.appendChild(newArticleImg);
    newArticleDiv.appendChild(newArticleWebsite);
    newArticleDiv.appendChild(newCommentsBtn);
    main.appendChild(newArticleDiv);
  });
});
