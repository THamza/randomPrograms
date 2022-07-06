const User = require('../models/User.js');
// create user
exports.create = (req, res) => {
  // Validate request
  if (!req.body.username) {
    return res.status(400).send({
      message: 'username can not be empty'
    });
  }

  const user = new User({
    username: req.body.username
  });

  // Save user in the database
  user
    .save()
    .then(data => {
      req.app.get('chatKit').createUser({
        id: data.username,
        name: data.username,
      })
        .then(() => {
          console.log('User created successfully');
        }).catch((err) => {
          console.log(err);
          res.status(500).send({
            message: err.message || 'Some error occurred while creating the user. (issue with chatkit)'
          });
        });
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the user.'
      });
    });

};

exports.authenticate = (req, res) => {
  const authData = req.app.get('chatKit').authenticate({
    userId: req.query.user_id
  });

  res.status(authData.status)
    .send(authData.body);
};

exports.findAll = (req, res) => {
  User.find()
    .then(users => {
      res.send(users);
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.'
      });
    });
};

//get a user by id
exports.findById = (req, res) => {
  User.findById(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with id ' + req.params.userId
      });
    });
};

//get a user by name
exports.findByName = (req, res) => {
  User.find({username: req.params.username})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with name ' + req.params.username
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with name ' + req.params.username
        });
      }
      return res.status(500).send({
        message: 'Error retrieving user with name ' + req.params.username
      });
    });
};

// Update a User identified by the userId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    console.log(req.body.channelIDs);
    return res.status(400).send({
      message: 'User content can not be empty'
    });
  }
  const updatedParams = {};
  if (req.body.username) updatedParams.username = req.body.username;
  if (req.body.friendIDs) updatedParams.friendIDs = req.body.friendIDs;
  if (req.body.channelIDs) updatedParams.channelIDs = req.body.channelIDs;

  // Find user and update it with the request body
  User.findByIdAndUpdate(req.params.userId, updatedParams, {new: true})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send(user);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User not found with id (objectID error)' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Error updating user with id ' + req.params.userId
      });
    });
};

exports.updateChannels = (req, res) => {
  if (!req.body.channelId || !req.params.username) {
    return res.status(400).send({
      message: 'body must have a userId and channelId'
    });
  }

  User.findOneAndUpdate({username: req.params.username}, {$addToSet: {channelIDs: req.body.channelId}}, {new: true})
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'No user found with that Id'
        });
      }
      return res.status(200).send({
        message: 'Success',
        user: user
      })
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        console.log('User not found with id (objectID error)');
        res.status(405).send({
          message: "User not found with id (objectID error)"
        });
      }
      console.log('Error updating user with id');
      res.status(405).send({
        message: "User not found with that id"
      });
    });


};

exports.findByIdAndAddChannelId = (userId, channelId) => {
  User.findOneAndUpdate({_id: userId}, {$push: {channelIDs: channelId}}, {new: true})
    .then(user => {
      if (!user) {
        console.log("no user found with that id")
      }
      return user
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        console.log('User not found with id (objectID error)');
        throw err;
      }
      console.log('Error updating user with id', userId);
      throw err;
    });
};
// Delete a user with the specified userId in the request
exports.delete = (req, res) => {
  User.findByIdAndRemove(req.params.userId)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      res.send({message: 'User deleted successfully!'});
    })
    .catch(err => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'User not found with id ' + req.params.userId
        });
      }
      return res.status(500).send({
        message: 'Could not delete user with id ' + req.params.userId
      });
    });
};
