var db = require("../models");
var func = require("../utilities/token");
// exports.create = function(req, res, next) {
exports.listUsers = function(req, res) {
  var token = func.getToken(req.headers);
  if (token) {
    db.User.findAll({
      include: [db.Comment]
  
    })
      .then(dbAuthor => res.status(201).send(dbAuthor))
      .catch(error => res.status(400).send(error));
  } else {
    return res.status(403).send({success: false, msg: 'Unauthorized.'});
  }
 
};

exports.listUser= function(req, res) {
    db.User.findOne({
        where:{ id: req.params.id },
      include: [db.Comment]
    })
      .then(dbAuthor => res.status(201).send(dbAuthor))
      .catch(error => res.status(400).send(error));
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
      email: req.body.email
    }
  }).then(author => {
    if (author) {
      db.User.update(req.body, {
        where: {
          email: req.body.email
        }
      })
      .then(dbAuthor => res.json(dbAuthor))
      .catch(error => res.json(error));
    } else {
        res.json("No User Found!")
    }
  })
  .catch(error => console.log(error));
};


