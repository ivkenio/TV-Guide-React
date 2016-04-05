const models = require('../models');
const moment = require('../../node_modules/moment/moment.js');

module.exports = {
  getNow: (request, reply) => {
    models.Channel.findAll({
      limit: 25,
      include: [{
        model: models.Program,
        limit: 1,
        where: {
          dato: moment(new Date()).format('YYYY-MM-DD'),
          tid: { $lt: moment(new Date()).format('HH:mm:ss') },
          slut: { $gt: moment(new Date()).format('HH:mm:ss') },
        },
      }],
    }).then((channels) => reply(channels).code(200));
  },
  getNowNext: (request, reply) => {
    models.Channel.findAll({
      limit: 25,
      include: [{
        model: models.Program,
        limit: 3,
        where: {
          dato: moment(new Date()).format('YYYY-MM-DD'),
          slut: {
            $gt: moment(new Date()).format('HH:mm:ss'),
          },
        },
      }],
    }).then((channels) => reply(channels).code(200));
  },
  getNext: (request, reply) => {
    models.Channel.findAll({
      limit: 25,
      include: [{
        model: models.Program,
        limit: 1,
        where: {
          tid: {
            $gt: moment(new Date()).format('HH:mm:ss'),
          },
        },
      }],
    }).then((channels) => reply(channels).code(200));
  },
  getToday: (request, reply) => {
    models.Channel.findAll({
      limit: 25,
      include: [{
        model: models.Program,
        where: {
          dato: moment(new Date()).format('YYYY-MM-DD'),
          slut: {
            $gt: moment(new Date()).format('HH:mm:ss'),
          },
        },
      }],
    }).then((channels) => reply(channels).code(200));
  },
  getByTime: (request, reply) => {
    const hours = request.time.split('-');
    models.Channel.findAll({
      limit: 25,
      include: [{
        model: models.Program,
        limit: 4,
        where: {
          dato: moment(new Date()).format('YYYY-MM-DD'),
          tid: {
            $between: [`${hours[0]}:00:00`, `${hours[1]}:00:00`],
          },
          slut: {
            $gt: moment(new Date()).format('HH:mm:ss'),
          },
        },
      }],
    }).then((channels) => reply(channels).code(200));
  },
  getChannel: (request, reply) => {
    models.Channel.findOne({
      where: { channel_code: request },
      include: [{
        model: models.Program,
        where: {
          dato: moment(new Date()).format('YYYY-MM-DD'),
          tid: { $lt: moment(new Date()).format('HH:mm:ss') },
        },
      }],
    }).then((channel) => reply(channel).code(200));
  },
  getProgram: (request, reply) => {
    models.Channel.findOne({
      where: { channel_code: request.channel_id },
      include: [{
        model: models.Program,
        where: {
          dato: request.date,
          tid: request.time,
          navn: request.name.replace(/_/g, ' '),
        },
      }],
    }).then((program) => reply(program).code(200));
  },
};
