var passport = require('passport');
var settings = require('../../config/settings');
require('../../config/passport')(passport);
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var db = require("../../models");

router.post('/register', function(req, res) {
  if (!req.body.username || !req.body.password) {
    res.json({success: false, msg: 'Please pass username and password.'});
  } else {
    var newUser = new User({
      username: req.body.username,
      password: req.body.password
    });
    // save the user
    newUser.save(function(err) {
      if (err) {
        return res.json({success: false, msg: 'Username already exists.'});
      }
      res.json({success: true, msg: 'Successful created new user.'});
    });
   
    db.Users.create(req.body)
          .then(dbAuthor => res.status(201).send(dbAuthor))
          .catch(error => res.status(400).send(error));

  }
});

router.post('/login', function(req, res) {
    db.Users.findOne({
        where:{
            username: req.body.username
        }
  })
  .then(user=>{
    if (!user) {
        res.status(401).send({success: false, msg: 'Authentication failed. User not found.'});
      } else {
        // check if password matches
        let verifiedPassword=  user.comparePassword(req.body.password);
       if (verifiedPassword) {
  var token = jwt.sign(user.toJSON(), settings.secret);
  res.json({success: true, token: 'JWT ' + token});
       }
       else{
  res.status(401).send({success: false, msg: 'Authentication failed. Wrong password.'});
       }
      }
  })
.catch(err=>{
    throw err;
})
});

module.exports = router;


