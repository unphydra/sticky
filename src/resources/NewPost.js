import React, { createContext, useContext, useState } from 'react';
import { StickyContext } from './StickyComp';

const NewPostContext = createContext(null);

const Upload = () => {
  const { handleImagePreview } = useContext(NewPostContext);
  return (
    <React.Fragment>
      <input
        type="file"
        onChange={handleImagePreview}
        style={{ display: 'none' }}
        id="imageInput"
      />
      <label
        htmlFor="imageInput"
        style={{
          border: '1px solid black',
          fontSize: '20px',
          padding: '5px',
          marginRight: '10px',
          cursor: 'pointer',
        }}
      >
        Upload file
      </label>
    </React.Fragment>
  );
};

const TitleInput = () => {
  const { handleTitle } = useContext(NewPostContext);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleTitle(e.target.value);
  };

  return (
    <input
      style={{
        fontSize: '30px',
        outline: 'none',
        border: 'none',
        borderBottom: '1px solid black',
      }}
      placeholder="Add your title"
      type="text"
      onKeyDown={handleKeyPress}
      onBlur={(e) => handleTitle(e.target.value)}
    ></input>
  );
};

const SideBox = () => {
  const { handleSubmitFile } = useContext(NewPostContext);
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
      }}
    >
      <TitleInput></TitleInput>
      <div>
        <Upload></Upload>
        <input
          style={{
            border: '1px solid black',
            fontSize: '20px',
            padding: '5px',
            background: 'none',
            cursor: 'pointer',
          }}
          type="submit"
          onClick={handleSubmitFile}
          value="Submit"
        />
      </div>
    </div>
  );
};

const ImagePreview = ({ value }) => (
  <div style={{ width: '400px' }}>
    {value ? (
      <img style={{ width: '300px', margin: '50px' }} src={value} alt="" />
    ) : (
      <div
        style={{
          width: '300px',
          backgroundColor: 'gray',
          height: '400px',
          margin: '50px',
        }}
      ></div>
    )}
  </div>
);

const NewPost = () => {
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [title, setTitle] = useState(null);

  const { dispatch } = useContext(StickyContext);

  const handleImagePreview = (e) => {
    let imageFile = e.target.files[0];
    if (imageFile) {
      let imageUrl = URL.createObjectURL(imageFile);
      setImagePreview(imageUrl);
      setImage(imageFile);
    }
  };

  const handleSubmitFile = () => {
    if (image !== null && title !== null) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);

      fetch('/api/imageUpload', {
        method: 'POST',
        body: formData,
      }).then(() => dispatch({ comp: 'main' }));
    }
  };

  const handleTitle = (title) => {
    setTitle(title);
  };

  return (
    <NewPostContext.Provider
      value={{ handleImagePreview, handleSubmitFile, handleTitle }}
    >
      <div
        style={{
          position: 'absolute',
          width: '100vw',
          height: '100vh',
          top: '0',
          backgroundColor: 'rgba(239,239,239,0.7)',
          zIndex: '1',
        }}
        onClick={(e) => {
          dispatch({ comp: 'main' });
        }}
      >
        <div
          style={{
            width: '800px',
            border: '1px solid black',
            margin: 'auto',
            marginTop: '100px',
            backgroundColor: 'white',
            display: 'flex',
            zIndex: '2',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <ImagePreview value={imagePreview}></ImagePreview>
          <SideBox></SideBox>
        </div>
      </div>
    </NewPostContext.Provider>
  );
};

export default NewPost;
