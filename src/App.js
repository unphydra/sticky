import React from 'react';
import Sticky from './resources/Sticky.js';
import { StickyComp } from './resources/StickyComp.js';

const App = () => {
  return (
    <div style={{ fontFamily: 'sans-serif' }}>
      <StickyComp>
        <Sticky></Sticky>
      </StickyComp>
    </div>
  );
};

export default App;
