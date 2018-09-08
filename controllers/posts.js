var db = require("../models");

// exports.create = function(req, res, next) {
exports.listPosts = function(req, res) {
  // Here we add an "include" property to our options in our findAll query
  // We set the value to an array of the models we want to include in a left outer join
  // In this case, just db.Posts
  db.Posts.findAll({
    include: [db.Authors]
  })
    .then(dbPost => res.status(201).send(dbPost))
    .catch(error => res.status(400).send(error));
};

exports.listPost = function(req, res) {
    db.Posts.findOne({
        where:{ id: req.params.id },
      include: [db.Authors]
    })
      .then(dbPost => res.status(201).send(dbPost))
      .catch(error => res.status(400).send(error));
  };

exports.createPost = function(req, res) {
  db.Posts.create(req.body)
    .then(dbPost => res.status(201).send(dbPost))
    .catch(error => res.status(400).send(error));
};

exports.deletePost = function(req, res) {
  db.Posts.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbPost => {
      if (dbPost) {
        db.Posts.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(dbPost => res.status(201).send("Success"))
          .catch(error => res.status(400).send(error));
      } else {
        res.status(200).send("User Does not exist");
      }
    })
    .catch(error => res.status(400).send("error"));
};

exports.updatePost = function(req, res) {
  db.Posts.findOne({
    where: {
      id: req.body.id
    }
  }).then(author => {
    if (author) {
      db.Posts.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbPost => res.json(dbPost))
      .catch(error => res.json(error));
    } else {
        res.json("error")
    }
  })
  .catch(error => console.log(error));
};


