const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

router.route('/:id/reactions')
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
