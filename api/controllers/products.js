var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('insandwich.db');

var products = {

  getAll: function(req, res) {
    var pageSize = 9;
    var pageNumber = 0;
    if(req.query.pageSize != null)
      pageSize = req.query.pageSize;
    if(req.query.pageNumber != null)
      pageNumber = req.query.pageNumber;

    db.all("SELECT * from Products LIMIT ? OFFSET ?", [pageSize, pageNumber],
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
    )
  },

  getOne: function(req, res) {
    db.all("select * from Products where Id = ?", req.params.id,
    function(e, r){
      if(r.length != 0 && e == null){
        res.setHeader('Access-Control-Allow-Origin','*');
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

  },

  updateProductInfo: function(req, res) {

  },

  delete: function(req, res) {

  },




}
module.exports = products;
