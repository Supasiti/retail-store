const product = require('../services/productServices') 
const models = require('../models')

describe('/services/productServices', () => {

  // get all products
  describe('getAll', () => {
    it('should return all the products in database, including categories and tags', async () => {

      const expectedLength = 5;
      const expectedProductNames = [
        'Plain T-Shirt',
        'Running Sneakers',
        'Branded Baseball Hat',
        'Top 40 Music Compilation Vinyl Record',
        'Cargo Shorts',
      ];
      const expectedCategories = [
        'Shirts',
        'Shoes',
        'Hats',
        'Music',
        'Shorts'
      ];

      const productsData = await product.getAll();
      const resultNames = productsData.map(product => product.product_name);
      const resultCategories = productsData.map(product => product.category.category_name);
      const includeTagsProperty = productsData
        .map(product => {
          // check if 'tags' is a property of product
          return 'tags' in product 
        }
        ).every(includeTags => includeTags);

      expect(resultNames)
        .toEqual(expect.arrayContaining(expectedProductNames));
      expect(resultCategories)
        .toEqual(expect.arrayContaining(expectedCategories));
      expect(productsData.length).toEqual(expectedLength);
      expect(includeTagsProperty).toEqual(true);
    })
  })

  
  // get one product
  describe('getOne', () => {
    
    // when correct id is passed
    it ('should return a product with category and tags if correct id is passed', async () => {
      const input = 1;
      const expectedId = 1
      const expectedClass = models.Product;

      const result = await product.getOne(input);
      const includeCategory = 'category' in result;
      const includeTags = 'tags' in result;

      expect(result).toBeInstanceOf(expectedClass);
      expect(result.id).toEqual(expectedId);
      expect(includeCategory).toBe(true);
      expect(includeTags).toBe(true);
    })

      // when id is not found
      it ('should return null  if correct id is passed', async () => {
        const input = 1000;
        const expected = null
  
        const result = await product.getOne(input);
  
        expect(result).toBe(expected);
      })
  }) 
})