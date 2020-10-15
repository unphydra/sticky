import React from 'react';

const AddComment = () => (
  <form
    style={{
      display: 'flex',
      padding: '5px',
      borderTop: '1px solid',
      height: '40px',
      width: '588px',
      justifyContent: 'space-between',
    }}
  >
    <input
      style={{
        width: '550px',
        outline: 'none',
        border: 'none',
      }}
      placeholder="add your comment"
    ></input>
    <button
      style={{
        width: '50px',
        outline: 'none',
        border: 'none',
        background: 'none',
        fontSize: '20px',
        fontWeight: '600',
      }}
    >
      Post
    </button>
  </form>
);

export default AddComment;
