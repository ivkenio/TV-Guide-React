
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const cors = require('cors');

const channels = require('./routes/channels.js');
const news = require('./routes/news.js');
const programs = require('./routes/programs.js');

// App Setup
app.use(morgan('combined'))
  .use(bodyParser.json())
  .use(cors())
  .use('/api/channels', channels)
  .use('/api', news)
  .use('/api', programs);

// Server setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
console.log(`Express server running on ${port}`);
