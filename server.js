const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const reactRender = require('react-render');
const createStore = require('redux').createStore;

require('babel-register')({
  presets: ['es2015', 'react', 'stage-1'],
  resolveModuleSource: require('babel-resolver')('/concept/src')
});

const app = express();

if (typeof(window) == 'undefined') {
  global.window = new Object();
}

global.API_URL = "http://localhost:8000";

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('React render server');
});

app.post('/render', function(req, res) {
  const API_URL = 'http://localhost:8000';
  reactRender(req.body, function(err, markup) {
    if (err) {
      res.json({
        error: {
          type: err.constructor.name,
          message: err.message,
          stack: err.stack
        },
        markup: null
      });
      console.log("An error occurred");
    } else {
      res.json({
        error: null,
        markup: markup
      });
      console.log("Render successful");
    }
  });
});

var port  = process.env.PORT || 9009
const server = http.createServer(app);
server.listen(port, function() {
  console.log('React render server listening on port 9009');
});