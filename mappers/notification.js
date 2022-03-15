'use strict';
const _ = require('underscore');

exports.toModel = (entity) => {
     const model = {
          id: entity.id,
          title: entity.title,
          description: entity.description,
          titleHindi: entity.titleHindi,
          descriptionHindi: entity.descriptionHindi,
          entityName: entity.entityName,
          dataName: entity.dataName,
          imgUrl: entity.imgUrl,
          entityId: entity.entityId,
          dataId: entity.dataId,
          status: entity.status,
     };
     return model;
};

exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
