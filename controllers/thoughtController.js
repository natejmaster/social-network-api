const { Thought, User } = require(`../models`);

module.exports = {
  async getThoughts(req, res) {
    try {
      const thought = await Thought.find({})
        .select('-__v');
      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v');

      !thought
        ? res.status(404).json({ message: 'No thought with that ID' })
        : res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // create a new thought
  async createThought(req, res) {
    try {
      const thought = Thought.create(req.body);
      const user = User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: thought._id } },
        { new: true }
      );

      !user
        ? res
          .status(404)
          .json({ message: 'Thought created, but found no user with that ID' })
        : res.json('Created the thought! 🎉');
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};
