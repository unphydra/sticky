import React, { useContext, useEffect, useState } from 'react';
import Filter from './BackGroundDiv';
import styled from 'styled-components';
import StickyApi from './StickyApi';
import { StickyContext } from './StickyComp';

const Profile = ({ className, imageUrl }) => (
  <img className={className} src={imageUrl} alt=""></img>
);

const StyledProfile = styled(Profile)`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

const StyledName = styled.div`
  font-size: 26px;
  padding-left: 15px;
`;

const LikeHeading = styled.div`
  font-size: 20px;
  text-align: center;
  border-bottom: 1px solid rgb(200, 200, 200);
  padding: 10px;
`;

const Box = ({ className, list }) => {
  const compList = list.map((p, i) => (
    <div
      key={i}
      style={{
        display: 'flex',
        margin: '10px 10px 0px 10px',
        alignItems: 'center',
      }}
    >
      <StyledProfile imageUrl={p.profilePicture}></StyledProfile>
      <StyledName>{p.name}</StyledName>
    </div>
  ));
  return (
    <div className={className}>
      <LikeHeading>Likes</LikeHeading>
      {compList}
    </div>
  );
};

const LikesBox = styled(Box)`
  width: 400px;
  margin: auto;
  margin-top: 200px;
  background-color: white;
  border-radius: 3px;
  height: 400px;
  overflow-y: scroll;
`;

const PostLikes = () => {
  const [state, setState] = useState(null);
  const {
    visible: {
      data: { id },
    },
  } = useContext(StickyContext);

  useEffect(() => {
    StickyApi.fetchLikes(id).then(setState);
  }, [id]);
  console.log(state);
  return state ? (
    <Filter>
      <LikesBox list={state}></LikesBox>
    </Filter>
  ) : (
    <div>Loading...</div>
  );
};

export default PostLikes;
