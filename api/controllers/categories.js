var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('insandwich.db');

var categories = {

  // Get all categories
  getAll: function(req, res) {

    var pageSize = 5;
    var pageNumber = 0;
    if(req.query.pageSize != null) {
      pageSize = req.query.pageSize;
    }
    if(req.query.pageNumber != null) {
      pageNumber = req.query.pageNumber;
    }
    db.all("SELECT * FROM Category LIMIT ? OFFSET ?", [pageSize, pageNumber],
    function(e, r) {
      if((e == null)) {
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: parseInt(pageNumber),
            items: r
          });
      }
      else if (r.length == 0) {
        res.status(500).json({ error: "Error retrieving categories.", detail: "No categories in the database."}).end();
      }
      else {
        res.status(500).json({ error: "Error retrieving categories.", detail: e }).end();
      }
    });
  },

  // Get one category by its Id
  getOne: function(req, res) {
    db.all("SELECT * FROM Category WHERE Id = ?", req.params.id,
    function(e, r) {
        if((e == null) && (r.length != 0)) {
          res.status(200).json(r);
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving category.", detail: "No category with this Id."}).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving category.", detail: e }).end();
        }
    });
  },

  // Create a category
  create: function(req, res) {
    db.run("INSERT INTO Category (Name) VALUES (?)", req.body.name,
    function(e, r) {
      if ((e == null) && (this.changes != 0)) {
        res.status(200).json({
          Id: Number(this.lastID),
          Name: req.body.name
        });
      }
      else {
        res.status(500).json({ error: "Error creating category.", detail: e }).end();
      }
    });
  },

  update: function(req, res) {
    db.run("UPDATE Category SET Name = ? WHERE Id = ?", [req.body.name, req.params.id],
    function(e, r) {
      if ((e == null) && (this.changes != 0)) {
        res.status(200).json({ message: "Successfully updated category" });
      }
      else {
        res.status(500).json({ error: "Error updating category.", detail: e }).end();
      }
    });
  },

  delete: function(req, res) {
    db.run("DELETE FROM Category WHERE Id=?", req.params.id,
      function(e, r) {
        console.log(this);
        if ((e == null) && (this.changes != 0)) {
          res.status(200).json({
            message: "Category deleted successfully."
          });
        }
        else {
          res.status(500).json({ error: "Error deleting category.", detail: e }).end();
        }
      });
  }
}

module.exports = categories;
