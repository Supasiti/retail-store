const tag = require('../services/tagServices') 
const models = require('../models')


describe('/services/tagServices', () => {

  // get all categories
  describe('getAll', () => {
    it('should return all the tags in database, including products', async () => {

      const expectedTagNames = [
        'rock music', 'pop music', 'blue', 'red', 'green', 'white', 'gold', 'pop culture' 
      ];

      const tagData = await tag.getAll();
      const resultNames = tagData.map(tag => tag.tag_name);
      const includeProductsProperty = tagData
        .map(tag => {
          // check if 'products' is a property of tag
          return 'products' in tag 
        })
        .some(includeProducts => includeProducts);

      expect(resultNames)
        .toEqual(expect.arrayContaining(expectedTagNames));
      expect(includeProductsProperty).toEqual(true);
    })
  })

  // get one category
  describe('getOne', () => {
    
    // when correct id is passed
    it ('should return a tag with associated products if correct id is passed', async () => {
      const input = 1;
      const expectedId = 1
      const expectedClass = models.Tag;

      const result = await tag.getOne(input);
      const includeProducts = 'products' in result;

      expect(result).toBeInstanceOf(expectedClass);
      expect(result.id).toEqual(expectedId);
      expect(includeProducts).toBe(true);
    })

    // when id is not found
    it ('should return null if correct id is passed', async () => {
      const input = 1000;
      const expected = null

      const result = await tag.getOne(input);

      expect(result).toBe(expected);
    })
  }) 

  // create and destroy category
  describe('create and destroy', () => { 
    it('should return a new category', async () => {

      const input = { tag_name: "purple" }
      const expectedRowsRemoved = 1;
      
      const createdData = await tag.create(input);
      const createdTag = await tag.getOne(createdData.id);
      const rowsRemoved = await tag.remove(createdData.id);
      
      expect(createdTag.tag_name).toEqual(input.tag_name);
      expect(rowsRemoved).toEqual(expectedRowsRemoved);
    })
  })


  // update category
  describe('update', () => { 
    it('should return a new category', async () => {

      const firstInput  = { tag_name: "purple" }
      const secondInput = { tag_name: "maroon" }
      const expectedAffectedRows = 1;

      const createdData = await tag.create(firstInput);
      const affectedRows = await tag.update(secondInput, createdData.id);
      const updatedData = await tag.getOne(createdData.id);
      const rowsRemoved = await tag.remove(createdData.id);
      
      expect(updatedData.tag_name).toEqual(secondInput.tag_name);
      expect(affectedRows[0]).toEqual(expectedAffectedRows);
    })
  })
})