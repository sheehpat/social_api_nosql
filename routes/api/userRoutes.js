const router = require('express').Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require('../../controllers/userController');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:id
router.route('/:id').get(getSingleUser).delete(deleteUser);

// /api/users/:userId/friends
router.route('/:id/friends').post(addFriend);

// /api/users/:userId/friends/:friendId
router.route('/:id/friends/:friendId').delete(deleteFriend);

module.exports = router;
