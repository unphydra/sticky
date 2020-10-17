import React from 'react';
import styled from 'styled-components';

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
const StyledSubmitInput = styled.input`
  font-size: 18px;
  width: 50px;
  outline: none;
  border: none;
  background: none;
  font-weight: 600;
`;

const AddComment = () => {
  const handleSubmit = (e) => {};
  return (
    <AddCommentForm onSubmit={handleSubmit}>
      <StyledTextInput placeholder="Add a comment"></StyledTextInput>
      <StyledSubmitInput type="submit" value="Post"></StyledSubmitInput>
    </AddCommentForm>
  );
};

export default AddComment;
