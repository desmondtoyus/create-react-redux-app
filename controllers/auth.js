var passport = require('passport');
var settings = require('../config/settings');
require('../config/passport')(passport);
var jwt = require('jsonwebtoken');
var db = require("../models");

  exports.login = function(req, res) {
    db.User.findOne({
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
    res.status(400).send(err)
})
};


exports.register =  function(req, res) {
    if (!req.body.username || !req.body.password) {
      res.json({success: false, msg: 'Please pass username and password.'});
    } else {
      db.User.create(req.body)
            .then(dbUser => res.status(201).send(dbUser))
            .catch(error => res.status(400).send(error));
    }
  };

  exports.deleteUser = function(req, res) {
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(dbUser => {
        if (dbUser) {
          db.User.update({status:'deleted' },{
            where: {
              id: req.params.id
            }
          })
            .then(dbUser => res.status(201).send("Success"))
            .catch(error => res.status(400).send(error));
        } else {
          res.status(200).send("User Does not exist");
        }
      })
      .catch(error => res.status(400).send("error"));
  };


  exports.updateUser= function(req, res) {
    db.User.findOne({
      where: {
        id: req.body.id
      }
    }).then(user => {
      if (user) {
        db.User.update(req.body, {
          where: {
            id: req.body.id
          }
        })
        .then(dbUser => res.status(201).send("Success"))
        .catch(error => res.status(400).send(error));
      } else {
          res.json("error")
          res.json({success: false, payload: "Error Occured"});
      }
    })
    .catch(error => console.log(error));
  };


  exports.listUsers = function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Post
    db.User.findAll({
      include: [db.Comment]
  
    })
      .then(dbUser => res.status(201).send(dbUser))
      .catch(error => res.status(400).send(error));
  };
  
  exports.listUser = function(req, res) {
      db.User.findOne({
          where:{ id: req.params.id },
        include: [db.Comment]
      })
        .then(dbUser => res.status(201).send(dbUser))
        .catch(error => res.status(400).send(error));
    };
  
  exports.createUser = function(req, res) {
    db.User.create(req.body)
      .then(dbUser => res.status(201).send(dbUser))
      .catch(error => res.status(400).send(error));
  };