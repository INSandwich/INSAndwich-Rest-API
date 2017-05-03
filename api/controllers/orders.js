var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

var orders = {


  getAll: function(req, res){
    var pageSize = 9;
    var pageNumber = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT * from Commands LIMIT ? OFFSET ?",
     pageSize, pageNumber, function(e, r){
       if(e == null){
         res.status(200).json({
           pageSize: pageSize,
           pageNumber: pageNumber,
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

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT * from Commands Where User_Id = ? LIMIT ? OFFSET ?",
     req.params.id, pageSize, pageNumber, function(e, r){
       if(e == null){
         res.status(200).json({
           pageSize: pageSize,
           pageNumber: pageNumber,
           items: r
         }).end();
       } else {
         res.status(500).json({error: "Unable to get commands"}).end();
       }
    });
  },

  getOne: function(req, res){
    var pageSize = 9;
    var pageNumber = 0;

    if(req.query.pageSize != null) pageSize = req.query.pageSize;
    if(req.query.pageNumber != null) pageNumber = req.query.pageNumber;

    db.all("SELECT * FROM Commands WHERE Id = ?",
    req.params.id,
    function(e, r){
      if(e == null)
      {
        // retrieve command lines comming with the command
        db.all("SELECT * FROM Command_Lines WHERE Command_Id = ? LIMIT ? OFFSET ?",
        [req.params.id, pageSize, pageNumber*pageSize], function(error, result){
            if(error == null)
            {
              res.status(200).json({
                commandInfo: r[0],
                lines : {
                  pageSize : pageSize,
                  pageNumber : pageNumber,
                  items: result
                }
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
    db.run("INSERT INTO Commands(User_id) VALUES(?);", req.params.id, function(e, r){
      if(e == null && this.changes != 0)
      {
        res.status(200).json({message: "Command insertion successfull"}).end();
      }else {
        console.log(e);
        res.status(500).json({error: "Couldn't insert command into database"}).end();
      }
    });
  },

  delete: function(req, res){
    // deletes command of given id
    db.run("delete from Commands where Id = ?", req.params.id, function(e, r){
      if(e == null && this.changes != 0){
        res.status(200).json({message: "Deletion completed successfully"}).end();
      }else {
        res.status(500).json({error: "Unable to delete given command"})
      }
    });
  },

  getLine: function(req, res){

  },

  addLine: function(req, res){

  },

  updateLine: function(req, res){

  },

  deleteLine: function(req, res){

  }
}

module.exports = orders;
