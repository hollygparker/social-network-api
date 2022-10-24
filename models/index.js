const Users = require('./User');
const Thoughts = require('./Thought');
const { Router } = require('express');

Router.use('/users', Users);
Router.use('/thoughts', Thoughts);

module.exports = { Users, Thoughts };