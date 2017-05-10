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

    db.all("SELECT COUNT(*) as count from Commands Where User_Id = ?", req.params.id,
      function(e, r){
        if((r.length !=0) && ( e == null)){
          var itemCount = r[0].count;
          pageCount = roundUp(itemCount/pageSize,1);
          //console.log("PageCount = ",pageCount);
        }else if(r.length == 0){
          res.status(500).json({error: "Couldn't get Items count", detail: "No items retrieved."}).end();
        }else{
          res.status(500).json({error: "Couldn't get Items count", detail: e}).end();
        }
      }
    );

    db.all("SELECT * from Commands Where User_Id = ? LIMIT ? OFFSET ?",
     req.params.id, pageSize, pageNumber*pageSize, function(e, r){
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

  getOne: function(req, res){
    // MON TOTAL WESH :)

    db.all("SELECT * FROM Commands WHERE Id = ?",
    req.params.id,
    function(e, r){
      if(e == null)
      {
        // retrieve command lines comming with the command
        // lines non paginé

        db.all("SELECT Command_Lines.*, Products.Name FROM Command_Lines, Products WHERE Command_Id = ? AND Products.Id = Command_Lines.Id",
        [req.params.id], function(error, result){
            //console.log(result);
            if(error == null)
            {

              res.status(200).json({
                Id: r[0].Id,
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
    db.run("INSERT INTO Commands(User_id, Creation_Date) VALUES(?, ?);", req.params.id, date.toISOString(), function(e, r){
      if(e == null && this.changes != 0)
      {
        res.status(200).json({message: "Command insertion successfull"}).end();
      } else {
        console.log(e);
        res.status(500).json({error: "Couldn't insert command into database"}).end();
      }
    });
  },

  delete: function(req, res){
    // deletes command of given id
    // delete Command_Lines aswell as they are no longer meaningfull
    db.run("delete from Command_Lines where Command_Lines.Command_Id = ?", req.params.id,
    function(err, result){
      if(err == null && this.changes != 0){
        db.run("delete from Commands where Id = ?", req.params.id, function(e, r){
          if(e == null && this.changes != 0){
            res.status(200).json({message: "Deletion completed successfully"}).end();
          }else {
            res.status(500).json({error: "Unable to delete given command"})
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
        console.log(r);
        res.status(200).json(r[0]).end();
      }else{
        res.status(500).json({error: "Unable to get command line"}).end();
      }
    });
  },

  addLine: function(req, res){
    // add a new line to a given command
    db.run("INSERT INTO Command_Lines(Amount, Command_Id, Product_Id) VALUES(?, ?, ?);",
    [req.body.amount, req.body.command_id, req.body.product_id],
    function(e, r){
      if(e == null && this.changes != 0){
        res.status(200).json({message: "Successfully added command line"}).end();
      }else{
        console.log(e);
        res.status(500).json({error: "Unable to add line to command"}).end();
      }
    });
  },

  getLastUnpaid: function(req, res){
    console.log(req.params);
    // retrieve last unpaid command with sum of items and total price
    db.all("SELECT * FROM Commands WHERE Is_Paid = 0 and User_Id = ? ORDER BY Creation_Date DESC LIMIT 1",
    req.params.userId,
    function(e, r){
      if(e == null){
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
                console.log(r_fckcbacks);
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
    db.run("delete from Command_Lines where Id = ?", req.params.id, function(e, r){
      if(e == null && this.changes != null){
        res.status(200).json({message: "Deleted command line successfully"}).end();
      }else {
        res.status(500).json({error: "Unable to delete command line"}).end();
      }
    });
  }
}



module.exports = orders;
