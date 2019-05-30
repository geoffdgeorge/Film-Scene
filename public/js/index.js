axios.get('/data/articleScrape').then(async (response) => {
  console.log(response);
  setTimeout(getArticles, 1500);
});

function getArticles() {
  axios.get('/data/articles').then((response) => {
    console.log(response.data);
  });
}
