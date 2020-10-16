import React, { useEffect, useState } from 'react';
import StickyApi from './resources/StickyApi';
import StickyRouter from './StickyRouter';

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    StickyApi.isLoggedIn().then(setLoggedIn);
  }, []);
  return <StickyRouter loggedIn={loggedIn}></StickyRouter>;
};

export default App;
