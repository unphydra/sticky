import React from 'react';

const Name = ({ name }) => <div style={{ fontWeight: '600' }}>{name}</div>;

const Text = ({ text }) => <div style={{ marginLeft: '5px' }}>{text}</div>;

const Comment = ({ value }) => (
  <div style={{ display: 'flex' }}>
    <Name name={value.profile.name}></Name>
    <Text text={value.comment}></Text>
  </div>
);

const Comments = ({ value }) => {
  const commentsComp = value
    .slice(-3)
    .map((c) => <Comment key={c.id} value={c}></Comment>);

  return <div>{commentsComp}</div>;
};

export default Comments;
