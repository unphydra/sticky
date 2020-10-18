import React, { useContext } from 'react';
import Post from './Post';
import { StickyContext } from './StickyComp';

const Posts = () => {
  const { state } = useContext(StickyContext);
  const postsComp = state.posts.map((p) => <Post key={p} id={p}></Post>);

  return <div>{postsComp}</div>;
};

export default Posts;
