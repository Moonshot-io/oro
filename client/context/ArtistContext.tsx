import React, { useState } from 'react';
// import axios from 'axios';

const ArtistContext = React.createContext({});

const ArtistContextProvider = ({ children }) => {
  const [artist, setArtist] = useState({
    id: 100045,
    userId: 3489758923745,
    artistName: 'Mariah Carie',
  });

  const appProps = {
    artist,
    setArtist,
  };

  return (
    <ArtistContext.Provider value = {appProps} >
      { children }
    </ArtistContext.Provider>
  );
};


export { ArtistContextProvider, ArtistContext };
