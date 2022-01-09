const router = require('express').Router();

// deconstruct and import all methods related to User
const {
  getAllThoughts,
  getThoughtById,
  createThought,
  addReaction,
  deleteReaction,
  updateThought,
  deleteThought
} = require('../../controllers/thought-controller');

// GET routes
router.route('/').get(getAllThoughts).post(createThought);

// /api/thoughts/:thoughtId
router
  .route('/:id')
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:thoughtId/reactions').post(addReaction);

router.route('/:thoughtId/:reactionId').delete(deleteReaction);

module.exports = router;
