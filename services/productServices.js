const models = require('../models');

// get all products
const getAll = async () => {
  const productsData = await models.Product.findAll({
    include: [ models.Category, models.Tag ]
  });
  const sanitizedProductsData = productsData.map(product => {
    return product.get({ plain : true });
  })
  return sanitizedProductsData;
}

// get one product
const getOne = async (productId) => {

}

// create new product
const create = async () => {

}

// update product
const update = async () => {

}

// delete product
const remove = async () => {

}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}