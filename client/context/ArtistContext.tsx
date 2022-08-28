import React, { useState, ReactNode } from 'react';
import axios from 'axios';

interface Props {
  children?: ReactNode
}

interface artistTypeProps {
  artistData: {
    allArtists: {
    id: number,
    artistName: string,
    bio: string,
    ticketId: string,
    youtube: string,
    twitter: string,
    facebook: string,
    instagram: string,
    itunes: string,
    wiki: string,
    homepage: string,
    image: string,
    }[],
  artists: boolean},
  setArtistData: object,
  getFaveArtists: (id: string | undefined) => void,
}

const ArtistContext = React.createContext({} as artistTypeProps);

const ArtistContextProvider = ({ children }: Props) => {

  const [artistData, setArtistData] = useState(
    {allArtists: [{
      id: 0,
      artistName: 'Beyoncé',
      bio: 'Beyoncé Giselle Knowles-Carter is an American singer, songwriter and actress. Beyoncé performed in various singing and dancing competitions as a child. She rose to fame in the late 1990s as the lead singer of Destiny\'s Child, one of the best-selling girl groups of all time. Beyoncé is often cited as an influence by other artists.\n\nBorn and raised in Houston, Texas, Beyoncé began performing in local competitions at age 7, eventually forming the group Girl\'s Tyme in 1990 with help from her parents. <a href="https://www.last.fm/music/+noredirect/Beyonc%C3%A9">Read more on Last.fm</a>',
      ticketId: 'K8vZ9175rX7',
      youtube: 'https://www.youtube.com/user/beyonce',
      twitter: 'https://twitter.com/Beyonce',
      facebook: 'https://www.facebook.com/beyonce',
      instagram: 'https://www.instagram.com/beyonce/',
      itunes: 'https://itunes.apple.com/artist/id1419227',
      wiki: 'https://en.wikipedia.org/wiki/Beyonc%C3%A9',
      homepage: 'http://www.beyonce.com/',
      image: 'https://s1.ticketm.net/dam/a/7ce/49c8082f-fe10-43f3-be6e-a9c8a87807ce_655591_RETINA_LANDSCAPE_16_9.jpg'
    }],
    artists: true,
    }
  );

  const getFaveArtists = (id: string | undefined) => {
    if (id) {
      axios.get(`/api/favArtists/${id}`)
        .then((artistData) => {
          const artistsArr = artistData.data;
          setArtistData(artistsArr);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <ArtistContext.Provider value = {{artistData, setArtistData, getFaveArtists}} >
      { children }
    </ArtistContext.Provider>
  );
};


export { ArtistContextProvider, ArtistContext };
