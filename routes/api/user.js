const router = require("express").Router();
var passport = require('passport');
const bodyParser = require('body-parser').json();
const userController = require('../../controllers/user');
require('../../config/passport')(passport);

// Matches with "/api/author"
router.route("/")
  .get(passport.authenticate('jwt', { session: false}), userController.listUsers)
  .put(bodyParser, userController.updateUser );

// Matches with "/api/author/:id"
router
  .route("/:id")
  .get(userController.listUser )
  .delete(userController.deleteUser);


module.exports = router;