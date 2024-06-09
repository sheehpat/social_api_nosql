const router = require('express').Router();
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
} = require('../../controllers/thoughtController.js');

router.route('/').get(getThoughts);

// /api/thoughts/:id
router
  .route('/:id')
  .get(getSingleThought)
  .post(createThought)
  .put(updateThought)
  .delete(deleteThought);

module.exports = router;
