const models = require('../models');

// get all tags
// return Array<Tag>
const getAll = async () => {
  const tagsData = await models.Tag.findAll({
    include: [ models.Product ]
  });
  return tagsData;
}

// get one tag
// return Tag
const getOne = async (tagId) => {
  const tags = await models.Tag.findAll({
    where : { id : tagId },
    include : [ models.Product]
  })
  return tags.length === 0? null : tags[0];
}

// create new tag
// return 
//  - Tag
const create = async (newTag) => {
  const tag = await models.Tag.create(newTag);
  return tag;
}

// return 
//  - number
const remove = async (tagId) => {
  const rowsRemoved = await models.Tag.destroy({
    where : { id : tagId }
  });
  return rowsRemoved;
}

// update a tag 
// return 
//  - Tag
const update = async (newTag, tagId) => {
  const tagsUpdated = await models.Tag.update(newTag, {
    where: { id: tagId }
  })
  if (!tagsUpdated[0]) return null;

  const updatedTag = await getOne(tagId);
  return updatedTag;
}

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove
}