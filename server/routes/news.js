const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/news/all', (req, res) => {
  models.News.findAll({
    limit: 40, order: 'dato DESC',
  }).then((news) => res.send(news));
});

router.get('/news', (req, res) => {
  models.News.findOne({
    where: { id: req.query.id },
  }).then((news) => res.send(news));
});

module.exports = router;
