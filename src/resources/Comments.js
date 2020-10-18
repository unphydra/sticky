import React, { useEffect, useState } from 'react';
import StickyApi from './StickyApi';

const Name = ({ name }) => <div style={{ fontWeight: '600' }}>{name}</div>;

const Text = ({ text }) => <div style={{ marginLeft: '5px' }}>{text}</div>;

const Comment = ({ id }) => {
  const [value, setValue] = useState(null);

  useEffect(() => {
    StickyApi.getComment(id).then(setValue);
  }, [id]);

  return value ? (
    <div style={{ display: 'flex' }}>
      <Name name={value.profile.name}></Name>
      <Text text={value.comment}></Text>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

const Comments = ({ value }) => {
  const commentsComp = value
    .slice(-3)
    .map((c) => <Comment key={c} id={c}></Comment>);

  return <div>{commentsComp}</div>;
};

export default Comments;
