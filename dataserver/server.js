'use strict';

// load package
const express = require('express');
const bodyParser = require("body-parser");
const mysql = require('mysql')
const cors = require('cors');

const PORT = 3001;
const HOST = '0.0.0.0';
const app = express();
app.use(cors());
app.use( bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// create connection to mysql
// MARKER host: '0.0.0.0'/localhost: Used to  locally run app,mysql1 if use A3 docker
var connection = mysql.createConnection({
  host     : '0.0.0.0', 
  user     : 'root',
  password : 'admin',
 });
 
 connection.connect((err) => {
  if (err) return err;
  console.log('Connected to MySQL Server!');
}); 


 app.get('/init', (req, res) => {

  console.log("init");

  connection.query(`CREATE DATABASE IF NOT EXISTS postdb`, function (error,result) {
 if (error) console.log(error);
});

connection.query(`USE postdb`, function (error, results) {
 if (error) console.log(error);
});

connection.query(`CREATE TABLE IF NOT EXISTS posts
( id int unsigned NOT NULL auto_increment, topic varchar(100) NOT NULL,
data varchar(500) NOT NULL,
PRIMARY KEY (id)
)`, function (error,result) {
    if (error) console.log(error);
    res.send("create table ok");
 });
  });

 app.post('/addPost', (req,res) => {
  var topic = req.body.topic;
  var data = req.body.data;

  var query = `INSERT INTO posts (topic, data) VALUES ('${topic}', '${data}')`;
   connection.query(query, function (error,result) { 
    if(error) console.log(error); 
    res.send('post saved'); 
    console.log("...Posts Added");
  });
  
});

 app.get('/getPosts', (req,res) => { 
    connection.query(`USE postdb`, function (error, results) {
        if (error) console.log(error);
         });

    connection.query(`SELECT * FROM posts`, function (error, results) {
    if (error) console.log(error);
    res.send(results); });
    console.log("...Posts Loaded");
 });

app.listen(PORT, HOST);

console.log(`Running on http://${HOST}:${PORT}`);