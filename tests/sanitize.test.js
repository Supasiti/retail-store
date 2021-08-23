const models = require('../models');
const sanitize = require('../services/sanitize');


describe('services/santiize', () => {

  // when pass an instance of Model
  it('should return a cleaned object when an instance of Tag is passed', () => {

    const input = models.Tag.build({ tag_name: "hello" })
    const expected = { 
      id: null,
      tag_name: "hello" 
    }

    const result = sanitize(input);

    expect(result).toEqual(expected);
  })

  // when pass an array of instances of Model
  it('should return a list of cleaned objects when an array of Tags is passed', () => {

    const input = models.Tag.build([
      { tag_name: "hello" },
      { tag_name: "world" },
    ])
    const expected = [
      { 
        id: null,
        tag_name: "hello" 
      },
      { 
        id: null,
        tag_name: "world" 
      }
    ]

    const result = sanitize(input);

    expect(result).toEqual(expect.arrayContaining(expected));
  })

  // when pass a wrong argument
  it('throw if you pass a wrong type of argument', () => {

    const input = { tag_name: "hello" };
    
    expect(() => {sanitize(input);}).toThrow();
  })
})
