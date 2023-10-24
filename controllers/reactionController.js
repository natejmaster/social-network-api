const { Thought, Reaction } = require('../models');

module.exports = {
  async createReaction(req, res) {
    try {
      const reaction = await Reaction.create(req.body);
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $push: { reactions: reaction._id } },
        { new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(reaction);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  
  async deleteReaction(req, res) {
    try {
      const reaction = await Reaction.findByIdAndDelete(req.params.reactionId);
      if (!reaction) {
        return res.status(404).json({ message: 'No reaction with that ID' });
      }

      // Remove the reference to the reaction in the thought
      const thought = await Thought.findByIdAndUpdate(
        req.params.thoughtId,
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      res.json({ message: 'Reaction deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
