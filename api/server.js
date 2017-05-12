var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');

var app = express();

var controllers = require('./controllers')

var port = process.env.PORT || 5000;

app.use(bodyParser.urlencoded( {extended: true } ));
app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.json({
    message: "Welcome, this is the root of INSAndwich API."
  });
  //console.log("Client connected");
});


app.use(cors({origin: '*'}));

app.use(controllers);

app.listen(port);
//console.log("Visit http://localhost:"+port);

module.exports = app;
