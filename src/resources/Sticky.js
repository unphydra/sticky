import React, { useContext } from 'react';
import Container from './Container';
import Heading from './Heading';
import NewPost from './NewPost';
import { StickyContext } from './StickyComp';

const Sticky = (props) => {
  const {
    state,
    visible: { comp },
  } = useContext(StickyContext);

  const post = comp === 'post';

  return state === null ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <div>
        <Heading></Heading>
        <Container></Container>
      </div>
      {post && <NewPost></NewPost>}
    </React.Fragment>
  );
};

export default Sticky;
