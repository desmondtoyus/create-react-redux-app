var db = require("../models");

exports.listComments = function(req, res) {
  db.Comment.findAll({
    // include: [db.User]
  })
    .then(dbComment => res.status(201).send(dbComment))
    .catch(error => res.status(400).send(error));
};

exports.listComment = function(req, res) {
    db.Comment.findOne({
        where:{ id: req.params.id},
    //   include: [db.User]
    })
      .then(dbComment => res.status(201).send(dbComment))
      .catch(error => res.status(400).send(error));
  };

exports.createComment = function(req, res) {
  db.Comment.create(req.body)
    .then(dbComment => res.status(201).send(dbComment))
    .catch(error => res.status(400).send(error));
};

exports.deleteComment = function(req, res) {
  db.Comment.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbComment => {
      if (dbComment) {
        db.Comment.update({
          where: {
            id: req.params.id
          }
        })
          .then(dbComment => res.status(201).send("Success"))
          .catch(error => res.status(400).send(error));
      } else {
        res.status(200).send("User Does not exist");
      }
    })
    .catch(error => res.status(400).send("error"));
};

exports.updateComment = function(req, res) {
  db.Comment.findOne({
    where: {
      id: req.body.id
    }
  }).then(author => {
    if (author) {
      db.Comment.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbComment => res.json(dbComment))
      .catch(error => res.json(error));
    } else {
        res.json("error")
    }
  })
  .catch(error => console.log(error));
};


