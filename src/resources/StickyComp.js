import React, {
  createContext,
  useEffect,
  useReducer,
  useState,
} from 'react';
import StickyApi from './StickyApi';

const StickyContext = createContext();

const reducer = (state, action) => {
  switch (action.comp) {
    case 'main':
      return { comp: 'main' };
    case 'like':
      return { comp: 'like', data: action.data };
    case 'post':
      return { comp: 'post' };
    default:
      return state;
  }
};

const StickyComp = ({ children }) => {
  const [state, setState] = useState(null);
  const [visible, dispatch] = useReducer(reducer, {
    comp: 'main',
  });

  useEffect(() => {
    StickyApi.getPosts().then(setState);
  }, [visible.comp]);

  return (
    <StickyContext.Provider value={{ state, dispatch, visible }}>
      {children}
    </StickyContext.Provider>
  );
};

export { StickyComp, StickyContext };
