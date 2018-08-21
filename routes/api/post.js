const router = require("express").Router();
const authorController = require('../../controllers/posts');
const bodyParser = require('body-parser').json();

// Matches with "/api/author"
router.route("/")
  .get(authorController.listPosts)
  .post(bodyParser, authorController.createPost)
  .put(bodyParser, authorController.updatePost );

// Matches with "/api/author/:id"
router
  .route("/:id")
  .get(authorController.listPost )
  .delete(authorController.deletePost);

module.exports = router;