import React, { useContext } from 'react';
import Container from './Container';
import Heading from './Heading';
import NewPost from './NewPost';
import PostLikes from './PostLikes';
import { StickyContext } from './StickyComp';

const Sticky = (props) => {
  const {
    state,
    visible: { comp },
  } = useContext(StickyContext);

  const isPost = comp === 'post';
  const isLikes = comp === 'like';

  return state === null ? (
    <div>Loading...</div>
  ) : (
    <React.Fragment>
      <div>
        <Heading></Heading>
        <Container></Container>
      </div>
      {isPost && <NewPost></NewPost>}
      {isLikes && <PostLikes></PostLikes>}
    </React.Fragment>
  );
};

export default Sticky;
