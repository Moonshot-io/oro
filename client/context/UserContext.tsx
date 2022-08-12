// import axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  children: React.ReactNode
};

const UserContext = React.createContext({});

const UserContextProvider = ({ children }: Props) => {

  const login = () => {
    axios.get('/auth/google', (req, res) => {
      console.log(res);
    })
  }

  const appProps = {
    login
  };
  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
