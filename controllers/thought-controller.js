const { Thought, User } = require('../models');

const thoughtController = {
  // GET all thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .populate({
        path: 'user',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // GET single thought by _id
  getThoughtById({ params }, res) {
    Thought.findOne({ _id: params.id })
      .populate({
        path: 'user',
        select: '-__v'
      })
      .select('-__v')
      .sort({ _id: -1 })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // create a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { username: body.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this ID!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },

  // add reaction (reply)
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      {
        new: true,
        runValidators: true
      }
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  // delete reaction
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },

  // update thought by _id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true
    })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // delete thought
  deleteThought({ params, body }, res) {
    Thought.findOneAndDelete({ _id: params.id })
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'no thought found with this ID' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = thoughtController;
