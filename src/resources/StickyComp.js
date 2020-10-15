import React, { createContext, useEffect, useState } from 'react';
import StickyApi from './StickyApi';

const StickyContext = createContext();

const StickyComp = ({ children }) => {
  const [state, setState] = useState(null);

  useEffect(() => {
    StickyApi.getPosts().then(setState);
  }, []);

  return (
    <StickyContext.Provider value={{ state }}>
      {children}
    </StickyContext.Provider>
  );
};

export { StickyComp, StickyContext };
