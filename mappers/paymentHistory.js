'use strict';
const _ = require('underscore');
const userMapper = require('./user');
const planMapper = require('./plan');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          transactionData: entity.transactionData,
          paymentTime: entity.paymentTime,
          paymentStatus: entity.paymentStatus,
          amount: entity.amount,
          createdAt: entity.createdAt,
          updatedAt: entity.updatedAt,
     };
     if (entity.user) {
          model.user = userMapper.toModel(entity.user);
     }
     if (entity.plan) {
          model.plan = planMapper.toModel(entity.plan);
     }
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
