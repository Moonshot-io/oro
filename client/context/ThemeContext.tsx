import React, { useState, createContext, ReactNode } from 'react';

interface themeTypeProps {
  mode: string;
  toggleMode: () => void;
  setMode: React.Dispatch<React.SetStateAction<string>>
}

const ThemeContext = createContext({} as themeTypeProps);

interface Props {
  children?: ReactNode
}

const ThemeContextProvider = ({ children, ...props }: Props) => {

  const [mode, setMode] = useState('dark');

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
