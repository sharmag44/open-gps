'use strict';
const _ = require('underscore');
const questionMapper = require('../mappers/question');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          title: entity.title,
     };
     if (entity.questions) {
          model.questions = questionMapper.toSearchModel(entity.questions);
     }
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
