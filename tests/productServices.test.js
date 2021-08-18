const product = require('../services/productServices') 
const models = require('../models')
const sanitize = require('../services/sanitize')

describe('/services/productServices', () => {

  // get all products
  describe('getAll', () => {
    it('should return all the products in database, including categories and tags', async () => {

      const expectedProductNames = [
        'Plain T-Shirt',
        'Running Sneakers',
        'Branded Baseball Hat',
        'Top 40 Music Compilation Vinyl Record',
        'Cargo Shorts',
      ];

      const productsData = await product.getAll();
      const resultNames = productsData.map(product => product.product_name);
      const includeCategoryProperty = productsData
      .map(product => {
        // check if 'category' is a property of product
        return 'category' in product 
      }
      ).some(includeCategory => includeCategory);

      const includeTagsProperty = productsData
        .map(product => {
          // check if 'tags' is a property of product
          return 'tags' in product 
        }
        ).some(includeTags => includeTags);

      expect(resultNames)
        .toEqual(expect.arrayContaining(expectedProductNames));
      expect(includeTagsProperty).toEqual(true);
      expect(includeCategoryProperty).toEqual(true);
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
    it ('should return null if correct id is passed', async () => {
      const input = 1000;
      const expected = null

      const result = await product.getOne(input);

      expect(result).toBe(expected);
    })
  }) 


  // create and destroy
  describe('create and destroy', () => {
    it('should return an array of new ProductTags when passed with tag ids', async () => {

      const input = {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
        tagIds: [1, 2, 3, 4]
      }
      const expectedRowsRemoved = 1;
      
      const createdData = await product.create(input);
      const createdId = ( createdData instanceof Array )? createdData[0].productId : createdData.id;
      const createdProduct = await product.getOne(createdId);

      const rowsRemoved = await product.remove(createdId);
      
      expect(createdProduct.product_name).toEqual(input.product_name);
      expect(rowsRemoved).toEqual(expectedRowsRemoved);
    })

    it('should return a new Product when passed with no tag ids', async () => {

      const input = {
        product_name: "Basketball",
        price: 200.00,
        stock: 3,
      }
      const expectedRowsRemoved = 1;
      
      const createdData = await product.create(input);
      const createdId = ( createdData instanceof Array )? createdData[0].productId : createdData.id;
      const createdProduct = await product.getOne(createdId);

      console.log(createdId);
      const rowsRemoved = await product.remove(createdId);
      
      expect(createdProduct.product_name).toEqual(input.product_name);
      expect(rowsRemoved).toEqual(expectedRowsRemoved);
    })
  })
})