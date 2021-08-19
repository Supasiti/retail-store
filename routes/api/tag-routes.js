const router = require('express').Router();
const tag = require('../../services/tagServices')
const sanitize = require('../../services/sanitize')

// The `/api/tags` endpoint

const handleRequest = async (promise, res) => {
  try {
    const data = await promise;
    const sanitized = sanitize(data);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
}

// find all tags
router.get('/', (req, res) => {  
  try {
    const tagsData = await tag.getAll();
    const sanitized = sanitize(tagsData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', (req, res) => {
  handleRequest(tag.getOne(req.params.id), res)
});

// create a new tag
router.post('/', (req, res) => {
  handleRequest(tag.create(req.body), res)
});

// update a tag's name by its `id` value
router.put('/:id', (req, res) => {
  handleRequest(tag.update(req.body, req.params.id), res)
});

// delete on tag by its `id` value
router.delete('/:id', (req, res) => {
  handleRequest(tag.remove(req.params.id), res)
});

module.exports = router;
