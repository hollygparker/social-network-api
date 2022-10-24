const { Thought, User } = require('../models');

thoughtController = {
    getThoughts(req, res) {
        Thought.find()
        .then((thoughtDB) => {
            res.json(thoughtDB);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
    }
}