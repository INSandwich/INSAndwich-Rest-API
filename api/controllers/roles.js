var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('insandwich.db');

var roles = {
  // Retrieve the list of roles
   getAll: function(req, res) {

     var pageSize = 5;
     var pageNumber = 0;
    if(req.query.pageSize != null) {
      pageSize = req.query.pageSize;
    }
    if(req.query.pageNumber != null) {
      pageNumber = req.query.pageNumber;
    }
    db.all("SELECT * FROM Roles LIMIT ? OFFSET ?", [pageSize, pageNumber],
      function(e, r) {
        if((r.length != 0) && (e == null)) {
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: pageNumber,
            roles: r
          });
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving roles.", detail: "No roles in the database." }).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving roles.", detail: e }).end();
        }
      });
  },

  // Retrieve a role by its ID
  getOne: function(req, res) {

    db.all("SELECT * FROM Roles WHERE Id = ?", [req.params.id],
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          res.status(200).json(r);
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Error retrieving role.", detail: "No role with this id." }).end();
        }
        else {
          res.status(500).json({ error: "Error retrieving role.", detail: e }).end();
        }
      }
    )
  },

  // Insert a role into the database
  create: function(req, res) {
      db.run("INSERT INTO Roles (Name) VALUES (?)", [req.body.name],
      function(e, r) {
        if (e == null) {
          res.status(200).json({
            Id: Number(this.lastID),
            Name: req.body.name
          });
        }
        else {
          res.status(500).json({ error: "Error creating role.", detail: e }).end();
        }
      });
  },

  // Update a role in the database
  update: function(req, res) {
    db.run("UPDATE Roles SET Name = ? WHERE Id = ?", [req.body.name, req.params.id],
      function(e, r) {
        if ((e == null) && (this.changes != 0)) {
          res.status(200).json({
            Id: Number(req.params.id),
            Name: req.body.name
          });
        }
        else {
          res.status(500).json({ error: "Error updating role.", detail: e }).end();
        }
      }
    )
  },

  // Delete a role in the database
  delete: function(req, res) {
    db.run("DELETE FROM Roles WHERE Id=?", req.params.id,
      function(e, r) {
        if ((e == null) && (this.changes != 0)) {
          res.status(200).json({
            message: "Role deleted successfully."
          });
        }
        else {
          res.status(500).json({ error: "Error deleting role.", detail: e }).end();
        }
      });
  }
}

module.exports = roles;
