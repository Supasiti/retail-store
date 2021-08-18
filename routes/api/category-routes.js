const router = require('express').Router();
const category = require('../../services/categoryServices')
const sanitize = require('../../services/sanitize')

// The `/api/categories` endpoint

const handleRequest = async (promise, res) => {
  try {
    const data = await promise;
    const sanitized = sanitize(data);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
}


// find all categories
router.get('/', (req, res) => {
  try {
    const categoriesData = await category.getAll();
    const sanitized = sanitize(categoriesData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find one category by its `id` value
router.get('/:id', (req, res) => {
  handleRequest(category.getOne(req.params.id), res)
});

// create a category
router.post('/', (req, res) => {
  handleRequest(category.create(req.body), res)
});

// update a category by its `id` value
router.put('/:id', (req, res) => {
  handleRequest(category.update(req.body, req.params.id), res)
});

// delete a category by its `id` value
router.delete('/:id', (req, res) => {
  handleRequest(category.remove(req.params.id), res)
});

module.exports = router;
