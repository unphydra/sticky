import React, { useContext } from 'react';
import { StickyContext } from './StickyComp';

const AppName = () => <div style={{ fontSize: '20px' }}>Sticky</div>;
const Search = () => <input placeholder="🔍search"></input>;

// <svg
//   aria-label="Home"
//   fill="#262626"
//   height="22"
//   viewBox="0 0 48 48"
//   width="22"
// >
//   <path d="M45.5 48H30.1c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2.1-4.6-4.6-4.6s-4.6 2.1-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.6-.6 2.1 0l21.5 21.5c.3.3.4.7.4 1.1v23.5c.1.8-.6 1.5-1.4 1.5z"></path>
// </svg>
const Home = () => (
  <svg
    aria-label="Home"
    fill="#262626"
    height="22"
    viewBox="0 0 48 48"
    width="22"
  >
    <path d="M45.3 48H30c-.8 0-1.5-.7-1.5-1.5V34.2c0-2.6-2-4.6-4.6-4.6s-4.6 2-4.6 4.6v12.3c0 .8-.7 1.5-1.5 1.5H2.5c-.8 0-1.5-.7-1.5-1.5V23c0-.4.2-.8.4-1.1L22.9.4c.6-.6 1.5-.6 2.1 0l21.5 21.5c.4.4.6 1.1.3 1.6 0 .1-.1.1-.1.2v22.8c.1.8-.6 1.5-1.4 1.5zm-13.8-3h12.3V23.4L24 3.6l-20 20V45h12.3V34.2c0-4.3 3.3-7.6 7.6-7.6s7.6 3.3 7.6 7.6V45z"></path>
  </svg>
);

const Message = () => (
  <svg
    aria-label="Direct"
    fill="#262626"
    height="22"
    viewBox="0 0 48 48"
    width="22"
  >
    <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z"></path>
  </svg>
);

const AddPost = () => {
  const { dispatch } = useContext(StickyContext);
  const handleClick = () => {
    dispatch({ comp: 'post' });
  };
  return (
    <svg
      height="22"
      width="22"
      viewBox="0 0 24 24"
      aria-hidden="true"
      aria-label=""
      role="img"
      onClick={handleClick}
    >
      <path d="M22 10h-8V2a2 2 0 0 0-4 0v8H2a2 2 0 0 0 0 4h8v8a2 2 0 0 0 4 0v-8h8a2 2 0 0 0 0-4"></path>
    </svg>
  );
};

const Profile = () => {
  const { state } = useContext(StickyContext);
  return (
    <img
      style={{
        height: '22px',
        width: '22px',
        border: '1px solid black',
        borderRadius: '50%',
      }}
      src={state.user.profilePicture}
      alt=""
    ></img>
  );
};

const NavBar = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      width: '108px',
      justifyContent: 'space-around',
    }}
  >
    <AddPost></AddPost>
    <Home></Home>
    <Message></Message>
    <Profile></Profile>
  </div>
);

const Heading = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: '5px',
      borderBottom: '1px solid',
      marginBottom: '15px',
    }}
  >
    <AppName></AppName>
    <Search></Search>
    <NavBar></NavBar>
  </div>
);

export default Heading;
