const { Thought, User } = require('../models');

const thoughtController = {
  // create a thought
  createThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        return User.findOneAndUpdate(
          { _id: params.userId },
          { $push: { thoughts: thoughtText } },
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
  }

  // add reaction/reply

  // remove reaction/reply

  // delete thought
};

module.exports = thoughtController;
