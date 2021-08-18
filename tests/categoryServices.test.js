const category = require('../services/categoryServices') 
const models = require('../models')
const sanitize = require('../services/sanitize')

describe('/services/categoryServices', () => {

  // get all categories
  describe('getAll', () => {
    it('should return all the categories in database, including products', async () => {

      const expectedCategoryNames = [
        'Shirts',
        'Shorts',
        'Music',
        'Hats',
        'Shoes' 
      ];

      const categoryData = await category.getAll();
      const resultNames = categoryData.map(category => category.category_name);
      const includeProductsProperty = categoryData
        .map(category => {
          // check if 'products' is a property of category
          return 'products' in category 
        })
        .some(includeProducts => includeProducts);

      expect(resultNames)
        .toEqual(expect.arrayContaining(expectedCategoryNames));
      expect(includeProductsProperty).toEqual(true);
    })
  })

  // get one category
  describe('getOne', () => {
    
    // when correct id is passed
    it ('should return a category with associated products if correct id is passed', async () => {
      const input = 1;
      const expectedId = 1
      const expectedClass = models.Category;

      const result = await category.getOne(input);
      const includeProducts = 'products' in result;

      expect(result).toBeInstanceOf(expectedClass);
      expect(result.id).toEqual(expectedId);
      expect(includeProducts).toBe(true);
    })

    // when id is not found
    it ('should return null if correct id is passed', async () => {
      const input = 1000;
      const expected = null

      const result = await category.getOne(input);

      expect(result).toBe(expected);
    })
  }) 

})