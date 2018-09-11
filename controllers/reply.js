var db = require("../models");

exports.listReplies= function(req, res) {
  db.Reply.findAll({
    // include: [db.User]
  })
    .then(dbReply => res.status(201).send(dbReply))
    .catch(error => res.status(400).send(error));
};

exports.listReply = function(req, res) {
    db.Reply.findOne({
        where:{ id: req.params.id},
    //   include: [db.User]
    })
      .then(dbReply => res.status(201).send(dbReply))
      .catch(error => res.status(400).send(error));
  };

exports.createReply = function(req, res) {
  db.Reply.create(req.body)
    .then(dbReply => res.status(201).send(dbReply))
    .catch(error => res.status(400).send(error));
};

exports.deleteReply = function(req, res) {
  db.Reply.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(dbReply => {
      if (dbReply) {
        db.Reply.update({
          where: {
            id: req.params.id
          }
        })
          .then(dbReply => res.status(201).send("Success"))
          .catch(error => res.status(400).send(error));
      } else {
        res.status(200).send("User Does not exist");
      }
    })
    .catch(error => res.status(400).send("error"));
};

exports.updateReply = function(req, res) {
  db.Reply.findOne({
    where: {
      id: req.body.id
    }
  }).then(author => {
    if (author) {
      db.Reply.update(req.body, {
        where: {
          id: req.body.id
        }
      })
      .then(dbReply => res.json(dbReply))
      .catch(error => res.json(error));
    } else {
        res.json("error")
    }
  })
  .catch(error => console.log(error));
};


