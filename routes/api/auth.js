const router = require("express").Router();
const bodyParser = require('body-parser').json();
const authController = require('../../controllers/auth');

  router.route("/login")
  .post(bodyParser, authController.login)

  router.route("/register")
  .post(bodyParser, authController.register)

  router.route("/verify")
  .post( bodyParser, authController.verifyUser)

module.exports = router;