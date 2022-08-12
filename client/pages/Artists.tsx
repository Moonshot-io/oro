import React, { useState, useEffect, useRef, useContext } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import axios from 'axios';
import { ArtistContext } from '../context/ArtistContext';
import {Box,	Grid, Item} from '../styles/material';

const Artists = () => {
  const artistContext = useContext(ArtistContext);
  // console.log(artistContext);
  const {artistData, getFaveArtists, setArtistData } = artistContext;
  const favorites = artistData;

  useEffect(() => {
    getFaveArtists();
  }, []);

  return (
    <div>
      <div>Hello ARtists</div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          {favorites.map((artObj) => {
            return (
              <Grid item key={artObj.id}>
                <ArtistInfoCard artistProps={artObj} key={artObj.id}/>
              </Grid>
            );
          })
          }
        </Grid>
      </Box>
    </div>
  );
};

export default Artists;

// const getFaveArtists = (name) => {
//   name = name | 'Adele';
//   axios.get('/favArtists', {
//     params: {
//       artistName: name
//     }
//   })
//     .then((artistData) => {
//       console.log('artistEvents', artistData.data[0]);
//       const artist = artistData.data;
//       setArtistData((state) => {
//         return { ...state, favArtist: artist };
//       });
//     })
//     .catch((err) => {
//       // console.log('artistEvents');
//       // console.error(err);
//     });
// };
