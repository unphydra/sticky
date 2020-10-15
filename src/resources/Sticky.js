import React, { useContext } from 'react';
import Container from './Container';
import Heading from './Heading';
import { StickyContext } from './StickyComp';

const Sticky = (props) => {
  const { state } = useContext(StickyContext);
  return state === null ? (
    <div>Loading...</div>
  ) : (
    <div>
      <Heading></Heading>
      <Container></Container>
    </div>
  );
};

export default Sticky;
