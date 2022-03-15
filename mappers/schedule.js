'use strict';
const _ = require('underscore');
const propertyMapper = require('./property');
const userMapper = require('./user');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          date: entity.date,
          startTime: entity.startTime,
          endTime: entity.endTime,
          status: entity.status,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
     };
     if (entity.user) {
          model.user = userMapper.toModel(entity.user);
     }
     if (entity.property) {
          model.property = propertyMapper.toModel(entity.property);
     }
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
