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
    },

    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .then(async (thoughtDB) =>
        !thoughtDB
            ? res.status(404).json({ message: 'No thought found with that ID' })
            : res.json({ thoughtDB })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    }
}