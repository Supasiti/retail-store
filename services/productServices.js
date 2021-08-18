const { Model, DataTypes } = require('sequelize');
const models = require('../models');
const sanitize = require('./sanitize');

// get all products
// return Array<Object>
const getAll = async () => {
  const productsData = await models.Product.findAll({
    include: [ models.Category, models.Tag ]
  });
  const sanitizedProductsData = sanitize(productsData);
  return sanitizedProductsData;
}

// get one product
// return Object
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