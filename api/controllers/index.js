var express = require('express'),
  router = express.Router();

var roles = require('./roles');

router.use('/roles', roles);

module.exports = router;
