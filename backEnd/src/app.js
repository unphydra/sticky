const express = require('express');
const { handleAllPosts } = require('./handlers.js');

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(express.static(__dirname + '/../../build'));
app.use(express.static(__dirname + '/../../build/static'));
app.get('/api/getPosts', handleAllPosts);

module.exports = app;
