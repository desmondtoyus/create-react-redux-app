var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var db = require("../models");

  exports.login = function(req, res) {
    db.User.findOne({
        where:{
            email: req.body.email
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
    res.status(400).send(err)
})
};


exports.register =  function(req, res) {
    if (!req.body.email || !req.body.password) {
      res.json({success: false, msg: 'Please include username and password.'});
    } else {
      db.User.create(req.body)
            .then(dbUser => res.status(201).send(dbUser))
            .catch(error => res.status(400).send(error));
    }
  };
  

  
