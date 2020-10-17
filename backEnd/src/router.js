const express = require('express');
const cookieSession = require('cookie-session');

const {
  handleAllPosts,
  fetchUserDetails,
  handleLogin,
  reqLogin,
  handleIsLoggedIn,
  handleNewPost,
} = require('./handlers.js');

const app = express();
const { env } = process;
const { CookieSecret, ClientId, ClientSecret } = env;
app.locals = { CookieSecret, ClientId, ClientSecret };

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use(cookieSession({ secret: CookieSecret }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../../build'));
app.use(express.static(__dirname + '/../public'));
app.get('/api/getPosts', handleAllPosts);
app.get('/login', reqLogin);
app.get('/user/auth', fetchUserDetails, handleLogin);
app.get('/api/isLoggedIn', handleIsLoggedIn);
app.post('/api/imageUpload', handleNewPost);

module.exports = app;
