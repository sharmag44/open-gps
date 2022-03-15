'use strict';
const _ = require('underscore');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          name: entity.name,
          price: entity.price,
          description: entity.description,
          noOfPublishings: entity.noOfPublishings,
          features: entity.features,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
     };
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
