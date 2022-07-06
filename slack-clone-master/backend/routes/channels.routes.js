module.exports = (app) => {
    const channels = require('../controllers/channels.controller.js');

    // Create a new Channel
    app.post('/channels', channels.create);

    // Retrieve all Channels
    app.get('/channels', channels.findAll);

    // Retrieve a single Channel with channelId
    app.get('/channel/:channelId', channels.findOne);

    // Update a Channel with channelId
    app.put('/channel/:channelId', channels.update);

    // Delete a Channel with channelId
    app.delete('/channel/:channelId', channels.delete);
};