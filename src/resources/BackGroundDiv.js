import React, { useContext } from 'react';
import styled from 'styled-components';
import { StickyContext } from './StickyComp';

const BackgroundDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

const Filter = ({ children }) => {
  const { dispatch } = useContext(StickyContext);
  return (
    <BackgroundDiv
      onClick={(e) => {
        dispatch({ comp: 'main' });
      }}
    >
      {children}
    </BackgroundDiv>
  );
};

export default Filter;
