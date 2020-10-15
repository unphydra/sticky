import React from 'react';

const AddComment = () => {
  const handleSubmit = (e) => {};
  return (
    <form
      style={{
        display: 'flex',
        padding: '5px',
        borderTop: '1px solid',
        height: '40px',
        width: '588px',
        justifyContent: 'space-between',
      }}
      onSubmit={handleSubmit}
    >
      <input
        style={{
          width: '550px',
          outline: 'none',
          border: 'none',
        }}
        placeholder="add your comment"
      ></input>
      <input
        style={{
          width: '50px',
          outline: 'none',
          border: 'none',
          background: 'none',
          fontSize: '20px',
          fontWeight: '600',
        }}
        type="submit"
        value="Post"
      ></input>
    </form>
  );
};

export default AddComment;
