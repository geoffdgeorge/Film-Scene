const router = require('express').Router();
const axios = require('axios');
const cheerio = require('cheerio');
const db = require('../models');

router.get('/articles', (req, res) => {
  axios
    .all([
      axios.get('https://thespool.net/'),
      axios.get('https://www.overthinkingit.com/'),
      axios.get('https://filmschoolrejects.com/'),
    ])
    .then(
      axios.spread((spoolRes, overthinkingRes, filmSchoolRes) => {
        const spool = cheerio.load(spoolRes.data);
        const over = cheerio.load(overthinkingRes.data);
        const fsr = cheerio.load(filmSchoolRes.data);

        spool('div .hover__handler').each(function (i, element) {
          const result = {};

          result.title = spool(this)
            .children('header')
            .children('a')
            .children('h1')
            .text();
          result.siteURL = 'thespool.net';
          result.linkURL = spool(this)
            .children('header')
            .children('a')
            .attr('href');
          result.imgURL = spool(this)
            .children('aside')
            .children('img')
            .attr('src');

          db.Article.create(result)
            .then((dbArticle) => {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch((err) => {
              // If an error occurred, log it
              console.log(err);
            });
        });

        over('.post').each(function (i, element) {
          const result = {};

          result.title = over(this)
            .find('h2')
            .text();
          result.siteURL = 'overthinkingit.com';
          result.linkURL = over(this)
            .find('.entry--archive__title-link')
            .attr('href');
          result.imgURL = over(this)
            .find('img')
            .attr('src');

          db.Article.create(result)
            .then((dbArticle) => {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch((err) => {
              // If an error occurred, log it
              console.log(err);
            });
        });

        fsr('article').each(function (i, element) {
          const result = {};

          result.title = fsr(this)
            .find('h3')
            .text();
          result.siteURL = 'filmschoolrejects.com';
          result.linkURL = fsr(this)
            .find('h3')
            .children('a')
            .attr('href');
          result.imgURL = fsr(this)
            .find('img')
            .attr('data-src');

          db.Article.create(result)
            .then((dbArticle) => {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch((err) => {
              // If an error occurred, log it
              console.log(err);
            });
        });
      }),
    );
  // Send a message to the client
  res.send('Scrape Complete');
});

module.exports = router;
