import React, { useEffect, useState } from 'react';
import StickyApi from './StickyApi';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './LoginPage.js';
import Sticky from './Sticky.js';
import { StickyComp } from './StickyComp.js';

const StickyRouter = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    StickyApi.isLoggedIn().then(setLoggedIn);
  }, []);

  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          {loggedIn ? (
            <div
              style={{
                fontFamily: 'sans-serif',
                backgroundColor: 'rgb(250,250,250)',
              }}
            >
              <StickyComp>
                <Sticky></Sticky>
              </StickyComp>
            </div>
          ) : (
            <Redirect to="/loginPage" />
          )}
        </Route>
        <Route path="/loginPage" exact>
          <LoginPage loggedIn={loggedIn}></LoginPage>
        </Route>
      </Switch>
    </Router>
  );
};

export default StickyRouter;
