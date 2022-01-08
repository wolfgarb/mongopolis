const router = require('express').Router();

// deconstruct and import all methods related to User
const { createThought } = require('../../controllers/thought-controller');

// GET all and POST routes link together
// /api/thoughts/:userId
router.route('/:userId').post(createThought);

module.exports = router;
