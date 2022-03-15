'use strict';
const _ = require('underscore');
const notificationMapper = require('./notification');
exports.toModel = (entity) => {
     const model = {
          id: entity.id,
          status: entity.status,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
          response: entity.response,
     };

     if (entity.notification) {
          model.notification = notificationMapper.toModel(entity.notification);
     }
     return model;
};

exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
