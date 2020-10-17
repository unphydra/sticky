import React from 'react';
import { Redirect } from 'react-router-dom';

const LoginPage = ({ loggedIn }) => {
  return loggedIn ? (
    <Redirect to="/"></Redirect>
  ) : (
    <div>
      <a href="/login">Login</a>
    </div>
  );
};

export default LoginPage;
