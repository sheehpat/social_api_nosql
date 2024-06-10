const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  async getThoughts (req, res) {
    try {
      const thoughts = await Thought.find({}).populate({
        path: "reactions",
        select: "-__V",
      }).select("-__V")
      .sort({_id: -1})

      if (!thoughts) {
        return res.status(404).json({ message: "No Thoughts"})
      }

      res.json(thoughts);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Get a thought
  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.id })
        .populate({
          path: "reactions",
          select: "-__V",
        }).select("-__V");

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Create a thought
  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      if (!thought){
        return res.status(404).json({ message: "Thought was not successfully created"});
      }

      User.findOneAndUpdate({_id: req.params.id}, {$push: {thoughts: thought.id}}, {new: true});
      res.json(thought);
    } catch (err) {
      console.log(err);
      return res.status(500).json(err);
    }
  },
  // Delete a thought
  async deleteThought(req, res) {
    try {
      const thought = await Thought.findOneAndDelete({ _id: req.params.id });

      if (!thought) {
        res.status(404).json({ message: 'No thought with that ID' });
      }
      res.json({ message: `${thought} was deleted!`})
    } catch (err) {
      res.status(500).json(err);
    }
  },
  // Update a thought
  async updateThought(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.id },
        { $set: req.body },
        { runValidators: true, new: true }
      );

      if (!thought) {
        res.status(404).json({ message: 'No thought with this id!' });
      }

      res.json(thought);
    } catch (err) {
      res.status(500).json(err);
    }
  },
  async addReaction(req, res){
    try {
      const reaction = Thought.findOneAndUpdate({
        _id: req.params.id}, { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true });

        if (!reaction){
          return res.status(404).json({ message: "No Thought with that ID found"});
        }

        res.json(reaction);

      } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
  },

  async deleteReaction(req, res){
    try {
      const reaction = Thought.findOneAndUpdate({_id: req.params.id},
        {$pull: {reactions: {_id: req.params.id}}},
        {new: true});

      if (!reaction){
        return res.status(404).json({ message: "No reaction with that ID"});
      }  

      res.json(`Reaction with id: ${reaction.id}, succesfully deleted`);
    } catch (error) {
      
    }
  }
};
