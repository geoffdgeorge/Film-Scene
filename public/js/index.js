// HTML Variables

const main = document.querySelector('main');

// Event Listener Functions

function getComments() {
  const { id } = this.dataset;
  axios.get(`/data/comments/${id}`).then((response) => {
    const { comments } = response.data[0];
    if (comments.length !== 0) {
      console.log(comments);
    }
  });
}

// Page-Load Calls

axios.get('/data/articleScrape').then((response) => {
  console.log(response);
  setTimeout(getArticles, 1500);
});

function getArticles() {
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
}
