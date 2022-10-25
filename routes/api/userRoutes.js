const router = require('express').Router()
// requiring all the methods from the user controllers
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend,

} = require ('../../controllers/userController')

// getting all user and posting on the / route
router.route('/').get(getUsers).post(createUser);
// /:userId getting a single user by id, updating it with the body etc, and deleting it if needed
router.route('/:userId').get(getSingleUser).put(updateUser).delete(deleteUser);
// posting a friend on the route and since friends are assc with users the user will need to be deleted no the association
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports= router;