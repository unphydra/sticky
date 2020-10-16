const request = require('superagent');
const data = require('../dummyData');

const handleAllPosts = (req, res) => {
  const { id } = req.session;
  res.json(data[id]);
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
  req.session = {
    id: userInfo.id,
    avatar: userInfo['avatar_url'],
    time: new Date().toJSON(),
  };
  return res.redirect('/');
};

const handleIsLoggedIn = (req, res) => {
  const { id } = req.session;
  if (id) {
    return res.json({ isLoggedIn: true });
  }
  return res.json({ isLoggedIn: false });
};

module.exports = {
  handleAllPosts,
  reqLogin,
  handleLogin,
  fetchUserDetails,
  handleIsLoggedIn,
};
