const router = require('express').Router();
const category = require('../../services/categoryServices')
const sanitize = require('../../services/sanitize')

// The `/api/categories` endpoint

// find all categories
router.get('/', (req, res) => {
  try {
    const categoriesData = await category.getAll();
    const sanitized = sanitize(categoriesData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  // create a new category
});

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
