const { User, Thought } = require('../models');

module.exports = {
  // Get all users
  async getUsers(req, res) {
    try {
      const users = await User.find()
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .select('-__v');

      if (!users){
        return res.status(404).json("No users to get");
      }

      res.json(users);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Get a single user
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.id })
      .populate({path: 'thoughts', select: '-__v'})
      .populate({path: 'friends', select: '-__v'})
      .select('-__v');

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' })
      }
      res.json(user);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      if (!user){
        return res.status(404).json({ message: 'No user created'});
      }
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Delete a user and remove them from the course
  async deleteUser(req, res) {
    try {
      const user = await User.findOneAndDelete({ _id: req.params.id });

      if (!user) {
        return res.status(404).json({ message: 'No such user exists' });
      }

   /*    const thought = await Thought.findOneAndUpdate(
        { user: req.params.id },
        { $pull: { user: req.params.id } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({
          message: 'User deleted, but no thoughts found',
        });
      } */

      res.json({ message: 'User successfully deleted' });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // Add a friend to a user
  async addFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id},
        { $push: { friends: req.body } },
        { runValidators: true, new: true }
        .populate({path: 'friends', select: '-__v'})
        .select('-__v')
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Remove friend from friends list
  async deleteFriend(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.id },
        { $pull: { friends: req.body } },
        { runValidators: true, new: true }
        .populate({path: 'friends', select: '-__v'})
      );

      if (!user) {
        return res
          .status(404)
          .json({ message: 'No user found with that ID :(' });
      }

      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
};
