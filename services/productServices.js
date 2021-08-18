const { Model, DataTypes } = require('sequelize');
const models = require('../models');
const sanitize = require('./sanitize');

// get all products
// return Array<Object>
const getAll = async () => {
  const productsData = await models.Product.findAll({
    include: [ models.Category, models.Tag ]
  });
  return productsData;
}

// get one product
// return Object
const getOne = async (productId) => {
  const products = await models.Product.findAll({
    where : { id : productId },
    include : [ models.Category, models.Tag ]
  })
  return products.length === 0? null : products[0];
}


// create a product tag pairing with new product and new tags ids
const createProductTags = async (product, newTagIds) => {
  

  if (product.id && newTagIds.length) {
    const productTagIdArr = newTagIds.map((tag_id) => {
      return {
        product_id: product.id,
        tag_id,
      };
    });
    const result =  await models.ProductTag.bulkCreate(productTagIdArr);
    return result;
  }
}

// create new product
// return 
//  - either Product or ProductTags
const create = async (newProduct) => {
  const product = await models.Product.create(newProduct);
  if ( 'tagIds' in newProduct && newProduct.tagIds.length) {
    const newProductTags = await createProductTags(product, newProduct.tagIds);
    return newProductTags;
  } else {
    return product;
  }
}

//----------------------------------------------------------------------------------------
// update product

// get all associated product tags
const getAllAssociatedProductTags = async (productId) => {
  const productTags = await models.ProductTag.findAll({ where: { product_id: productId }});
  return productTags;
}

//  get new product tags
const getNewProductTags =  (newProduct, oldProductTagIds, productId) => {
  return newProduct.tagIds
    .filter((tag_id) => !oldProductTagIds.includes(tag_id))
    .map((tag_id) => {
      return {
        product_id: productId,
        tag_id,
      };
    });
}

//  get product tag ids to remove
const getProductTagIdsToRemove = (oldProductTags, newTagsIds) => {
  return oldProductTags
    .filter(({ tag_id }) => !newTagsIds.includes(tag_id))
    .map(({ id }) => id);
}

// update the product 
const update = async (newProduct, productId) => {

  const product = await models.Product.update(newProduct, {
    where: { id: productId }
  })
  const currentProductTags = await getAllAssociatedProductTags(productId);
  const currentProductTagIds = currentProductTags.map(({ tag_id }) => tag_id);
  const newProductTags = getNewProductTags(newProduct, currentProductTagIds, productId);
  const productTagIdsToRemove = getProductTagIdsToRemove(currentProductTags, newProduct.tagIds)

  const updatedProductTags = await Promise.all([
      ProductTag.destroy({ where: { id: productTagIdsToRemove } }),
      ProductTag.bulkCreate(newProductTags),
    ]);

  return updatedProductTags;
}


//----------------------------------------------------------------------------------------
// delete product

const remove = async (productId) => {
  const productsRemoved = await models.Product.destroy({
    where : { id: productId }
  })
  return productsRemoved;
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}