const router = require('express').Router();

// deconstruct and import all methods related to User
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
} = require('../../controllers/user-controller');

// GET all and POST at /api/pizzas
router.route('/').get(getAllUsers).post(createUser);

// delete/update routes
router.route('/:id').get(getUserById).delete(deleteUser);

module.exports = router;
