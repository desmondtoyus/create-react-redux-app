const router = require("express").Router();
const bodyParser = require('body-parser').json();
const commentController = require('../../controllers/comment');


// Matches with "/api/author"
router.route("/")
  .get(commentController.listComments)
  .post(bodyParser, commentController.createComment)
  .put(bodyParser, commentController.updateComment );

// Matches with "/api/author/:id"
router
  .route("/:id")
  .get(commentController.listComment )
  .delete(commentController.deleteComment);

module.exports = router;