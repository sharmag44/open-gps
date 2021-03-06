'use strict';
const model = 'form';

let mapper = require(`../mappers/${model}`);
const updationScheme = require('../helpers/updateEntities');
const { baseServices } = require('../services');
const { Op } = require('sequelize');
const question = require('../models/question');

exports.create = async (req, res) => {
     try {
          const { title, questions } = req.body;
          baseServices.IfExists(questions, 'questions');
          baseServices.IfExists(title, 'title');
          const createdModel = await db[model].create(req.body);
          await db.question.bulkCreate(
               questions.map((i) => ({ ...i, formId: createdModel.id }))
          );
          return res.data(mapper.toModel(createdModel));
     } catch (error) {
          res.failure(error);
     }
};

exports.update = async (req, res) => {
     try {
          const { id } = req.params;

          let foundModel = await baseServices.IfExists(model, {
               id,
          });
          foundModel = updationScheme.update(req.body, foundModel);
          foundModel = await foundModel.save();
          return res.data(mapper.toModel(foundModel));
     } catch (error) {
          res.failure(error);
     }
};

exports.get = async (req, res) => {
     try {
          const { id } = req.params;
          const foundModel = await baseServices.IfExists(model, {
               id,
               include: [db.question],
          });
          return res.data(mapper.toModel(foundModel));
     } catch (e) {
          return res.failure(e);
     }
};

exports.delete = async (req, res) => {
     try {
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
          const { sortOrderWithProperty } = req.query;
          let pageNo = req.query.pageNo ? Number(req.query.pageNo) : 1;
          let serverPaging = req.query.serverPaging == 'false' ? false : true;
          let pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
          let offset = pageSize * (pageNo - 1);
          let totalRecords = 0;

          let query = {
               include: [db.question],
          };
          if (serverPaging) {
               query.limit = pageSize;
               query.offset = offset;
          }

          let where = {};

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
