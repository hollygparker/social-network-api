const { User, Thought } = require('../models');


const userController = {
  // GET ALL users
  getUsers(req, res) {
    User.find()
      .select('-__v')
      .then((userDB) => {
        res.json(userDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // get single user by id 
  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .populate('friends')
      .populate('thoughts')
      .then((userDB) => {
        if(userDB) {
          res.json({ userDB })
        } else{
          res.status(404).json({ message: 'User not found with that ID' })
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // create a new post
  createUser(req, res) {
    User.create(req.body)
      .then((userDB) => res.json(userDB))
      .catch((err) => res.status(500).json(err));
  },

//   update user by id
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      {
        $set: req.body,
      },
      {
        runValidators: true,
        new: true,
      }
    )
      // return user data if not return the err
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
   // delete user by id 
   deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        // deleting all the thoughts associated with user id
        return Thought.deleteMany({ _id: { $in: dbUserData.thoughts } });
      })
      .then(() => {
        res.json({ message: 'User and the thought associated are deleted' });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // add friend 
  addFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
  // remove friend associated with a specific user
  removeFriend(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true })
      .then((userDB) => {
        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }
        res.json(userDB);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },
};

module.exports = userController;
