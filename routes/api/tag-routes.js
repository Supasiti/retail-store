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
router.get('/', async (req, res) => {  
  try {
    const tagsData = await tag.getAll();
    const sanitized = sanitize(tagsData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(500).json(err);
  }
});

// find a single tag by its `id`
router.get('/:id', async (req, res) => {
  await handleRequest(tag.getOne(req.params.id), res)
});

// create a new tag
router.post('/', async (req, res) => {
  await handleRequest(tag.create(req.body), res)
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  await handleRequest(tag.update(req.body, req.params.id), res)
});

// delete on tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const rowsRemoved = await tag.remove(req.params.id);
    res.status(200).json({ message : `${rowsRemoved} entries has been removed` });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
