const router = require("express").Router();
const authorController = require('../../controllers/authors');
const bodyParser = require('body-parser').json();

// Matches with "/api/author"
router.route("/")
  .get(authorController.listAuthors)
  .post(bodyParser, authorController.createAuthor)
  .put(bodyParser, authorController.updateAuthor );

// Matches with "/api/author/:id"
router
  .route("/:id")
  .get(authorController.listAuthor )
  .delete(authorController.deleteAuthor);

module.exports = router;