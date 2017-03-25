var sqlite3 = require('sqlite3');
var db = new sqlite3.Database('insandwich.db');
var bcrypt = require('bcrypt');
var IsEmail = require('isemail');

/* To check a password with bcrypt :
bcrypt.compare(plaintextPwd, hash, function(err, res) {
    if(res == true) {
      console.log(plaintextPwd,"is correct");
    }
    else {
    console.log("wrong pwd");
    }
  }
);
*/

var users = {
  // Retrieve the list of users
  getAll: function(req, res) {
    db.all("SELECT * FROM Users",
      function(e, r) {
        if((r.length != 0) && (e == null))
          res.status(200).json(r);
        else
          res.status(500).json({ error: "Error retrieving users." }).end();
      });
  },

  // Retrieve an user by its ID
  getOne: function(req, res) {
    db.all("SELECT * FROM Users WHERE Id = ?", req.params.id,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          res.status(200).json(r);
        }
        else {
          res.status(500).json({ error: "Error retrieving user." }).end();
        }
      }
    )
  },

  // Insert an user into the database
  create: function(req, res) {
      // Gotta hash and salt this pwd
      var hashedAndSaltedPwd = null;
      var password = req.body.password;

      // Gosh pls no, we gotta use promises here, to first execute everything in here, THEN the db.run
      if(password != "") {
        //console.log(password);
        bcrypt.hash(password, 10).then(function(hash) {
            hashedAndSaltedPwd = hash;
            //console.log(hashedAndSaltedPwd);

            var email = req.body.email;
            if(!(IsEmail.validate(email))) {
              res.status(500).json({error: "Please provide a correct email."}).end();
            }

            db.run("INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse, Role_Id) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [req.body.firstname, req.body.lastname, email, req.body.login, hashedAndSaltedPwd, req.body.adresse, req.body.roleId],
            function(e, r) {
              if (e == null) {
                res.status(200).json({
                  Id: Number(this.lastID),
                  FirstName: req.body.firstname,
                  LastName: req.body.lastname,
                  Email: email,
                  Login: req.body.login,
                  Pwd: hashedAndSaltedPwd,
                  Adresse: req.body.adresse
                });
              }
              else {
                res.status(500).json({ error: "Error creating user." }).end();
              }
            });
        });
        //res.status(500).json({error: "Hash failed, please provide a password."}).end();
      }


      // Check if this looks correct

  },

  /*

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

  */
  // Delete a role in the database
  delete: function(req, res) {
    db.run("DELETE FROM Users WHERE Id=?", req.params.id,
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
  }
}
module.exports = users;
