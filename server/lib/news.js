const models = require('../models');

module.exports = {
  getAll: (request, reply) => {
    models.News.findAll({
      limit: 40,
      order: 'dato DESC',
    }).then((news) => reply(news).code(200));
  },
  getSingleNews: (request, reply) => {
    models.News.findOne({
      where: { id: request.id },
    }).then((news) => reply(news).code(200));
  },
};
