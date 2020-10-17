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
  res.json({ user: data.users[id], posts: data.posts });
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
    data.posts.push({
      profile: data.users[id],
      heading: req.body.title,
      id: data.postId,
      image: `/images/${data.postId}.jpg`,
      likes: 0,
      comments: [],
    });
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
  reqLogin,
  handleLogin,
  fetchUserDetails,
  handleIsLoggedIn,
  handleNewPost,
  verifyUser,
};
