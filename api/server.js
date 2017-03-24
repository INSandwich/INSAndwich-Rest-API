var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var controllers = require('./controllers')

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded( {extended: true } ));
app.use(bodyParser.json());
var router = express.Router();

router.get('/', function(req, res) {
  res.json({
    message: "Welcome, this is the root of INSAndwich API."
  });
});

app.use(controllers);


app.listen(port);
console.log("Visit http://localhost:"+port);

module.exports = app;
