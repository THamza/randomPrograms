const Channel = require('../models/Channel.js');
const users = require('../controllers/users.controller.js');

// create channel
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Channel name can not be empty"
    });
  }

  // Create a Channel
  const channel = new Channel({
    name: req.body.name,
    ownerId: req.body.ownerId
  });

  // Save Channel in the database
  channel.save()
    .then(data => {
      const user = users.findByIdAndAddChannelId(req.body.ownerId, data._id);
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Channel."
      });
    });
};

// find all channels
exports.findAll = (req, res) => {
  Channel.find()
    .then(channels => {
      res.send(channels);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Error occurred while creating the Channel."
      })
    })
};

// find specific channel
exports.findOne = (req, res) => {
  Channel.findById(req.params.channelId)
    .then(channel => {
      if (!channel) {
        return res.status(404).send({
          message: "Channel not found with id " + req.params.channelId
        });
      }
      res.send(channel);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Channel not found with id " + req.params.channelId
        });
      }
      return res.status(500).send({
        message: "Channel retrieving note with id " + req.params.channelId
      });
    });
};

// update channel
exports.update = (req, res) => {
  // Validate Request
  if (!req.body.name) {
    return res.status(400).send({
      message: "Channel name can not be empty"
    });
  }

  // Find note and update it with the request body
  Channel.findByIdAndUpdate(req.params.channelId, {
    name: req.body.name
  }, {new: true})
    .then(channel => {
      if (!channel) {
        return res.status(404).send({
          message: "Channel not found with id " + req.params.channelId
        });
      }
      res.send(channel);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Note not found with id " + req.params.channelId
        });
      }
      return res.status(500).send({
        message: "Error updating note with id " + req.params.channelId
      });
    });
};

// channel delete
exports.delete = (req, res) => {
  Channel.findByIdAndRemove(req.params.channelId)
    .then(channel => {
      if (!channel) {
        return res.status(404).send({
          message: "Channel not found with id " + req.params.channelId
        });
      }
      res.send({message: "Channel deleted successfully!"});
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: "Channel not found with id " + req.params.channelId
        });
      }
      return res.status(500).send({
        message: "Could not delete Channel with id " + req.params.channelId
      });
    });
};
