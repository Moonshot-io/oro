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
    <div data-align='center'>
      <br></br>
      <h3>
        Please Login to Use Our App
      </h3>
      <form action="/auth/google" >
        <GoogleButton onClick={redirectToGoogle} id='google-button' />
      </form>
    </div>
  );
};

export default Login;
