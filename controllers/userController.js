const { User, Thought } = require(`../models`);

module.exports = {
  async getUsers(req, res) {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      console.error({ message: err });
      return res.status(500).json(err);
    }
  },
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId });

      !user
        ? res.status(404).json({ message: 'No user with that ID' })
        : res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new user
  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      res.status(500).json(err);
    }
  },

  // Update a user
async updateUser(req, res) {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},
// Remove a user
async deleteUser(req, res) {
  try {
    const user = await User.findByIdAndDelete(req.params.userId);

    if (!user) {
      return res.status(404).json({ message: 'No user with that ID' });
    }

    //Remove a user's associated thoughts
    await Thought.deleteMany({ userId: req.params.userId });

    res.json({ message: 'User and associated thoughts deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
},

  //Add a friend
  async addFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $addToSet: { friends: req.body.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Friend added successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  //Remove a friend
  async removeFriend(req, res) {
    try {
      const user = await User.findByIdAndUpdate(
        req.params.userId,
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({ message: 'Friend removed successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
