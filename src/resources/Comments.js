import React from 'react';

const Name = () => <div style={{ fontWeight: '600' }}>Rivu</div>;

const Text = () => <div style={{ marginLeft: '5px' }}>Nice picture</div>;

const Comment = () => (
  <div style={{ display: 'flex' }}>
    <Name></Name>
    <Text></Text>
  </div>
);

const Comments = () => (
  <div>
    <Comment></Comment>
    <Comment></Comment>
  </div>
);

export default Comments;
