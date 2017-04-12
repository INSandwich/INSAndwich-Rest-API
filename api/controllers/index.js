var express = require('express');
var router = express.Router();

var roles = require('./roles');
var users = require('./users');
var categories = require('./categories');
var products = require('./products');

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
router.post('/users/:id/role', users.updateUserRole);
router.post('/users/:id/tokens', users.updateTokens);
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
/*router.get('/products', products.getAll);                 // Anton
router.get('/products/:id', products.getOne);             // Anton*/
router.get('/products/:categoryId', products.getCategory);  // Anton
/*router.post('products', products.create);
router.post('/products/:id/update-info', products.updateProductInfo);
router.delete('/products/:id', products.delete);*/

module.exports = router;
