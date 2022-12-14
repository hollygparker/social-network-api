const router = require('express').Router()
// requiring all the methods from the thought controllers
const {
    getThoughts,
    getSingleThought,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    removeReaction,

} = require ('../../controllers/thoughtController')

// getting all thoughts and posting on the / route
router.route('/').get(getThoughts).post(createThought);
// /:thoughtId getting a single thought by id, updating it with the body etc, and deleting it if needed
router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);
// posting a reaction to the route /:thoughtId/reactions
router.route('/:thoughtId/reactions').post(createReaction);
// deleting a reaction on the route :thoughtId/reactions/:reactionId reactions are assc with thoughts
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction)

module.exports = router;