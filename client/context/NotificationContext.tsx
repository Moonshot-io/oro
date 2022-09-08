import React, { useState, createContext, ReactNode } from 'react';

const NotificationContext = createContext([]);


const ThemeContextProvider = ({ children, ...props }: Props) => {

  const [mode, setMode] = useState('dark');

  // function to toggle the theme
  const toggleMode = () => {
    mode === 'dark' ? setMode('light') : setMode('dark');
  };

  return (
    <ThemeContext.Provider
      {...props}
      value={{ mode, toggleMode, setMode}}>
      {children}
    </ThemeContext.Provider>
  );

};

export {ThemeContext, ThemeContextProvider};
