// import axios from 'axios';
import React, { useState } from 'react';

type Props = {
  children: React.ReactNode
};

const UserContext = React.createContext({});

const UserContextProvider = ({ children }: Props) => {
  const [userInfo, setUserInfo] = useState([]);

  const appProps = {
    userInfo,
    setUserInfo,
  };
  return (
    <UserContext.Provider value={appProps}>{children}</UserContext.Provider>
  );
};
export { UserContextProvider, UserContext };
