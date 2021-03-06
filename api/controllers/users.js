var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');
var IsEmail = require('isemail');

// precision is 10 for 10ths, 100 for 100ths, etc.
function roundUp(num, precision) {
return Math.ceil(num * precision) / precision
}

var users = {
  // Retrieve the list of users
  getAll: function(req, res) {
    var pageSize = 5;
    var pageNumber = 0;
    var login = req.query.login ? "%"+req.query.login+"%" : "%"; // Lambda expressions are bae
    if(req.query.pageSize != null) {
      pageSize = req.query.pageSize;
    }
    if(req.query.pageNumber != null) {
      pageNumber = req.query.pageNumber;
    }

    db.all("SELECT COUNT(*) as count from Users WHERE Login LIKE ?", [login],
      function(e, r){
        if((r.length !=0) && ( e == null)){
          itemCount = r[0].count;

          pageCount = roundUp(itemCount/pageSize,1);
          //console.log("UsersCount = ",pageCount);
        }else if(r.length == 0){
          res.status(500).json({error: "Récuperation des Utilisateurs", detail: "Aucun utilisateur dans la base de données."}).end();
        }else{
          res.status(500).json({error: "Récuperation des Utilisateurs", detail: e}).end();
        }
      }
    );

    db.all("SELECT * FROM Users WHERE Login LIKE ? LIMIT ? OFFSET ?", [login ,pageSize, pageNumber*pageSize],
      function(e, r) {
        if((r.length != 0) && (e == null)) {
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: parseInt(pageNumber),
            pageCnt : parseInt(pageCount),
            items: r

          });
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Récuperation des Utilisateurs", detail: "Aucune utilisateur dans la base de données." }).end();
        }
        else {
          res.status(500).json({ error: "Récuperation des Utilisateurs", detail: e }).end();
        }
      });
  },

  //router.post('/auth', users.auth);
  auth: function(req, res) {
    //console.log(req.body);
    var rand = function() {
        return Math.random().toString(36).substr(2); // remove `0.`
    };

    var token = function() {
        return rand() + rand(); // to make it longer
    };
    var cartSize = 0;


    var tokstring = token();

    token(); // -> WTF DUFEIL ???

    var password = req.body.password;
    var login = req.body.login;
    var Usid;
    var lastOrderId;

    db.all("SELECT Password, Role, Id FROM Users WHERE Login LIKE ?", req.body.login,
      function(e, r) {
        if(e == null && r.length != 0) {
          if(r[0].Password != password) { // Passwords don't match
            res.status(500).json({error: "Authentification", detail: "Login ou mot de passe incorrect."}).end();
          }
          else { // Passwords match, let's see if the user has an unpaid cmd
            db.all("SELECT * FROM Commands WHERE Is_Paid = 0 and User_Id = ? ORDER BY Creation_Date DESC LIMIT 1",
              r[0].Id, function(er, re) {
                if(er == null) {
                  if(re.length != 0) { // The user has a last paid command
                    db.all("select Command_Lines.Id as id, Amount as quantity, Name as name \
                    from Command_Lines, Products where Command_Id = ? \
                    and Command_Lines.Product_Id = Products.Id",
                      re[0].Id, function(error, result) {
                        if(error == null && result.length != 0) { // Sum commands
                          db.all("select sum(Amount) as total from Command_Lines, Products where Command_Lines.Command_Id = ? and Products.Id = Command_Lines.Product_Id;",
                            re[0].Id, function(e_fckcbacks, r_fckcbacks){
                              if(e_fckcbacks == null && r_fckcbacks.length != 0) {
                                res.status(200).json({
                                   message: "Successfully logged in",
                                   token : tokstring,
                                   login : login,
                                   role : r[0].Role,
                                   id : parseInt(r[0].Id),
                                   cartSize : r_fckcbacks[0].total,
                                   lastOrderId : re[0].Id
                                });
                              }
                            }
                          );
                        }
                        else {
                          res.status(500).json({error: "Authentification", detail: error}).end();
                        }
                      }
                    );
                  }
                  else { // The user doesn't have a last paid command (return 0 for lastOrderId && cartSize)
                    res.status(200).json({
                     message: "Successfully logged in",
                     token : tokstring,
                     login : login,
                     role : r[0].Role,
                     id : parseInt(r[0].Id),
                     cartSize : 0,
                     lastOrderId : 0
                    });
                  }
                }
                else {
                  res.status(500).json({error: "Authentification", detail: er}).end();
                }
              }
            );
          }
        }
        else {
            res.status(500).json({error: "Authentification", detail: "Login ou mot de passe incorrect."}).end();
        }
      }
    );

  },

  // Retrieve an user by its ID
  getOne: function(req, res) {
    db.all("SELECT * FROM Users WHERE Id = ?", req.params.id,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          res.status(200).json(r);
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Récuperation d'un Utilisateur", detail: "Aucun utilisateur correspondant à cet Id dans la base de données." }).end();
        }
        else {
          res.status(500).json({ error: "Récuperation d'un Utilisateur", detail: e }).end();
        }
      }
    )
  },

  // Retrieve an user by its login
  getLogin: function(req, res) {


    db.all("SELECT * FROM Users WHERE Login LIKE ?", req.params.Login,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          res.status(200).json(r);
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Récuperation d'un Utilisateur", detail: "Aucun utilisateur avec cet identifiant dans la base de données."}).end();
        }
        else {
          res.status(500).json({ error: "Récuperation d'un Utilisateur", detail: e }).end();
        }
      }
    )
  },

  // Insert an user into the database
  create: function(req, res) {
      var password = req.body.password;

      // Gosh pls no, we gotta use promises here, to first execute everything in here, THEN the db.run
      if(password != "") {
        //console.log(password);

            var email = req.body.email;
            if(!(IsEmail.validate(email))) {
              res.status(500).json({error: "Création du Compte", detail: "Email non valide."}).end();
            }

            db.run("INSERT INTO Users (FirstName, LastName, Email, Login, Password, Adresse) VALUES (?, ?, ?, ?, ?, ?)",
            [req.body.firstname, req.body.lastname, email, req.body.login, req.body.password, req.body.adresse],
            function(e, r) {
              if((e == null) && (this.changes != 0)) {
                res.status(200).json({
                  Id: Number(this.lastID),
                  FirstName: req.body.firstname,
                  LastName: req.body.lastname,
                  Email: email,
                  Login: req.body.login,
                  Pwd: req.body.password,
                  Adresse: req.body.adresse
                });
              }
              else {
                res.status(500).json({ error: "Création du Compte", detail: e }).end();
              }
        });
        //res.status(500).json({error: "Hash failed, please provide a password."}).end();
      }


      // Check if this looks correct

  },

  // Update the user's role
  updateUserRole: function(req, res) {
    db.run("UPDATE Users SET Role = ? WHERE Id = ?", [req.body.role, req.params.id],
      function(e, r) {
        //console.log(this);
        if((e == null) && (this.changes != 0)) {
          res.status(200).json({ message: "Successfully updated user role" });
        }
        else {
          res.status(500).json({error: "Mise à jour d'un Utilisateur", detail: e}).end();
        }
      }
    );
  },

  // Update the token value
  updateTokens: function(req, res) {
    var tokens = req.body.tokens;

    if(tokens > 0) {
      db.run("UPDATE Users SET Tokens = ? WHERE Id = ?", [tokens, req.params.id],
        function(e, r) {
          if((e == null) && (this.changes != 0)) {
            res.status(200).json({ message: "Successfully updated token amount."});
          }
          else {
            res.status(500).json({error: "Mise à jour d'un Utilisateur", detail: e}).end();
          }
        }
      );
    }
    else {
      res.status(500).json({ error: "Mise à jour d'un Utilisateur", detail: "Le nombre de tokens doit être positif."}).end();
    }

  },

  addTokens: function(req, res) {
    var tokens = req.body.tokens;

    db.all("SELECT Tokens FROM Users WHERE id = ?", [req.params.id],
      function(e, r) {
        if(e == null && r.length != 0)
        {
          db.run("UPDATE Users SET Tokens = ? WHERE id = ?",
          [req.body.tokens + r[0].Tokens, req.params.id],
          function(error, result){
            if(error == null) {
              res.status(200).json({message: "Successfully added tokens"});
            }
            else {
              res.status(500).json({error : "Ajout des tokens", detail:"Erreur lors de l'ajout des tokens à l'utilisateur."}).end();
            }
          })

        } else {
          res.status(500).json({error : "Ajout des tokens", detail:"Erreur lors de l'ajout des tokens à l'utilisateur."}).end();
        }
      }
    )
  },

  removeTokens: function(req, res) {
    var tokens = req.body.tokens;

    db.all("SELECT Tokens FROM Users WHERE id = ?", [req.params.id],
      function(e, r){
        if(e == null && r.length != 0)
        {
          if(r[0].Tokens >= req.body.tokens)
          {
            db.run("UPDATE Users SET Tokens = ? WHERE id = ?",
            [r[0].Tokens - req.body.tokens, req.params.id],
            function(error, result){
              if(error == null) {
                res.status(200).json({message: "Successfully removed tokens"});
              }
              else {
                res.status(500).json({error : "Mise à jour d'un Utilisateur", detail: "Erreur lors de l'enlevement de tokens."}).end();
              }
            })
          } else {
            res.status(500).json({error : "Mise à jour d'un Utilisateur", detail: "Pas assez de tokens."}).end();
          }

        } else {
          res.status(500).json({error: "Recupération d'un Utilisateur", detail: "Aucun utilisateur correspondant à cet Id dans la base de données."}).end();
        }
      }
    )
  },

  updatePassword: function(req, res) {
    //Password verification before changing it
    var password = req.body.password;
    var newPassword = req.body.newpassword;

    //Get older password
    db.all("SELECT Password FROM Users WHERE Id = ?", req.params.id,
      function(e, r) {
        if( (e == null) && (r.length != 0) ) {
          //console.log(r[0].Password, newPassword);
          //Checking if older password is okay
          //console.log(r[0].Password, password);
          if(password == r[0].Password && newPassword != 0){
            //Updating to the new password
            db.run("UPDATE Users SET Password = ? WHERE Id = ?", [req.body.newpassword, req.params.id],
              function(e, r) {
                //console.log(this);
                if((e == null) && (this.changes != 0)) {
                  res.status(200).json({ message: "Successfully updated user password" });
                }
                else {
                  res.status(500).json({error: "Mise à jour du mot de passe", detail: e}).end();
                }
              }
            );

          } else {
            res.status(500).json({error: "Mise à jour du mot de passe", detail: "Ancien mot de passe non valide."}).end();
          }
        }
        else if (r.length == 0) {
          res.status(500).json({ error: "Mise à jour du mot de passe", detail: "Aucun utilisateur avec cet Id dans la base de données." }).end();
        }
        else {
          res.status(500).json({ error: "Mise à jour du mot de passe", detail: e }).end();
        }
      }
    )


  },

  updateUserInfo: function(req, res) {

    var email = req.body.email;
    var FirstName = req.body.firstname;
    var LastName = req.body.lastname;
    var Login = req.body.login;
    var Adresse = req.body.adresse;
    //console.log(email, FirstName, LastName, Login, Adresse)

    //We check the mail
    if(!(IsEmail.validate(email))) {
      res.status(500).json({error: "Please provide a correct email."}).end();

    //We check that every field is filled
  }else if(FirstName != ""  && LastName != "" && Login != "" && Adresse != ""){

      db.run("UPDATE Users SET FirstName = ?, LastName = ?, Email = ? , Login = ?, Adresse = ? WHERE Id = ?",
      [req.body.firstname, req.body.lastname, email, req.body.login, req.body.adresse, req.params.id],
      function(e, r) {
        if((e == null) && (this.changes != 0)) {
          res.status(200).json({
            Id: req.params.id,
            FirstName: req.body.firstname,
            LastName: req.body.lastname,
            Email: email,
            Login: req.body.login,
            Adresse: req.body.adresse
          });
        }
        else {
          res.status(500).json({ error: "Mise à jour d'un Utilisateur", detail: e }).end();
        }
      });
    }else{
      res.status(500).json({error: "Mise à jour d'un Utilisateur", detail: "Veuillez remplir tous les champs"}).end();
    }


  },

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
          res.status(500).json({ error: "Suppression d'un Utilisateur", detail: e }).end();
        }
      });
  }
}

module.exports = users;
