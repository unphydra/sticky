import React, { createContext, useContext, useState } from 'react';
import { StickyContext } from './StickyComp';
import styled from 'styled-components';
import StickyApi from './StickyApi';

const NewPostContext = createContext(null);

const InputFile = () => {
  const { handleImagePreview } = useContext(NewPostContext);
  return (
    <input
      type="file"
      onChange={handleImagePreview}
      style={{ display: 'none' }}
      id="imageInput"
    />
  );
};

const InputSubmit = ({ className }) => {
  const { handleSubmitFile } = useContext(NewPostContext);
  return (
    <input
      className={className}
      type="submit"
      onClick={handleSubmitFile}
      value="Submit"
    />
  );
};

const StyledInputSubmit = styled(InputSubmit)`
  border: 1px solid black;
  font-size: 20px;
  padding: 5px;
  background: none;
  cursor: pointer;
  width: 100px;
`;

const Label = ({ className, htmlFor, children }) => (
  <label htmlFor={htmlFor} className={className}>
    {children}
  </label>
);

const StyledLabel = styled(Label)`
  border: 1px solid black;
  font-size: 20px;
  padding: 5px;
  margin-right: 10px;
  cursor: pointer;
`;

const Upload = () => {
  return (
    <React.Fragment>
      <InputFile></InputFile>
      <StyledLabel htmlFor="imageInput">Upload file</StyledLabel>
    </React.Fragment>
  );
};

const TitleInput = ({ className }) => {
  const { handleTitle } = useContext(NewPostContext);

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleTitle(e.target.value);
  };

  return (
    <input
      className={className}
      placeholder="Add your title"
      type="text"
      onKeyDown={handleKeyPress}
      onBlur={(e) => handleTitle(e.target.value)}
    ></input>
  );
};

const StyledTitleInput = styled(TitleInput)`
  font-size: 30px;
  outline: none;
  border: none;
  border-bottom: 1px solid black;
`;

const Buttons = () => (
  <div style={{ alignSelf: 'center' }}>
    <Upload></Upload>
    <StyledInputSubmit></StyledInputSubmit>
  </div>
);

const SideBox = ({ className }) => {
  return (
    <div className={className}>
      <StyledTitleInput></StyledTitleInput>
      <Buttons></Buttons>
    </div>
  );
};

const ColumnFlexSideBox = styled(SideBox)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const BlankImage = styled.div`
  width: 300px;
  margin: 50px;
  background-color: gray;
  height: 400px;
  border-radius: 3px;
`;

const StyledImage = styled.img`
  width: 300px;
  margin: 50px;
`;

const ImagePreview = ({ value }) => (
  <div>
    {value ? (
      <StyledImage src={value} alt=""></StyledImage>
    ) : (
      <BlankImage></BlankImage>
    )}
  </div>
);

const BackgroundDiv = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: rgba(0, 0, 0, 0.65);
`;

const NewPostBox = styled.div`
  width: 800px;
  margin: auto;
  margin-top: 100px;
  background-color: white;
  display: flex;
  border-radius: 3px;
`;

const NewPost = () => {
  const [state, setState] = useState({
    image: null,
    imagePreview: null,
    title: null,
  });

  const { dispatch } = useContext(StickyContext);

  const handleImagePreview = (e) => {
    let imageFile = e.target.files[0];
    if (imageFile) {
      let imageUrl = URL.createObjectURL(imageFile);
      setState({
        image: imageFile,
        imagePreview: imageUrl,
        title: state.title,
      });
    }
  };

  const handleSubmitFile = () => {
    const { image, title } = state;
    if (image !== null && title !== null) {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('title', title);
      StickyApi.postForm(formData).then(() => dispatch({ comp: 'main' }));
    }
  };

  const handleTitle = (title) => {
    state.title = title;
    setState(state);
  };

  return (
    <NewPostContext.Provider
      value={{ handleImagePreview, handleSubmitFile, handleTitle }}
    >
      <BackgroundDiv
        onClick={(e) => {
          dispatch({ comp: 'main' });
        }}
      >
        <NewPostBox onClick={(e) => e.stopPropagation()}>
          <ImagePreview value={state.imagePreview}></ImagePreview>
          <ColumnFlexSideBox></ColumnFlexSideBox>
        </NewPostBox>
      </BackgroundDiv>
    </NewPostContext.Provider>
  );
};

export default NewPost;
