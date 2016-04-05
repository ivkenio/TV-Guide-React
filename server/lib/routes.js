const channels = require('./channels.js');
const news = require('./news.js');

module.exports = [
  {
    method: 'GET',
    path: '/api/channels/now-next',
    handler: channels.getNowNext,
  }, {
    method: 'GET',
    path: '/api/channels/now',
    handler: channels.getNow,
  }, {
    method: 'GET',
    path: '/api/channels/next',
    handler: channels.getNext,
  }, {
    method: 'GET',
    path: '/api/channels/today',
    handler: channels.getToday,
  }, {
    method: 'GET',
    path: '/api/channels/{time}',
    handler: (request, reply) =>
      channels.getByTime(request.params, reply),
  }, {
    method: 'GET',
    path: '/api/channel/{id}',
    handler: (request, reply) =>
      channels.getChannel(request.params.id, reply),
  }, {
    method: 'GET',
    path: '/api/program/{channel_id}/{date}/{time}/{name}',
    handler: (request, reply) =>
      channels.getProgram(request.params, reply),
  }, {
    method: 'GET',
    path: '/api/news',
    handler: news.getAll,
  }, {
    method: 'GET',
    path: '/api/news/{id}',
    handler: (request, reply) =>
      news.getSingleNews(request.params, reply),
  },
];
