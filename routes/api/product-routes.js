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
  
  // Product.create(req.body)
  //   .then((product) => {
  //     // if there's product tags, we need to create pairings to bulk create in the ProductTag model
  //     if (req.body.tagIds.length) {
  //       const productTagIdArr = req.body.tagIds.map((tag_id) => {
  //         return {
  //           product_id: product.id,
  //           tag_id,
  //         };
  //       });
  //       return ProductTag.bulkCreate(productTagIdArr);
  //     }
  //     // if no product tags, just respond
  //     res.status(200).json(product);
  //   })
  //   .then((productTagIds) => res.status(200).json(productTagIds))
  //   .catch((err) => {
  //     console.log(err);
  //     res.status(400).json(err);
  //   });
});

// update product
router.put('/:id', async (req, res) => {

  try {
    const updatedProductTags = await product.update(req.body, req.params.id);
    const sanitized = sanitize(updatedProductTags);
    res.status(200).json(sanitized);
  } catch (err) {
    res.status(400).json(err);
  }

  // update product data
  // Product.update(req.body, {
  //   where: {
  //     id: req.params.id,
  //   },
  // })
  //   .then((product) => {
  //     // find all associated tags from ProductTag
  //     return ProductTag.findAll({ where: { product_id: req.params.id } });
  //   })
  //   .then((productTags) => {
  //     // get list of current tag_ids
  //     const productTagIds = productTags.map(({ tag_id }) => tag_id);
  //     // create filtered list of new tag_ids
  //     const newProductTags = req.body.tagIds
  //       .filter((tag_id) => !productTagIds.includes(tag_id))
  //       .map((tag_id) => {
  //         return {
  //           product_id: req.params.id,
  //           tag_id,
  //         };
  //       });
  //     // figure out which ones to remove
  //     const productTagsToRemove = productTags
  //       .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
  //       .map(({ id }) => id);

  //     // run both actions
  //     return Promise.all([
  //       ProductTag.destroy({ where: { id: productTagsToRemove } }),
  //       ProductTag.bulkCreate(newProductTags),
  //     ]);
  //   })
  //   .then((updatedProductTags) => res.json(updatedProductTags))
  //   .catch((err) => {
  //     // console.log(err);
  //     res.status(400).json(err);
  //   });
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
