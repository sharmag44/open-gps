'use strict';
const _ = require('underscore');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          question: entity.question,
     };
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
