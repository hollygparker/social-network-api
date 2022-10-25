const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialnetwork', {
    useNewUrlParser: true,
    useUnifiedTypology: true
});

module.exports = mongoose.connection;