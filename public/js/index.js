// HTML Variables

const main = document.querySelector('main');

// Event Listener Functions

function getComments() {
  const { id } = this.dataset;
  const articleDiv = this.parentNode;
  axios.get(`/data/comments/${id}`).then((response) => {
    const { comments } = response.data[0];
    if (comments.length !== 0) {
      console.log(comments);
    } else {
      const commentsDiv = document.createElement('div');
      const commentTextArea = document.createElement('textarea');
      const submitBtn = document.createElement('button');
      commentsDiv.classList.add('comments-div');
      submitBtn.textContent = 'Comment';
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
