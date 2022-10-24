const Users = require('./Users');
const Thoughts = require('./Thoughts');
const { Router } = require('express');

Router.use('/users', Users);
Router.use('/thoughts', Thoughts);

module.exports = { Users, Thoughts };