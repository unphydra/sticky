const request = require('superagent');
const multer = require('multer');
const fs = require('fs');
const data = require('../database/data.json') || {};

const writeToDb = () =>
  fs.writeFileSync(
    './backend/database/data.json',
    JSON.stringify(data),
    'utf8'
  );

const handleAllPosts = (req, res) => {
  const { id } = req.session;
  res.json({
    user: data.users[id],
    posts: Object.keys(data.posts).reverse(),
  });
};

const handlePost = (req, res) => {
  const { id } = req.params;
  const post = Object.assign({}, data.posts[id]);
  post.profile = data.users[post.userId];
  const likedUser = data.likes[id] || [];
  post.likedUser = likedUser.includes(req.session.id);
  post.likes = likedUser.length;
  res.json(post);
};

const handleComment = (req, res) => {
  const { id } = req.params;
  const comment = Object.assign({}, data.comments[id]);
  comment.profile = data.users[comment.userId];
  res.json(comment);
};

const handlePostComment = (req, res) => {
  const { id, text } = req.body;
  data.comments[data.commentId] = {
    userId: req.session.id,
    comment: text,
  };
  data.posts[id].comments.push(data.commentId);
  data.commentId++;
  writeToDb();
  res.sendStatus(200);
};

const handleLiked = (req, res) => {
  const postId = req.body.id;
  const userId = req.session.id;
  let postLike = data.likes[postId];
  if (postLike === undefined) {
    data.likes[postId] = [];
    postLike = data.likes[postId];
  }

  if (postLike.includes(userId)) {
    const inx = postLike.indexOf(userId);
    postLike.splice(inx, 1);
    writeToDb();
    return res.sendStatus(200);
  }

  postLike.push(userId);
  writeToDb();
  return res.sendStatus(200);
};

const handlePostLikes = (req, res) => {
  const { id } = req.params;
  const list = data.likes[id];

  if (!list) {
    return res.json([]);
  }

  const result = list.map((id) => data.users[id]);
  res.json(result);
};

const reqLogin = function (req, res) {
  const { ClientId } = req.app.locals;
  const redirectUri = 'http://192.168.0.152:3000/user/auth';
  const route = 'https://github.com/login/oauth/authorize';
  const url = `${route}?client_id=${ClientId}&redirect_uri=${redirectUri}`;
  res.redirect(url);
};

const getToken = function (code, ClientSecret, ClientId) {
  return request
    .post('https://github.com/login/oauth/access_token')
    .send({
      code,
      client_secret: ClientSecret,
      client_id: ClientId,
    })
    .set('Accept', 'application/json')
    .then((res) => res.body)
    .then((data) => data.access_token);
};

const getUserInfo = function (token) {
  return request
    .get('https://api.github.com/user')
    .set('User-Agent', 'sticky')
    .set('Authorization', `token ${token}`)
    .then((res) => res.body);
};

const fetchUserDetails = async function (req, res, next) {
  const { ClientId, ClientSecret } = req.app.locals;
  const code = req.query.code;
  try {
    const token = await getToken(code, ClientSecret, ClientId);
    const userInfo = await getUserInfo(token);
    req.userInfo = userInfo;
    return next();
  } catch (error) {
    return res.status('400').send('bad request');
  }
};

const handleLogin = async function (req, res) {
  const { userInfo } = req;
  const id = userInfo.id;
  req.session = {
    id,
    time: new Date().toJSON(),
  };

  if (!data.users[id]) {
    data.users[id] = {
      name: userInfo.name,
      profilePicture: userInfo['avatar_url'],
    };
  }

  return res.redirect('/');
};

const handleIsLoggedIn = (req, res) => {
  const { id } = req.session;
  if (id) {
    return res.json({ isLoggedIn: true });
  }
  return res.json({ isLoggedIn: false });
};

const handleNewPost = (req, res) => {
  const { id } = req.session;
  const storage = multer.diskStorage({
    destination: './backEnd/public/images',
    filename: (req, file, cb) => cb(null, `${data.postId}.jpg`),
  });
  const upload = multer({ storage: storage }).single('image');
  upload(req, res, (err) => {
    data.posts[data.postId] = {
      userId: id,
      heading: req.body.title,
      id: data.postId,
      image: `/images/${data.postId}.jpg`,
      comments: [],
      likedUser: [],
    };
    data.postId++;
    writeToDb();
    res.sendStatus(200);
  });
};

const verifyUser = (req, res, next) => {
  if (req.session.id !== null) {
    return next();
  }
  return res.status('400').send('bad request');
};

module.exports = {
  handleAllPosts,
  handlePost,
  handleComment,
  handlePostComment,
  handleLiked,
  handlePostLikes,
  reqLogin,
  handleLogin,
  fetchUserDetails,
  handleIsLoggedIn,
  handleNewPost,
  verifyUser,
};
