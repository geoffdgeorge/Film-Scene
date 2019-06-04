# **Film Scene**

Film Scene is a full-stack news-aggregation app for long-form film commentary that stores articles, users, and comments in a MongoDB database. For the MVP, the articles are scraped, stored, and populated from three sites: FilmSchoolRejects.com, TheSpool.net, and OverthinkingIt.com. Users can post anonymously when not signed in but can only delete their comments if they post them while signed in via third-part authentication.

# Dependencies

### Front End

- [Axios]() (to handle requests to the server)
- Handlebars (to render page views)

### Back End

- Express (to handle routing)
- Express Handlebars (to handle renders for the Handlebars view engine)
- Mongoose (to create models for articles, users, and comments)
- Passport (to handle third-party OAuth authentication)
- CookieSession (to handle the creation of cookies for signed-in users)
- Cheerio (to handle the scraping of files)
- Axios (to handle requests to the websites that Film Scene scrapes from)

# How It Works

The mechanics of the site are fairly simple. Articles are scraped and stored in the database every time a user refreshes the page. Only articles that aren't already in the database are stored during each scrape.

The articles collection in the database is connected relationally to the comments collection so that comments for an individual article can be pulled up when a user clicks that article's "Comments" button. The user can leave comments anonymously when not signed in, and each comment is stored to the database and immediately displayed with the appropriate article on page reload.

![A successful anonymous comment](./public/imgs/readme_imgs/anon_comment.gif)

Clicking the "Login" button leads users to a page where they can sign in to the site using third-party validation via Google, Facebook, or Twitter. The OAuth validation is done via a trio of Passport strategies, modeled on the strategies put together in [this video series](https://www.youtube.com/watch?v=sakQbeRjgwg&list=PL4cUxeGkcC9jdm7QX143aMLAqyM-jTZ2x).

And, once a user is signed in, they may leave comments in their own name, with the power to delete those comments while logged in.

![A successful user login and comment](./public/imgs/readme_imgs/user_comment.gif)

![A successful comment deletion](./public/imgs/readme_imgs/delete_user_comment.gif)

When a user is done visiting the site, logging out is as simple as clicking "Logout," and their unique user page can't be accessed until they log in again.

![A successful logout](./public/imgs/readme_imgs/user_logout.gif)

# Future Development

### **Awaiting Scraping**

Because the site currently scrapes from three different sites and stores the articles from those sites in the database all at once, there's quite a bit of asynchronous code firing in a single function. It typically takes one to two seconds to complete the entire transaction, so while the scraping is done with each page reload, the loading of the articles is done independently of the scrape. This means that fresh articles might show up on the screen one page refresh later than when they entered the database, and this will be fixed in a future build by ensuring that the storing of articles in the database is awaited.

### ##Additional Styling\*\*

The site is fully operational but rather bare bones at the moment. The next version will have a more streamlined front end.
