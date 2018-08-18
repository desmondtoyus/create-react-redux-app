var authorController = require('../controllers/authors');
const bodyParser = require('body-parser').json();

authorApi= function(app) {
  app.get("/api/authors", authorController.listAuthors );
  app.get("/api/author/:id", authorController.listAuthor );
  app.post("/api/authors", bodyParser, authorController.createAuthor);
  app.delete("/api/authors/:id", authorController.deleteAuthor);
  app.put("/api/authors", bodyParser, authorController.updateAuthor );
};

module.exports = authorApi;