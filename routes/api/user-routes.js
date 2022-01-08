const router = require('express').Router();

// deconstruct and import all methods related to User
const {
  getAllUsers,
  createUser
} = require('../../controllers/user-controller');

// GET all and POST at /api/pizzas
router.route('/').get(getAllUsers).post(createUser);

module.exports = router;
