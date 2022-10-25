const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/socialnetwork', {
    useNewUrlParser: true,
    // useUnifiedTypology: true
});

module.exports = mongoose.connection;