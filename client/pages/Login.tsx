import React, { useContext } from 'react';
// import UserContext from '../context/UserContext';
import GoogleButton from 'react-google-button';

const Login = () => {

  const redirectToGoogle = async () => {
    const googleLoginURL = 'http://localhost:5000/auth/auth/google';
    const newWindow = window.open(googleLoginURL, '_blank', 'width=500, height=600');
  }

  return (
    <div align='center'>
        <br></br>
      <h3>
    Please Login to Use Our App
    </h3>
        <form action="/auth/google">
          <GoogleButton onClick={ redirectToGoogle }/>
        </form>
      </div>
  )
}

export default Login;