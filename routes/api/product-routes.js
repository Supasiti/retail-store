const router = require('express').Router();
const product = require('../../services/productServices')
const sanitize = require('../../services/sanitize')

// The `/api/products` endpoint

// get all products
router.get('/', async (req, res) => {
  try {
    const productsData = await product.getAll();
    const sanitized = sanitize(productsData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
});

// get one product
router.get('/:id', async (req, res) => {
  try {
    const productData = await product.getOne(req.params.id);
    const sanitized = sanitize(productData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
});

// create new product
router.post('/', async (req, res) => {
  /* req.body should look like this...
    {
      product_name: "Basketball",
      price: 200.00,
      stock: 3,
      tagIds: [1, 2, 3, 4]
    }
  */
  try {
    const newProductsData = await product.create(req.body);
    const sanitized = sanitize(newProductsData);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
});

// update product
router.put('/:id', async (req, res) => {
  try {
    const newProductTags = await product.update(req.body, req.params.id);
    const sanitized = sanitize(newProductTags);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete one product by its `id` value
  try {
    const idsRemoved = await product.remove(req.params.id);
    res.status(200).json({message : `${idsRemoved} entries has been removed`});
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
