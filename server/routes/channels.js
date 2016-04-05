
const models = require('../models');
const express = require('express');
const router = express.Router();
const moment = require('../../node_modules/moment/moment.js');

router.get('/now-next', (req, res) => {
  models.Channel.findAll({
    limit: 25,
    include: [{ model: models.Program, limit: 3,
      where: {
        dato: moment(new Date()).format('YYYY-MM-DD'),
        slut: {
          $gt: moment(new Date()).format('HH:mm:ss'),
        },
      },
    }],
  }).then((channels) => res.send(channels));
});

router.get('/now', (req, res) => {
  models.Channel.findAll({
    limit: 25,
    include: [{ model: models.Program, limit: 1,
      where: {
        dato: moment(new Date()).format('YYYY-MM-DD'),
        tid: { $lt: moment(new Date()).format('HH:mm:ss') },
        slut: { $gt: moment(new Date()).format('HH:mm:ss') },
      },
    }],
  }).then((channels) => res.send(channels));
});

router.get('/next', (req, res) => {
  models.Channel.findAll({
    limit: 25,
    include: [{ model: models.Program, limit: 1,
      where: { tid: { $gt: moment(new Date()).format('HH:mm:ss') } },
    }],
  }).then((channels) => res.send(channels));
});

router.get('/today', (req, res) => {
  models.Channel.findAll({
    limit: 25,
    include: [{ model: models.Program,
      where: {
        dato: moment(new Date()).format('YYYY-MM-DD'),
        slut: { $gt: moment(new Date()).format('HH:mm:ss') } },
    }],
  }).then((channels) => res.send(channels));
});

module.exports = router;
