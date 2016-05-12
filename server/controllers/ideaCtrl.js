var Idea = require('../schemas/Idea.js');

module.exports = {
  create: function (req, res) {
    var idea = new Idea(req.body);
    idea.save(function (err, i) {
      return err ? res.status(500).send(err) : res.send(i)
    })
  },
  read: function (req, res) {
    Idea.find(req.query, function (err, i) {
      res.send(i);
    })
  },
  readById: function (req, res) {
    Idea.findById({_id: req.params.id}, function (err, i) {
      res.send(i);
    })
  },
  update: function (req, res) {
    if (!req.params.id) {
      return res.status(400).send('id query needed');
    }
    Idea.findByIdAndUpdate(req.params.id, req.body, function (err, i) {
        res.send(i);
    });
  },
  delete: function (req, res) {
    if(!req.params.id){
        return res.status(400).send('id query needed');
    }
    Idea.findByIdAndRemove({_id: req.params.id}, function (err, i) {
      res.send(i);
    });
  }
}
