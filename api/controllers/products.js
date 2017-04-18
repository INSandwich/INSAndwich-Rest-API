var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

var products = {

  getAll: function(req, res) {
    var pageSize = 9;
    var pageNumber = 0;
    var name = req.query.name ? "%"+req.query.name+"%" : "%";
    if(req.query.pageSize != null)
      pageSize = req.query.pageSize;
    if(req.query.pageNumber != null)
      pageNumber = req.query.pageNumber;

    //res.setHeader('Access-Control-Allow-Origin','*');
    db.all("SELECT * from Products WHERE Name LIKE ? LIMIT ? OFFSET ?", [name, pageSize, pageNumber],
    function(e, r) {
      if((r.length != 0) && (e == null)) {
        res.status(200).json({
          pageSize: pageSize,
          pageNumber: pageNumber,
          items: r
        });
      }
      else if (r.length == 0) {
        res.status(500).json({error: "Couldn't get products", detail: "No products retrieved."}).end();
      }
      else {
        res.status(500).json({error: "Couldn't get products", detail: e}).end();
      }
    }
    )
  },

  getOne: function(req, res) {
    db.all("select * from Products where Id = ?", req.params.id,
    function(e, r){
      if(r.length != 0 && e == null){
        //res.setHeader('Access-Control-Allow-Origin','*');
        res.status(200).json({item : r})
      } else {
        res.status(500).json({error : "Couldn't get product", detail : e}).end();
      }
    }
    )
  },

  getCategory: function(req, res) {
    var pageSize = 9;
    var pageNumber = 0;
    if(req.query.pageSize != null) {
      pageSize = req.query.pageSize;
    }
    if(req.query.pageNumber != null) {
      pageNumber = req.query.pageNumber;
    }
    db.all("SELECT * FROM Products WHERE Category_Id = ? LIMIT ? OFFSET ?", [req.params.categoryId, pageSize, pageNumber],
      function(e, r) {
        if((r.length != 0) && (e == null)) {
          res.setHeader('Access-Control-Allow-Origin','*');
          res.status(200).json({
            pageSize: pageSize,
            pageNumber: pageNumber,
            items: r
          });
        }
        else if (r.length == 0) {
          res.status(500).json({error: "Couldn't get products", detail: "No products retrieved."}).end();
        }
        else {
          res.status(500).json({error: "Couldn't get products", detail: e}).end();
        }
      }
    );
  },

  create: function(req, res) {
    // default values for non-critical data
    description = "No description available";
    available = 0;  // not available by default, might need later change

    if(req.body.name == null || req.body.image == null || req.body.price == null || req.body.category == null)
    {
      res.status(500).json({error : "Missing critical data"});
    } else {
      // init default values for non critical data if not submitted
      if(req.body.description != null)
        description = req.body.description;
      if(req.body.available != null)
        available = req.body.available;


      db.run("INSERT into Products (Name, Description, Available, Image, Price, Category_Id) VALUES (?,?,?,?,?,?)",
      [req.body.name, description, available, req.body.image, req.body.price, req.body.category],
      function(e, r){
        if(e == null && this.changes != 0){
          res.setHeader('Access-Control-Allow-Origin','*');
          res.status(200).json({
            Id : Number(this.lastID),
            Name : req.body.name,
            Description: description,
            Available: available,
            Image: req.body.image,
            Price: req.body.price,
            Category: req.body.category
          });
        } else {
          res.status(500).json({error : "Could not add product in database"}).end();
        }
      }
      );
    }
  },

  update: function(req, res) {
    console.log(req.body);
    console.log(req.params.id);
    // expect full data to update and dumps updates missing any data
    db.run("UPDATE Products SET Name = ?, Description = ?,  Available = ?, Image = ?, Price = ?, Category_Id = ? WHERE Id = ?",
    [req.body.name, req.body.description, req.body.available, req.body.image, req.body.price, req.body.category, req.params.id],
    function(e, r){
      console.log("error status = ", e);
      if ((e == null) && (this.changes != 0)) {
        res.status(200).json({
          Id : req.params.id,
          Name : req.body.name,
          Description: req.body.description,
          Available: req.body.available,
          Image: req.body.image,
          Price: req.body.price,
          Category: req.body.category
        });
      }
      else {
        res.status(500).json({ error: "Error updating product.", detail: e }).end();
      }
    }
    )
  },

  delete: function(req, res) {
    db.run("DELETE FROM Products WHERE Id=?", req.params.id,
      function(e, r) {
        if ((e == null) && (this.changes != 0)) {
          res.status(200).json({
            message: "Product deleted successfully."
          });
        }
        else {
          res.status(500).json({ error: "Error deleting product.", detail: e }).end();
        }
      });
  },
}
module.exports = products;
