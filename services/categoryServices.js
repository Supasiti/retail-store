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

// create new category
// return 
//  - Category
const create = async (newCategory) => {
  const category = await models.Category.create(newCategory);
  return category;
}

// return 
//  - number
const remove = async (categoryId) => {
  const rowsRemoved = await models.Category.destroy({
    where : { id : categoryId }
  });
  return rowsRemoved;
}

// update a category 
// return 
//  - Category
const update = async (newCategory, categoryId) => {
  const categoriesUpdated = await models.Category.update(newCategory, {
    where: { id: categoryId }
  })
  if (!categoriesUpdated[0]) return null;

  const updatedCategory = await getOne(categoryId);
  return updatedCategory;

  return category;
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}