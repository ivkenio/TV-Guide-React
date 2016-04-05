const models = require('../models');
const express = require('express');
const router = express.Router();

router.get('/program/:id/:day/:time/:name', (req, res) => {
  models.Channel.findOne({
    where: { channel_code: req.params.id },
    include: [{
      model: models.Program,
      where: {
        dato: req.params.day,
        tid: req.params.time,
        navn: req.params.name.replace(/_/g, ' '),
      },
    }],
  }).then((program) => res.send(program));
});

module.exports = router;
