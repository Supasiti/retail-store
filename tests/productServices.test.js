const product = require('../services/productServices') 

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
      const includeTagsProperty = productsData.map(product => {
        return 'tags' in product // check if 'tags' is a property of product
      }).every(includeTags => includeTags);

      expect(resultNames)
        .toEqual(expect.arrayContaining(expectedProductNames));
      expect(resultCategories)
        .toEqual(expect.arrayContaining(expectedCategories));
      expect(productsData.length).toEqual(expectedLength);
      expect(includeTagsProperty).toEqual(true);
    })
  })

  
})