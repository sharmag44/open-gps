'use strict';
const _ = require('underscore');

exports.toModel = (entity) => {
     const model = {
          id: entity.id,
          message: entity.message,
          userId: entity.userId,
          toUserId: entity.toUserId,
          chatId: entity.chatId,
          isMyMessage: entity.isMyMessage,
          type: entity.type,
          fileName: entity.fileName,
          fileType: entity.fileType,
          fileUrl: entity.fileUrl,
          scheduleId: entity.scheduleId,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
     };

     return model;
};

exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
