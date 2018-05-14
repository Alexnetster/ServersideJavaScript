var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();

app.set('views', './views_file');
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false }));
app.locals.pretty = true;

app.get('/topic/new', function(req, res) {
  fs.readdir('./data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    res.render('new', {topics:files});
  })
});

app.get(['/topic', '/topic/:id'], function(req, res) {
  fs.readdir('./data', function(err, files) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    var id = req.params.id;
    if(id) {
      fs.readFile('./data/'+id, 'utf8', function(err, data) {
        if(err) {
          console.log(err);
          res.status(500).send('Internal Server Error');
        }
        res.render('view', {topics:files, titles:id, descrition:data});
      });
    }
    else {
      res.render('view', {topics:files});
    }
  })
});

app.post('/topic', function(req, res) {
  var title = req.body.title;
  var description = req.body.description;
  
  fs.writeFile('./data/'+title, description, function(err) {
    if(err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
    //res.redirect()
    //res.send('Success!');
    res.redirect('/topic/'+title);
  })
});

var port = 3000;
app.listen(port, function(){
  console.log(`Connect http://node-js-ubuntu14-04--alexnetster407341.codeanyapp.com:${port}/topic/new`);
  console.log(`Connect http://node-js-ubuntu14-04--alexnetster407341.codeanyapp.com:${port}/topic/`);
})