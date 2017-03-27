var express = require('express');
var router = express.Router();

var roles = require('./roles.js');
var users = require('./users.js');

// Roles Controller
router.get('/roles', roles.getAll);
router.get('/roles/:id', roles.getOne);
router.post('/roles', roles.create);
router.put('/roles/:id', roles.update);
router.delete('/roles/:id', roles.delete);

// Users Controller
router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.post('/users', users.create);
router.post('/users/:id', users.updateUserRole);
router.delete('/users/:id', users.delete);

module.exports = router;
