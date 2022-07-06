module.exports = app => {
  const users = require('../controllers/users.controller.js');

  // Create a new User
  app.post('/users', users.create);

  //authenticate user with chatkit
  app.post('/users/auth', users.authenticate);

  // Retrieve all Users
  app.get('/users', users.findAll);

  // Retrieve a single User with userId
  app.get('/users/:userId', users.findById);

  //Retrieve a user by name
  app.get('/users/username/:username', users.findByName);

  // Update a User with userId
  app.put('/users/:userId', users.update);

  //Update a users channels
  app.patch('/users/channels/:username', users.updateChannels);

  // Delete a User with userId
  app.delete('/users/:userId', users.delete);
};
