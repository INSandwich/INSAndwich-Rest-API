var express = require('express');
var router = express.Router();

//var roles = require('./roles');
var users = require('./users');
var categories = require('./categories');
var products = require('./products');
var orders = require('./orders');

// Roles Controller
/*
router.get('/roles', roles.getAll);
router.get('/roles/:id', roles.getOne);
router.post('/roles', roles.create);
router.put('/roles/:id', roles.update);
router.delete('/roles/:id', roles.delete);
*/

// Users Controller
router.get('/users', users.getAll);
router.get('/users/:id', users.getOne);
router.get('/users/login/:Login', users.getLogin);
router.post('/users', users.create);
router.put('/users/:id/role', users.updateUserRole);
router.put('/users/:id/tokens', users.updateTokens);
router.post('/users/:id/add', users.addTokens);
router.post('/users/:id/remove', users.removeTokens);
router.post('/users/:id/update-passw', users.updatePassword);
router.post('/users/:id/update-info', users.updateUserInfo);
router.post('/auth', users.auth);
router.delete('/users/:id', users.delete);

// Category Controller
router.get('/categories', categories.getAll);
router.get('/categories/:id', categories.getOne);
router.post('/categories', categories.create);
router.put('/categories/:id', categories.update);
router.delete('/categories/:id', categories.delete);

//Products Controller
router.get('/products', products.getAll);
router.get('/products/:id', products.getOne);
router.get('/products/category/:categoryId', products.getCategory);
router.post('/products', products.create);
router.put('/products/:id', products.update);
router.delete('/products/:id', products.delete);

// Orders controller
router.get('/orders', orders.getAll);
router.get('/orders/users/:id', orders.getByUser);
router.get('/orders/:id', orders.getOne);
router.post('/orders/users/:id', orders.create);
router.delete('/orders/:id', orders.delete);
// handle command lines
router.get('/orders/lines/:id', orders.getLine);
router.post('/orders/lines', orders.addLine);
router.put('/orders/lines/:id', orders.updateLine);
router.delete('/orders/lines/:id', orders.deleteLine);

router.get('/orders/:userId/:id', orders.getLastUnpaid);

module.exports = router;
