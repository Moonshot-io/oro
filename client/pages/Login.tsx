import React, { DOMAttributes } from 'react';
import GoogleButton from 'react-google-button';


interface HTMLAttributes<T> extends DOMAttributes<T> {
  align: any;
}


const Login = () => {

  const redirectToGoogle = () => {
    window.open('/auth/google', '_self');
  };

  return (
    <div className="page-body">
      <h1>
        Please Login to Use Our App
      </h1>
      <form action="/auth/google" id='google-button'>
        <GoogleButton onClick={redirectToGoogle} />
      </form>
    </div>
  );
};

export default Login;
