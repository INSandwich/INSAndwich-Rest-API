var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

// precision is 10 for 10ths, 100 for 100ths, etc.
function roundUp(num, precision) {
return Math.ceil(num * precision) / precision
}

var orders = {
  getAll: function(req, res){
    var pageSize = 9;
    var pageNumber = 0;
    var pageCount = 0;
    var itemCount = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT COUNT(*) as count from Commands",
      function(e, r){
        if((r.length !=0) && ( e == null)){
          itemCount = r[0].count;
          pageCount = roundUp(itemCount/pageSize,1);
          //console.log("PageCount = ",pageCount);
        }else if(r.length == 0){
          res.status(500).json({error: "Couldn't get Items count", detail: "No items retrieved."}).end();
        }else{
          res.status(500).json({error: "Couldn't get Items count", detail: e}).end();
        }
      }
    );

    db.all("SELECT * from Commands LIMIT ? OFFSET ?",
     pageSize, pageNumber*pageSize, function(e, r){
       if(e == null){
         res.status(200).json({
           pageSize: pageSize,
           pageNumber: parseInt(pageNumber),
           pageCnt: parseInt(pageCount),
           items: r
         }).end();
       } else {
         res.status(500).json({error: "Unable to get commands"}).end();
       }
    });
  },

  getByUser: function(req, res){

    var pageSize = 9;
    var pageNumber = 0;
    var pageCount = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.serialize(function(){
      db.all("SELECT COUNT(*) as count from Commands Where User_Id = ? and Is_Paid != 0", req.params.id,
        function(e, r){
          if((r.length !=0) && ( e == null)){
            var itemCount = r[0].count;
            pageCount = roundUp(itemCount/pageSize, 1);
            //console.log("PageCount = ",pageCount);

          }else if(r.length == 0){
            res.status(500).json({error: "Couldn't get Items count", detail: "No items retrieved."}).end();
          }else{
            res.status(500).json({error: "Couldn't get Items count", detail: e}).end();
          }
        }
      );

      db.all("select sum(Command_Lines.Amount) as total,\
      sum(Command_Lines.Amount * Products.Price) as totalPrice,\
      Commands.*\
      from Commands, Command_Lines, Products\
      where Commands.Id = Command_Lines.Command_Id and Commands.User_Id = ?\
      and Command_Lines.Product_Id = Products.Id and Commands.Is_Paid != 0 group by Command_Lines.Command_Id\
      ORDER BY Commands.Id desc\
      LIMIT ? OFFSET ?;",
      req.params.id,pageSize, pageNumber*pageSize,
      function(e, r){
        if(e == null)
        {
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: parseInt(pageNumber),
            pageCnt: parseInt(pageCount),
            items: r
          }).end();
        }else {
          res.status(500).json({error: "Unable to get commands"}).end();
        }
      });
    });
  },


  getOne: function(req, res){
    // MON TOTAL WESH :)
     totalPrice = 0;

    db.all("SELECT * FROM Commands WHERE Id = ?",
    req.params.id,
    function(e, r){
      if(e == null)
      {
        // retrieve command lines comming with the command
        // lines non paginé
        db.all("SELECT Command_Lines.*, Products.Name, Products.Price FROM Command_Lines,\
              Products WHERE Command_Id = ? AND Products.Id = Command_Lines.Product_Id",
        [req.params.id], function(error, result){

            for (i = 0; i < result.length; i++) {
                totalPrice = totalPrice + (parseFloat(result[i].Amount)*parseFloat(result[i].Price));
                console.log("TotalPrice", totalPrice);
            }

            if(error == null)
            {

              res.status(200).json({
                Id: r[0].Id,
                CreationDate : r[0].Creation_Date,
                totalPrice : totalPrice,
                lines : result
              });
            } else {
              console.log(error);
              res.status(500).json({error : "Unable to get command's lines"});
            }
        });
      } else {
        res.status(500).json({error : "Unable to get command"});
      }
    })
  },

  create: function(req, res){
    // add a new command to the database
    // requires user id
    var date = new Date();
    var formattedDate = date.toLocaleDateString();
    console.log(formattedDate);
    db.run("INSERT INTO Commands(User_id, Creation_Date) VALUES(?, ?);", req.params.id, formattedDate, function(e, r){
      if(e == null && this.changes != 0)
      {
        res.status(200).json({message: "Command insertion successfull"}).end();
      } else {
        res.status(500).json({error: "Couldn't insert command into database"}).end();
      }
    });
  },

  delete: function(req, res){
    // deletes command of given id
    // delete Command_Lines aswell as they are no longer meaningfull

        db.run("delete from Commands where Id = ?", req.params.id, function(e, r){
          if(e == null && this.changes != 0){
            db.run("delete from Command_Lines where Command_Lines.Command_Id = ?", req.params.id,
            function(err, result){
              if(err == null && this.changes != 0){
                res.status(200).json({message: "Deletion completed successfully"}).end();
              }else {
                res.status(200).json({error: err}).end();
              }
            });
          }else {
            res.status(500).json({error: "Unable to delete given command"})
          }
        });
  },

  getLine: function(req, res){
    // retrieve a command line
    db.all("SELECT * FROM Command_Lines WHERE Id = ?", req.params.id, function(e, r){
      if(e == null && r[0] != null){
        res.status(200).json(r[0]).end();
      }else{
        res.status(500).json({error: "Unable to get command line"}).end();
      }
    });
  },

  addLine: function(req, res){
    // add a new line to a given command
    var commandId = 0;
    var commandLineId = 0;
    var date = new Date();
    var shouldInsertInDb = false;
    var shouldUpdateInDb = false;
    //[req.body.amount, req.body.product_id, req.body.user_id]

    // First we must see if the user has a last paid command
    db.all("SELECT * FROM Commands WHERE User_Id = ? AND Is_Paid = 0", [req.body.user_id],
      function (e, r) {
        if (e == null) {
          if(r.length != 0) { // The user has an unpaid command -> Check
            // Does the command already have a product associated to it?
            db.all("SELECT * FROM Command_Lines WHERE Command_Id = ? AND Product_Id = ?",
              [r[0].Id, req.body.product_id], function(er, re) {
                if(er == null) {
                  if(re.length == 0) { // There are not lines with such product_id
                    db.run("INSERT INTO Command_Lines (Amount, Command_Id, Product_Id) VALUES (?, ?, ?)",
                      [req.body.amount, r[0].Id, req.body.product_id],
                        function(result, error) {
                          if(error == null && this.changes != 0) {
                            res.status(200).json({id: r[0].Id, message: "Successfully inserted command line"}).end();
                          }
                          else {
                            res.status(500).json({error: "Unable to add line to command"}).end();
                          }
                        }
                      );
                  }
                  else { // we just update the re[0].amount

                    db.run("UPDATE Command_Lines SET Amount = Amount + ? WHERE Id = ?", [req.body.amount, re[0].Id],
                      function(result, error) {
                        if(error == null && this.changes != 0) {
                          res.status(200).json({id: r[0].Id, message: "Successfully updated command line"}).end();
                        }
                        else {
                          res.status(500).json({error: "Unable to add line to command"}).end();
                        }
                      }
                    );
                  }
                }
                else {
                  res.status(500).json({error: "Couldn't retrieve command lines with such command_id and product_id"}).end();
                }
              }
            );
          }
          else { // The user doesn't have an unpaid command -> create it and insert the line
          console.log("The user doesn't have an unpaid command -> create it and insert the line");
              db.run("INSERT INTO Commands (User_id, Creation_Date) VALUES (?, ?);",
                  [req.body.user_id, date.getDate()+"/"+date.getMonth()+"/"+date.getFullYear()], function(er, re){
                    if(er == null && this.changes != 0)
                    {
                      db.run("INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(?, ?, ?);",
                          [req.body.amount, this.lastID, req.body.product_id], function(error, result) {
                            if(error == null && this.changes != 0) {
                              res.status(200).json({id: this.lastID, message: "Successfully created command & added command line"}).end();
                            }else{
                              res.status(500).json({error: "Unable to add line to command"}).end();
                            }
                          });

                    } else {
                      res.status(500).json({error: "Couldn't insert command into database"}).end();
                    }
                });
            }
          }
          else {
            res.status(500).json({error: "Error retrieving user command."}).end();
          }
        }
      );
  },

  getLastUnpaid: function(req, res){
    // retrieve last unpaid command with sum of items and total price
    db.all("SELECT * FROM Commands WHERE Is_Paid = 0 and User_Id = ? ORDER BY Creation_Date DESC LIMIT 1",
    req.params.userId,
    function(e, r){
      if(e == null && r.length != 0){
        db.all("select Command_Lines.Id as id, Amount as quantity, Name as name, Price as price \
        from Command_Lines, Products where Command_Id = ? \
        and Command_Lines.Product_Id = Products.Id",
        r[0].Id,
        function(error, result){
          if(error == null){
            // get total itemcount and price
            db.all("select sum(Amount) as total, sum(Amount * Price) as totalPrice from Command_Lines, Products where Command_Lines.Command_Id = ? and Products.Id = Command_Lines.Product_Id;",
            r[0].Id, function(e_fckcbacks, r_fckcbacks){
              if(e_fckcbacks == null){
                //console.log(r_fckcbacks);
                // eventually render json (ouf!)
                res.status(200).json({
                  Id:r[0].Id,
                  totalPrice: r_fckcbacks[0].totalPrice,
                  totalQuantity: r_fckcbacks[0].total,
                  creationDate: r[0].Creation_Date,
                  lines: result
                }).end();
              }else{
                res.status(500).json({error: "Unable to retrieve total price and item count"}).end();
              }
            })
          } else {
            console.log(error);
            res.status(500).json({error: "Unable to get last unpaid command's lines"}).end();
          }
        });

      }else{
        res.status(500).json({error: "Unable to get last unpaid command for given user id"}).end();
      }
    });
  },

  updateLine: function(req, res){
    // updates a command line with supplied data
    // INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(2, 1, 3);
    // TODO not tested yet
    db.run("UPDATE Command_Lines SET Amount = ?, Command_Id = ?, Product_Id = ? where Id = ?",
            [req.body.amount, req.body.command_id, req.body.product_id, req.params.id],
    function(e, r){
      if(e == null && this.changes != 0){
        res.status(200).json({message: "Line update successfull"}).end();
      }else {
        res.status(500).json({error: "Unable to update line"}).end();
      }
    });
  },

  deleteLine: function(req, res){
    // delete a given command line
    db.run("delete from Command_Lines where Command_Id = ? AND Id = ?", [req.params.commandId, req.params.id], function(e, r){
      if(e == null && this.changes != null){
        res.status(200).json({message: "Deleted command line successfully"}).end();
      }else {
        res.status(500).json({error: "Unable to delete command line"}).end();
      }
    });
  },

  checkout: function(req, res) {
    //PARAMS : [req.body.command_id, req.body.user_id, req.body.userTokens, req.body.commandTotal]
    // console.log(req.body, res);
    if(req.body.userTokens >= req.body.commandTotal) {
      db.run("UPDATE Commands SET Is_Paid = 1 WHERE Id = ?", [req.body.command_id], function(err, resu) {
        if(err == null && this.changes != null) {
          res.status(200).json({message: "Commande effectuée avec succès."}).end();
        }
        else {
          res.status(500).json({error: "Error Checking Out", detail: err}).end();
        }
      });
      db.run("UPDATE Users SET Tokens = Tokens - ? WHERE Id = ?", [req.body.commandTotal, req.body.user_id], function(err, resu) {
        console.log(req.body, this);
        if(err != null && this.changes == null) {
          res.status(500).json({error: "Error Checking Out", detail: err}).end();
        }
      });
    }
    else {
      res.status(500).json({error: "Error Checking Out", detail: "Pas assez de tokens pour payer cette commande."}).end();
    }
  }

}



module.exports = orders;
