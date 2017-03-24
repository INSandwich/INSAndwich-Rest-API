var express = require('express'),
  router = express.Router();

var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('insandwich.db');

// Retrieve the list of roles
router.get('/', function(req, res) {
  // Do the sql magic here... :)
  db.all("SELECT * FROM Roles",
    function(e, r) {
      if((r.length != 0) && (e == null))
        res.status(200).json(r);
      else
        res.status(500).json({ error: "Error retrieving roles." }).end();
    });
});

// Retrieve a role by its ID
router.get('/:id', function(req, res) {
  db.all("SELECT * FROM Roles WHERE Id = ?", req.params.id,
    function(e, r) {
      if( (e == null) && (r.length != 0) ) {
        res.status(200).json(r);
      }
      else {
        res.status(500).json({ error: "Error retrieving role." }).end();
      }
    }
  )
});

// Insert a role into the database
router.post('/', function(req, res) {
    db.run("INSERT INTO Roles (Name) VALUES (?)", [req.body.name],
    function(e, r) {
      if (e == null) {
        res.status(200).json({
          Id: Number(this.lastID),
          Name: req.body.name
        });
      }
      else {
        res.status(500).json({ error: "Error creating role." }).end();
      }
    });
});

// Update a role in the database
router.put('/:id', function(req, res) {
  db.run("UPDATE Roles SET Name = ? WHERE Id = ?", [req.body.name, req.params.id],
    function(e, r) {
      if ((e == null) && (this.changes != 0)) {
        res.status(200).json({
          Id: Number(req.params.id),
          Name: req.body.name
        });
      }
      else {
        res.status(500).json({ error: "Error updating role." }).end();
      }
    }
  )
});

// Delete a role in the database
router.delete('/:id', function(req, res) {
  db.run("DELETE FROM Roles WHERE Id=?", req.params.id,
    function(e, r) {
      if ((e == null) && (this.changes != 0)) {
        res.status(200).json({
          message: "Role deleted successfully."
        });
      }
      else {
        res.status(500).json({ error: "Error updating role." }).end();
      }
    });
});

module.exports = router;
