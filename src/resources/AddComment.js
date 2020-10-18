import React, { useState } from 'react';
import styled from 'styled-components';
import StickyApi from './StickyApi';

const border = '1px solid rgb(200,200,200)';

const AddCommentForm = styled.form`
  display: flex;
  padding: 5px;
  border-top: ${border};
  height: 40px;
  width: 588px;
  justify-content: space-between;
`;
const StyledTextInput = styled.input`
  width: 550px;
  outline: none;
  border: none;
  padding-left: 10px;
  font-size: 16px;
`;
const StyledInput = styled.input`
  font-size: 18px;
  width: 50px;
  outline: none;
  border: none;
  background: none;
  font-weight: 600;
`;

const AddComment = ({ id, trigger }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.length > 0) {
      setText('');
      StickyApi.postComment(id, text).then(() => trigger((t) => !t));
    }
  };
  return (
    <AddCommentForm onSubmit={handleSubmit}>
      <StyledTextInput
        value={text}
        placeholder="Add a comment"
        onChange={(e) => {
          setText(e.target.value);
        }}
      ></StyledTextInput>
      <StyledInput type="submit" value="Post"></StyledInput>
    </AddCommentForm>
  );
};

export default AddComment;
