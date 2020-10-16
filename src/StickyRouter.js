import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './resources/LoginPage.js';
import Sticky from './resources/Sticky.js';
import NewPost from './resources/NewPost.js';
import { StickyComp } from './resources/StickyComp.js';

const StickyRouter = ({ loggedIn }) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? (
            <div style={{ fontFamily: 'sans-serif' }}>
              <StickyComp>
                <Sticky></Sticky>
              </StickyComp>
            </div>
          ) : (
            <Redirect
              to={{
                pathname: '/loginPage',
                state: { from: { pathname: '/' } },
              }}
            />
          )}
        </Route>
        <Route path="/loginPage" exact>
          <LoginPage loggedIn={loggedIn}></LoginPage>
        </Route>
        <Route path="/newPost" exact>
          {loggedIn ? (
            <NewPost></NewPost>
          ) : (
            <Redirect
              to={{
                pathname: '/loginPage',
                state: { from: { pathname: '/newPost' } },
              }}
            />
          )}
        </Route>
      </Switch>
    </Router>
  );
};

export default StickyRouter;
