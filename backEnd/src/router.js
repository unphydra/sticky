const express = require('express');
const cookieSession = require('cookie-session');

const {
  handleAllPosts,
  handlePost,
  handleComment,
  handlePostComment,
  handleLiked,
  handlePostLikes,
  fetchUserDetails,
  handleLogin,
  reqLogin,
  handleIsLoggedIn,
  handleNewPost,
  verifyUser,
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
app.get('/login', reqLogin);
app.get('/api/isLoggedIn', handleIsLoggedIn);
app.get('/user/auth', fetchUserDetails, handleLogin);

app.use(verifyUser);
app.get('/api/getPosts', handleAllPosts);
app.get('/api/getPost/:id', handlePost);
app.get('/api/getComment/:id', handleComment);
app.post('/api/postComment', handlePostComment);
app.post('/api/imageUpload', handleNewPost);
app.post('/api/like', handleLiked);
app.get('/api/likes/:id', handlePostLikes);

module.exports = app;
