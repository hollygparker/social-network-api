const { Thought, User } = require('../models');

thoughtController = {
    getThoughts(req, res) {
        console.log("GETTING ALL THOUGHTS")
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
            ? res.status(404).json({ message: 'No thought found!' })
            : res.json({ thoughtDB })
        )
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },

    createThought(req, res) {
        Thought.create(req.body)
        .then((thoughtDB) => {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $addToSet: { thoughts: thoughtDB._id } },
                { runValidators: true, new: true }
            )
        })

        .then((userDatabase) =>
            !userDatabase
                ? res
                    .status(404)
                    .json({ message: 'No user found!' })
                : res.json(userDatabase)
        )
        .catch((err) => res.status(400).json(err));
    },

    updateThought(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((thoughtDB) =>
                !thoughtDB
                    ? res.status(404).json({ message: 'No thought found!' })
                    : res.json(thoughtDB)
            )
            .catch((err) => res.status(500).json(err));
    },

    deleteThought(req, res) {
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thoughtDB) =>
                !thoughtDB
                    ? res.status(404).json({ message: 'No thought found with that ID' })
                    : User.findOneAndUpdate(
                        { thoughts: req.params.thoughtId },
                        { $pull: { thoughts: req.params.thoughtId } },
                        { new: true }
                    )
            )
            .then((userDatabase) =>
                !userDatabase
                    ? res.status(404).json({
                        message: 'Thought deleted',
                    })
                    : res.json({ message: 'Thought successfully deleted' })
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },

    createReaction(req, res) {
        console.log('create reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
            .then((thoughtDB) =>
            !thoughtDB
                ? res
                    .status(404)
                    .json({ message: 'No thought found with that ID' })
                : res.json(thoughtDB)
            )
            .catch((err) => res.status(500).json(err));
    },

    removeReaction(req, res) {
        console.log('remove reaction');
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            {$pull: { reactions: { reactions: req.params.reactionId } } },
            { runValidators: true, new: true }
        )
            .then((thoughtDB) =>
                !thoughtDB
                    ? res
                        .status(404)
                        .json({ message: 'No thought found with that ID' })
                    :res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
    },
};

module.exports = thoughtController;