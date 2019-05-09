// https://www.w3schools.com/nodejs/nodejs_mysql.asp
var mysql = require('mysql');
var express = require('express');
var app = express();
var router = express.Router();
var bodyParser = require('body-parser')

// parse application/json
app.use(bodyParser.json())

const cors = require('cors');
app.use(cors())


// Setting up the connection to the sql database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  insecureAuth: true,
  database: "nodemysql"
});

con.connect()

app.post('/info', function(req, res) {
  // Get sent data
  var name = req.body.name

  // SQL query
  var query = con.query("SELECT FavoriteColor FROM customers WHERE name='"+name+"'", function (err, result, fields) {
    if (err) throw err;
    //console.log("time to get lit fam!");
      console.log(result);
      res.send(result)
  });
});

app.post('/addUser', function(req, res) {
  // Get sent data
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  var address = req.body.address
  var favoriteColor = req.body.favoriteColor


  // SQL query
  var query = con.query("INSERT INTO customers (name, Email, Password, address, FavoriteColor) VALUES ('"+name+"','"+email+"','"+password+"','"+address+"','"+favoriteColor+"')", function (err, result, fields) {
    if (err) throw err;
    //console.log("time to get lit fam!");
  //    console.log(result);
      res.send("Submitted!")
  });
});

app.listen(3002, function() {
  console.log('Listening on port 3002!');
});
