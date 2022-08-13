// import axios from 'axios';
import React, { useState } from 'react';
import axios from 'axios';

type Props = {
  children: React.ReactNode
};

const UserContext = React.createContext({});

const UserContextProvider = ({ children }: Props) => {

  const appProps = {

  };
  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
