import React from 'react';
import { Redirect, useLocation } from 'react-router-dom';

const LoginPage = ({ loggedIn }) => {
  const location = useLocation();
  return loggedIn ? (
    <Redirect to={location.state.from.pathname}></Redirect>
  ) : (
    <div>
      <a href="/login">Login</a>
    </div>
  );
};

export default LoginPage;
