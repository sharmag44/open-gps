'use strict';
const _ = require('underscore');
const userMapper = require('./user');
const formMapper = require('./form');
exports.toModel = (entity) => {
     if (Array.isArray(entity)) return this.toSearchModel(entity);
     const model = {
          id: entity.id,
          name: entity.name,
          type: entity.type,
          zip: entity.zip,
          city: entity.city,
          state: entity.state,
          address: entity.address,
          squareFootage: entity.squareFootage,
          price: entity.price,
          attendings: entity.attendings,
          description: entity.description,
          noOfBedrooms: entity.noOfBedrooms,
          noOfBathrooms: entity.noOfBathrooms,
          noOfParkingSpots: entity.noOfParkingSpots,
          otherAreas: entity.otherAreas,
          scheduleStartDate: entity.scheduleStartDate,
          scheduleEndDate: entity.scheduleEndDate,
          scheduleStartTime: entity.scheduleStartTime,
          scheduleEndTime: entity.scheduleEndTime,
          isMondayAvailable: entity.isMondayAvailable,
          isTuesdayAvailable: entity.isTuesdayAvailable,
          isWednesdayAvailable: entity.isWednesdayAvailable,
          isThursdayAvailable: entity.isThursdayAvailable,
          isFridayAvailable: entity.isFridayAvailable,
          isSaturdayAvailable: entity.isSaturdayAvailable,
          isSundayAvailable: entity.isSundayAvailable,
          locationCoordinates: entity.locationCoordinates,
          autoApproval: entity.autoApproval,
          images: entity.images,
          status: entity.status,
          views: entity.views,
          createdAt: entity.createdAt,
          isLiked:
               entity.propertyLikes && entity.propertyLikes.length > 0
                    ? true
                    : false,
     };

     if (entity.user) {
          model.user = userMapper.toModel(entity.user);
     }
     if (entity.forms) {
          model.forms = formMapper.toSearchModel(entity.forms);
     }
     return model;
};
exports.toSearchModel = (entities) => {
     return _.map(entities, exports.toModel);
};
