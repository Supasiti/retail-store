const models = require('../models');

// get all categories
// return Array<Object>
const getAll = async () => {
  const categoriesData = await models.Category.findAll({
    include: [ models.Product ]
  });
  return categoriesData;
}

// get one product
// return Object
const getOne = async (productId) => {
  
}


// create new product
// return 
//  - either Product or ProductTags
const create = async (newProduct) => {
  
}

//----------------------------------------------------------------------------------------
// update product


// update the product 
const update = async (newProduct, productId) => {

  
  
}


//----------------------------------------------------------------------------------------
// delete product

const remove = async (productId) => {

}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}