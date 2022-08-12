import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArtistContext = React.createContext({});

const ArtistContextProvider = ({ children }) => {

  const [artistData, setArtistData] = useState(
    [{
      userId: 1,
      artistName: 'Beyoncé',
      bio: 'Beyoncé Giselle Knowles-Carter is an American singer, songwriter and actress. Beyoncé performed in various singing and dancing competitions as a child. She rose to fame in the late 1990s as the lead singer of Destiny\'s Child, one of the best-selling girl groups of all time. Beyoncé is often cited as an influence by other artists.\n\nBorn and raised in Houston, Texas, Beyoncé began performing in local competitions at age 7, eventually forming the group Girl\'s Tyme in 1990 with help from her parents. <a href=\"https://www.last.fm/music/+noredirect/Beyonc%C3%A9\">Read more on Last.fm</a>',
      ticketId: 'K8vZ9175rX7',
      youtube: 'https://www.youtube.com/user/beyonce',
      twitter: 'https://twitter.com/Beyonce',
      facebook: 'https://www.facebook.com/beyonce',
      instagram: 'https://www.instagram.com/beyonce/',
      itunes: 'https://itunes.apple.com/artist/id1419227',
      wiki: 'https://en.wikipedia.org/wiki/Beyonc%C3%A9',
      homepage: 'http://www.beyonce.com/',
      image: 'https://s1.ticketm.net/dam/a/7ce/49c8082f-fe10-43f3-be6e-a9c8a87807ce_655591_RETINA_LANDSCAPE_16_9.jpg'
    }]
  );

  const getFaveArtists = () => {
    // console.log('artist context executed');
    axios.get('/favArtists')
      .then((artistData) => {
        const artistsArr = artistData.data;
        // console.log(artistsArr);
        setArtistData(artistsArr);
      })
      .catch((err) => {
        // console.log('artistEvents');
        // console.error(err);
      });
  };

  useEffect(() => {
    getFaveArtists();
  }, []);

  const artistProps = {
    artistData,
    setArtistData,
    getFaveArtists,
  };

  return (
    <ArtistContext.Provider value = {artistProps} >
      { children }
    </ArtistContext.Provider>
  );
};


export { ArtistContextProvider, ArtistContext };
