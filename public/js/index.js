axios.get('/data/articleScrape').then(async (response) => {
  console.log(response);
  setTimeout(getArticles, 2000);
});

function getArticles() {
  axios.get('/data/articles').then((response) => {
    console.log(response.data);
  });
}
