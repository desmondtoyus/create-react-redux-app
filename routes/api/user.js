const router = require("express").Router();
const bodyParser = require('body-parser').json();
const userController = require('../../controllers/user');


// Matches with "/api/author"
router.route("/")
  .get(userController.listUsers)
  .put(bodyParser, userController.updateUser );

// Matches with "/api/author/:id"
router
  .route("/:id")
  .get(userController.listUser )
  .delete(userController.deleteUser);


module.exports = router;