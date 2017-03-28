var globalVars = require('../misc/globalVars');
var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('insandwich.db');

var category = {
  getAll: function(req, res) {
    db.run("SELECT * FROM Category", function(e, r) {
      if((r.length != 0) && (e == null)) {
        res.status(200).json(r);
      }
      else if (r.length == 0) {
        res.status(500).json({ error: "Error retrieving categories.", detail: "No categories in the database."}).end();
      }
      else {
        res.status(500).json({ error: "Error retrieving categories.", detail: e }).end();
      }
    });
  },
  getOne: ,
  create: ,
  update: ,
  delete:
}
