const models = require('../models');

// get all categories
// return Array<Category>
const getAll = async () => {
  const categoriesData = await models.Category.findAll({
    include: [ models.Product ]
  });
  return categoriesData;
}

// get one category
// return Category
const getOne = async (categoryId) => {
  const categories = await models.Category.findAll({
    where : { id : categoryId },
    include : [ models.Product]
  })
  return categories.length === 0? null : categories[0];
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