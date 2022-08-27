import React, { useEffect, useContext, useState } from 'react';
import ArtistInfoCard from '../components/ArtistCards';
import { ArtistContext } from '../context/ArtistContext';
import { UserContext } from '../context/UserContext';
import {Box,	Grid} from '../styles/material';
import ArtistThumbnail from '../components/ArtistThumbnail';
import Login from './Login';

const Artists = () => {
  const { currentUserInfo } = useContext(UserContext);

  const artistContext = useContext(ArtistContext);
  const {artistData, getFaveArtists } = artistContext;
  const {allArtists, artists} = artistData;
  const [singleArtist, setSingleArtist] = useState('none');

  const updateSingle = (name: string) => {
    setSingleArtist(name);
  };

  const resetSingle = () => {
    setSingleArtist('none');
  };
  useEffect(() => {
    getFaveArtists(currentUserInfo?.id);
  }, []);

  if (currentUserInfo?.id === undefined) {
    return (
      <div>
        <h1>Please login to view artists</h1>
        <Login/>
      </div>
    );
  } else if (singleArtist !== 'none' && allArtists) {
    const current = allArtists.filter((obj) => obj.artistName == singleArtist);
    if (!current[0].image) {
      const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
      current.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
    }
    return (
      <div>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            <Grid item key={`art${current[0].artistName}`} xs={12} sm={12} md={12}>
              <ArtistInfoCard
                resetSingle={resetSingle}
                artistProps={current[0]}
                key={`artistObj${current[0].artistName}`}/>
            </Grid>
          </Grid>
        </Box>
      </div>
    );
  } else if (artists === true && Array.isArray(allArtists)) {
    const favesObj = {};
    allArtists.forEach((child) => {
      favesObj[child.id] = true;
      window.localStorage.setItem('userFaves', JSON.stringify(favesObj));
    });
    return (
      <div>
        <h1>Artists</h1>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            {allArtists.map((artObj, index) => {
              if (!artObj.image.length) {
                const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
                artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
              }
              return (
                <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
                  <ArtistThumbnail
                    updateSingle={updateSingle}
                    artistProps={artObj}
                    favorite={artists}
                    getFaveArtists={getFaveArtists}
                    key={`artistObj${index}`}/>
                </Grid>
              );
            })
            }
          </Grid>
        </Box>
      </div>
    );
  } else {
    return (
      <div>
        <h1>Start following artists</h1>
        <Box sx={{
          flexGrow: 1,
          height: '100%' }}>
          <Grid container spacing={2}>
            {Array.isArray(allArtists) && allArtists.map((artObj, index) => {
              if (!artObj.image.length) {
                const musicImages = ['music', 'band', 'concert', 'music-festival', 'rock-concert', 'musical', 'guitar', 'singer', 'opera'];
                artObj.image = `https://source.unsplash.com/random/?${musicImages[Math.floor(Math.random() * musicImages.length + 1)]}`;
              }
              return (
                <Grid item key={`art${index}`} xs={12} sm={4} md={3}>
                  <ArtistThumbnail
                    favorite={artists}
                    getFaveArtists={getFaveArtists}
                    updateSingle={updateSingle}
                    artistProps={artObj} key={`artistObj${index}`}/>
                </Grid>
              );
            })
            }
          </Grid>
        </Box>
      </div>
    );
  }

};
export default Artists;
