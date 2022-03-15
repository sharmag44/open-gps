'use strict';
const _ = require('underscore');
const userMapper = require('./user');
const propertyMapper = require('./property');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          lastMessage: entity.lastMessage,
          user1MessageCount: entity.user1MessageCount,
          user2MessageCount: entity.user2MessageCount,
          lastMessageUpdateTime: entity.lastMessageUpdateTime,
          status: entity.status,
          user1name: entity.user1name,
          user2name: entity.user2name,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
     };
     if (entity.property) {
          model.property = propertyMapper.toModel(entity.property);
     }
     if (entity.currentUserId) {
          if (entity.user1 && entity.user2) {
               const user1 =
                    entity.user1Id === entity.currentUserId ? 'user1' : 'user2';
               const user2 =
                    entity.user1Id === entity.currentUserId ? 'user2' : 'user1';
               model.user1 = userMapper.toModel(entity[user1]);
               model.user1Id = model.user1.id;
               model.user1MessageCount = entity[`${user1}MessageCount`];

               model.user2 = userMapper.toModel(entity[user2]);
               model.user2Id = model.user2.id;
               model.user2MessageCount = entity[`${user2}MessageCount`];
          }
     }
     if (entity.blockedBy) {
          model.blockedBy = userMapper.toModel(entity.blockedBy);
     }
     return model;
};

exports.toSearchModel = (entities, userId) => {
     //@ts-ignore
     return _.map(
          entities.map((e) => {
               e.currentUserId = userId;
               return e;
          }),
          exports.toModel
     );
};
