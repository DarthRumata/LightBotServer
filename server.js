const express = require('express');
const path = require('path');
const app = express();
const uploadRouter = require('./uploadRouter');
require('child_process');

app.set('view engine', 'pug');

app.get('/', function (req, res) {
  res.render('index', { title: 'LightBotServer', header: 'Welcome to LightBot Server' })
});

app.use('/uploadBot', uploadRouter);
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/js', express.static(path.join(__dirname, 'views/js')));
app.use('/external', express.static(path.join(__dirname, 'external')));

app.use("*",function(req,res){
  res.render("404");
});

app.listen(8000, () => {
  console.log("started");
});