'use strict';
const model = 'schedule';

let mapper = require(`../mappers/${model}`);
const updationScheme = require('../helpers/updateEntities');
const { baseServices } = require('../services');
const { Op } = require('sequelize');
const moment = require('moment');
const { IfEmpty } = require('../services/baseServices');
const {
     newScheduleRequest,
     scheduleRequestUpdated,
} = require('../services/notificationServices');

exports.create = async (req, res) => {
     try {
          const { userId, propertyId, date, startTime, endTime } = req.body;

          // empty checks
          baseServices.IfEmpty(userId, 'userId');
          baseServices.IfEmpty(propertyId, 'propertyId');
          baseServices.IfEmpty(date, 'date');
          baseServices.IfEmpty(startTime, 'startTime');
          baseServices.IfEmpty(endTime, 'endTime');

          const schedule = await db.schedule.findOne({
               where: {
                    date,
                    startTime,
                    endTime,
                    propertyId,
                    status: 'approved',
               },
          });

          if (schedule) throw 'Schedule already exists';

          const createdModel = await db[model].create(req.body);
          await newScheduleRequest({ scheduleId: createdModel.id });

          return res.data(mapper.toModel(createdModel));
     } catch (error) {
          res.failure(error);
     }
};

exports.update = async (req, res) => {
     try {
          const { id } = req.params;
          const { status } = req.body;

          let foundModel = await baseServices.IfExists(model, {
               id,
          });

          //updating rest details

          foundModel = updationScheme.update(req.body, foundModel);
          foundModel = await foundModel.save();
          if (status === 'approved') {
               db.schedule.update(
                    {
                         status: 'rejected',
                    },
                    {
                         where: {
                              id: {
                                   [Op.ne]: foundModel.id,
                              },
                              date: foundModel.date,
                              startTime: foundModel.startTime,
                              endTime: foundModel.endTime,
                              propertyId: foundModel.propertyId,
                         },
                    }
               );
          }
          if (status) {
               await scheduleRequestUpdated({ scheduleId: foundModel.id });
          }
          return res.data(mapper.toModel(foundModel));
     } catch (error) {
          res.failure(error);
     }
};

exports.get = async (req, res) => {
     try {
          const { id } = req.params;
          //find bank account if exists
          const foundModel = await baseServices.IfExists(model, {
               id,
          });

          return res.data(mapper.toModel(foundModel));
     } catch (e) {
          return res.failure(e);
     }
};

exports.delete = async (req, res) => {
     try {
          //find user if exists
          const foundModel = await baseServices.IfExists(model, {
               id: req.params.id,
          });
          await foundModel.destroy();
          return res.success(`model deleted successfully `);
     } catch (err) {
          return res.failure(err);
     }
};

exports.search = async (req, res) => {
     try {
          const { sortOrderWithProperty, ids } = req.query;
          let pageNo = req.query.pageNo ? Number(req.query.pageNo) : 1;
          let serverPaging = req.query.serverPaging == 'false' ? false : true;
          let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
          let offset = pageSize * (pageNo - 1);
          let totalRecords = 0;

          let query = {
               include: [],
          };
          if (serverPaging) {
               query.limit = pageSize;
               query.offset = offset;
          }

          let where = {};

          if (ids) {
               where.id = {
                    [Op.in]: ids.split(','),
               };
          }
          if (sortOrderWithProperty) {
               query.order = [sortOrderWithProperty.split(',')];
          } else {
               query.order = [['id', 'DESC']];
          }
          query.where = where;
          const result = await db[model].findAndCountAll(query);
          return res.page(
               mapper.toSearchModel(result.rows),
               pageNo,
               pageSize,
               result.count
          );
     } catch (error) {
          res.failure(error);
     }
};

exports.getScheduleList = async (req, res) => {
     try {
          const { propertyId, date } = req.query;

          IfEmpty(propertyId, 'propertyId');
          IfEmpty(date, 'date');

          const property = await db.property.findOne({
               where: {
                    id: propertyId,
               },
          });

          if (!property) throw 'Property not found';

          const schedules = await db.schedule.findAll({
               where: {
                    propertyId,
                    date,
                    status: 'approved',
               },
          });
          const slotsList = [];
          let startTime = moment(property.scheduleStartTime);
          const endTime = moment(property.scheduleEndTime);
          do {
               const foundSchedule = schedules.find((schedule) => {
                    return (
                         moment(schedule.startTime).utc().format('HH:mm') ==
                         startTime.utc().format('HH:mm')
                    );
               });
               if (foundSchedule) {
                    startTime.add(60, 'minutes').utc().format();
               } else {
                    slotsList.push({
                         startTime: startTime.utc().format(),
                         endTime: startTime.add(60, 'minutes').utc().format(),
                    });
               }
          } while (startTime.isBefore(endTime));
          return res.page(slotsList, 1, 1, 1);
     } catch (error) {
          res.failure(error);
     }
};
