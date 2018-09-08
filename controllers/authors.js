var db = require("../models");

// exports.create = function(req, res, next) {
exports.listAuthors = function(req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Post
  db.Authors.findAll({
    include: [db.Post]
  })
    .then(dbAuthor => res.status(201).send(dbAuthor))
    .catch(error => res.status(400).send(error));
};

exports.listAuthor = function(req, res) {
    db.Authors.findOne({
        where:{ id: req.params.id },
      include: [db.Post]
    })
      .then(dbAuthor => res.status(201).send(dbAuthor))
      .catch(error => res.status(400).send(error));
  };

exports.createAuthor = function(req, res) {
  db.Authors.create(req.body)
    .then(dbAuthor => res.status(201).send(dbAuthor))
    .catch(error => res.status(400).send(error));
};

exports.deleteAuthor = function(req, res) {
  db.Authors.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbAuthor => {
      if (dbAuthor) {
        db.Authors.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbAuthor => res.status(201).send("Success"))
          .catch(error => res.status(400).send(error));
      } else {
        res.status(200).send("User Does not exist");
      }
    })
    .catch(error => res.status(400).send("error"));
};

exports.updateAuthor = function(req, res) {
  db.Authors.findOne({
    where: {
      id: req.body.id
    }
  }).then(author => {
    if (author) {
      db.Authors.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbAuthor => res.json(dbAuthor))
      .catch(error => res.json(error));
    } else {
        res.json("error")
    }
  })
  .catch(error => console.log(error));
};


