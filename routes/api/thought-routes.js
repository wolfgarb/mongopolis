const router = require('express').Router();

// deconstruct and import all methods related to User
const {
  getAllThoughts,
  getThoughtById,
  createThought,
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

module.exports = router;
