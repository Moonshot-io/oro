import React, { DOMAttributes } from 'react';
import GoogleButton from 'react-google-button';
import {Typography} from '../styles/material'

interface HTMLAttributes<T> extends DOMAttributes<T> {
  align: any;
}


const Login = () => {

  const redirectToGoogle = () => {
    window.open('/auth/google', '_self');
  };

  return (
    <div className="page-body">
      <Typography
    variant="h2">
        Please Login to Use Our App
      </Typography>
      <form action="/auth/google" id='google-button'>
        <GoogleButton onClick={redirectToGoogle} />
      </form>
    </div>
  );
};

export default Login;
