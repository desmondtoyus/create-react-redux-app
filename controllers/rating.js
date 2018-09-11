var db = require("../models");

exports.listRatings = function(req, res) {
  db.Rating.findAll({
    // include: [db.User]
  })
    .then(dbRating => res.status(201).send(dbRating))
    .catch(error => res.status(400).send(error));
};

exports.listRating = function(req, res) {
    db.Rating.findOne({
        where:{ id: req.params.id},
    //   include: [db.User]
    })
      .then(dbRating => res.status(201).send(dbRating))
      .catch(error => res.status(400).send(error));
  };

exports.createRating = function(req, res) {
  db.Rating.create(req.body)
    .then(dbRating => res.status(201).send(dbRating))
    .catch(error => res.status(400).send(error));
};

exports.deleteRating = function(req, res) {
  db.Rating.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbRating => {
      if (dbRating) {
        db.Rating.update({
          where: {
            id: req.params.id
          }
        })
          .then(dbRating => res.status(201).send("Success"))
          .catch(error => res.status(400).send(error));
      } else {
        res.status(200).send("User Does not exist");
      }
    })
    .catch(error => res.status(400).send("error"));
};

exports.updateRating = function(req, res) {
  db.Rating.findOne({
    where: {
      id: req.body.id
    }
  }).then(author => {
    if (author) {
      db.Rating.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbRating => res.json(dbRating))
      .catch(error => res.json(error));
    } else {
        res.json("error")
    }
  })
  .catch(error => console.log(error));
};


