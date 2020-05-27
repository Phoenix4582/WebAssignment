"use strict";
const https = require('https');
const fs = require('fs');
const path = require('path');
const sqlite3 = require("sqlite3").verbose();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = "3000";
const cookieParser = require('cookie-parser');
const sha256crypt = require('sha256crypt');

const defaultVideo = "/video/video1.mp4";
const defaultAudio = "/audio/audio1.mp3";

var htmlHeader = {"Content-Type": "text/html"};
var banned = [];
let OK = 200, ERROR = 404;


initDatabase();

banUpperCase("./public/", "");

app.use(lower);
app.use(ban);
initWebPage();

function initDatabase(){
  var db = openDatabase();
  db.run(`CREATE TABLE IF NOT EXISTS user(id INTEGER PRIMARY KEY AUTOINCREMENT, 
    username varchar(100) NOT NULL UNIQUE, 
    email varchar(100) NOT NULL UNIQUE, 
    password varchar(500) NOT NULL, 
    vid varchar(100) NOT NULL, 
    sound varchar(100) NOT NULL)`);
  closeDatabase(db);
}

function addData(username, email, password, req, res){
  var database = openDatabase();

  database.serialize(function() {
    var stmt = database.prepare('INSERT INTO user(username, email, password, vid, sound) VALUES(?, ?, ?, ?, ?)');
    stmt.run(username,email,encodePassword(password),defaultVideo,defaultAudio);
    stmt.finalize();
  });
  fs.readFile(__dirname + "/public/" + req.url + ".html", "utf8", function(err, data){
    if(err){console.log(err.message);}
    else{
      let ts = data.split("$");
      let vidsrc = defaultVideo;
      let audsrc = defaultAudio;
      let page = ts[0] + vidsrc + ts[1] + audsrc + ts[2] + username + ts[3] + username + ts[4] + email + ts[5];
      setCookies(res, vidsrc, audsrc, username, email);
      deliver(res, htmlHeader, page);
    }
  });
  closeDatabase(database);
}

function searchData(email, password, req, res){
  var db = openDatabase();
  db.serialize(function() {
    var ps = db.prepare('SELECT * FROM user WHERE email = ? ');
    ps.each(email, function(err, row) {
      if (err) {
        throw err;
      }else if (verifyPassword(row.password,password)){
        var user = row.username;
        var vidsrc = row.vid;
        var audsrc = row.sound;
        fs.readFile(__dirname + "/public/" + req.url + ".html", "utf8", function(err, data){
          if(err){console.log(err.message);}
          else{
            let ts = data.split("$");
            let page = ts[0] + vidsrc + ts[1] + audsrc + ts[2] + user + ts[3] + user + ts[4] + email + ts[5];
            setCookies(res, vidsrc, audsrc, user, email);
            deliver(res, htmlHeader, page);
          }
        });
      }else{
        console.log("Incompatible e-mail or password");
        res.send("Incompatible e-mail or password");
      }
    });
    ps.finalize();
  });
  closeDatabase(db);
}

function updateData(email, vid, sound){
  var database = openDatabase();
  database.serialize(function(){
    var stmt = database.prepare(`UPDATE user 
    SET vid = ?, sound = ? 
    WHERE email = ? `);
    stmt.run(vid, sound, email);
    stmt.finalize();
  });
  closeDatabase(database);
}

function openDatabase(){
  let db = new sqlite3.Database(path.join(__dirname,'.','public','db','users.db'), (err) => {
    if (err) {
      console.error(err.message);
    }else{
      console.log('Connected to the user database.');
    }
  });
  return db;
}

function closeDatabase(db){
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
}

function encodePassword(password){
  return sha256crypt.hash(password,80000,'wnsT7Yr92oJoP28r');
}

function verifyPassword(password,input){
  return sha256crypt.verify(input,80000,'wnsT7Yr92oJoP28r', password);
}

function setCookies(res, video, sound, user, email){
  res.setHeader('Set-Cookie',[email+"="+user+"%"+video+"%"+sound]);
}

function findLastCookie(source){
  return source[source.length-1];
}

function deliver(res, type, data){
  res.writeHead(OK, type);
  res.write(data);
  res.end();
}

function initWebPage(){
  app.get('/', loadLogin);
  app.get('/css/*', loadFile);
  app.get('/javascript/*',loadFile);
  app.get('/images/*',loadFile);
  app.get('/video/*',loadFile);
  app.get('/audio/*',loadFile);
  app.get('/icon/*',loadFile);

  app.use(bodyParser.urlencoded({
    extended: false
  }));
  
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.get('/admin*', getAdmin);
  app.post('/admin', redirectHtml);
  app.listen(port, loadPage);
}

function getAdmin(req, res){
  let us = req.url.split("?");
  fs.readFile(__dirname + "/public/" + us[0] + ".html", "utf8", function(err, data){
    if(err){console.log(err.message);}
    else{
      let ts = data.split("$");
      let cookies = req.headers.cookie.split(";");
      let target = findLastCookie(cookies);
      let user = target.split("%")[0].split("=")[1];
      let email = target.split("%")[0].split("=")[0].split(" ")[1];
      let vidsrc = target.split("%")[1];
      let audsrc = target.split("%")[2];
      let page = ts[0] + vidsrc + ts[1] + audsrc + ts[2] + user + ts[3] + user + ts[4] + email + ts[5];
      updateData(email,vidsrc, audsrc);
      setCookies(res, vidsrc, audsrc, user, email);
      deliver(res, htmlHeader, page);
    }
  });
}

function redirectHtml(req, res) {
  try{
    var username = req.body.name;
  }catch(error){
    var username = "***";
  }
  let email = req.body.email;
  var password = req.body.password;
  if(username !== undefined){
    addData(username, email, password, req, res);
  }
  else{
    searchData(email, password, req, res);
  }
}

function loadPage(){
  var host = "localhost";
  console.log("App is listening at http://%s:%s\n",host,port);
}

function loadLogin(req, res){
  res.sendFile(__dirname + '/public/login.html');
}

function loadFile(req, res){
  res.sendFile(__dirname + '/public/' + req.url);
}

// Make the URL lower case.
function lower(req, res, next) {
  req.url = req.url.toLowerCase();
  next();
}

// Forbid access to the URLs in the banned list.
function ban(req, res, next) {
  for (var i=0; i<banned.length; i++) {
      var b = banned[i];
      if (req.url.startsWith(b)) {
          res.status(ERROR).send("Filename not lower case");
          return;
      }
  }
  next();
}

// Check a folder for files/subfolders with non-lowercase names.  Add them to
// the banned list so they don't get delivered, making the site case sensitive,
// so that it can be moved from Windows to Linux, for example. Synchronous I/O
// is used because this function is only called during startup.  This avoids
// expensive file system operations during normal execution.  A file with a
// non-lowercase name added while the server is running will get delivered, but
// it will be detected and banned when the server is next restarted.
function banUpperCase(root, folder) {
  var folderBit = 1 << 14;
  var names = fs.readdirSync(root + folder);
  for (var i=0; i<names.length; i++) {
      var name = names[i];
      var file = folder + "/" + name;
      if (name != name.toLowerCase()) banned.push(file.toLowerCase());
      var mode = fs.statSync(root + file).mode;
      if ((mode & folderBit) == 0) continue;
      banUpperCase(root, file);
  }
}