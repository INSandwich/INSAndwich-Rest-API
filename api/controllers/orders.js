var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

var orders = {
  // toutes les commandes
  getAll: function(req, res){

  }

  // recuperer toutes les commandes d'un utilisateur
  getByUser(req, res){

  }

  // recuperer une commande par Id
  getOne(req, res){

  }

  // cree une commande
  create(req, res){

  }

  // mise a jour d'une commande
  update(req, res){

  }

  // suppression d'une commande (peut etre separer les commandes completees de celles annullees)
  delete(req, res){

  }

}
