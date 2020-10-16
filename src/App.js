import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import LoginPage from './resources/LoginPage.js';
import Sticky from './resources/Sticky.js';
import StickyApi from './resources/StickyApi.js';
import { StickyComp } from './resources/StickyComp.js';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    StickyApi.isLoggedIn().then(setLoggedIn);
  }, []);
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
            <Redirect to="/loginPage" />
          )}
        </Route>
        <Route path="/loginPage" exact>
          {loggedIn ? <Redirect to="/" /> : <LoginPage />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
