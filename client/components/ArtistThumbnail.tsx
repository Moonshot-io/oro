import axios from 'axios';
import React, { useState, useContext, useEffect } from 'react';
import { Card,	CardHeader,	CardMedia, UseTheme, FavoriteIcon, IconButton, Tooltip } from '../styles/material';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface artistPropsType {
  artistProps: {
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
  },
  updateSingle: (name:string)=>void;
  favorite: boolean;
  getFaveArtists: (id:string | undefined)=>void;
}

const ArtistThumbnail = ({artistProps, updateSingle, favorite, getFaveArtists}:artistPropsType) => {
  const favesLocalData = window.localStorage.getItem('userFaves');
  if (!favesLocalData) {
    console.log('if local storage doesnt exist, create empty object');
    window.localStorage.setItem('userFaves', JSON.stringify({}));
  }
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const iconColors = theme.palette.secondary.contrastText;
  const [thumbFav, setThumbFav] = useState(false);
  const navigate = useNavigate();
  const {
    id,
    artistName,
    image,
  } = artistProps;

  const { currentUserInfo } = useContext(UserContext);
  const handleClick = (name:string) => {
    console.log('handleClick');
    navigate(`/artists/${name}`);
    updateSingle(name);
  };

  const handleFollow = (artistId: number) => {
    console.log('follow', artistId);
    const favesLocalData = window.localStorage.getItem('userFaves');
    let favesObj: object;
    if (favesLocalData) {
      favesObj = JSON.parse(favesLocalData);
    } else {
      favesObj = {};
    }

    favesObj[artistId] = true;
    window.localStorage.setItem('userFaves', JSON.stringify(favesObj));
    const userId = currentUserInfo?.id;
    axios.put('/api/favArtists/update', { params: { artist: artistId, user: userId } })
      .then(() => {
        setThumbFav(true);
      })
      .catch(err => {
        setThumbFav(true);
        console.error(err);
      }
      );
  };

  const getLocalStorage = ()=>{
    console.log('getLocalStorage');
    const favesLocalData = window.localStorage.getItem('userFaves');
    let favesObj: {0: boolean};
    if (favesLocalData) {
      favesObj = JSON.parse(favesLocalData);
      console.log(favesObj, id);
    } else {
      favesObj = {0: false};
    }

    return favesObj;
  };



  const handleUnfollow = (artistId: number) => {
    console.log('unfollow', artistId);
    const favesLocalData = window.localStorage.getItem('userFaves');
    let favesObj: {0: boolean};
    if (favesLocalData) {
      console.log(favesLocalData);
      favesObj = JSON.parse(favesLocalData);
      favesObj[artistId] = false;
      console.log(favesObj);
      window.localStorage.setItem('userFaves', JSON.stringify(favesObj));
      const checkLocalData = window.localStorage.getItem('userFaves');
      console.log(checkLocalData);
    } else {
      favesObj = {0: false};
      favesObj[artistId] = false;
      window.localStorage.setItem('userFaves', JSON.stringify(favesObj));
      const checkLocalData = window.localStorage.getItem('userFaves');
      console.log(checkLocalData);
    }

    const userId = currentUserInfo?.id;
    axios.put('/api/favArtists/update', { params: { artist: artistId, user: userId } })
      .then(() => {
        setThumbFav(false);
        getFaveArtists(currentUserInfo?.id);
      })
      .catch(err => {
        getFaveArtists(currentUserInfo?.id);
        setThumbFav(false);
        console.error(err);
      }
      );
  };

  useEffect(()=>{
    console.log('useEffect, set ThumbFav state with favorite', favorite);
    setThumbFav(thumbFav);
  }, []);

  return (
    <Card sx={{
      backgroundImage: 'none',
      bgcolor: inverseMode,
      ':hover': {
        boxShadow: 20,
        opacity: 0.8,
      } }}>
      <CardHeader
        title={artistName}
        sx={{ bgcolor: inverseMode }}
      />
      <CardMedia
        style = {{ cursor: 'pointer'}}
        component="img"
        height="194"
        image={image}
        alt={artistName}
        sx={{ bgcolor: inverseMode }}
        onClick={() => handleClick(artistName)}
      />
      <IconButton aria-label="add to favorites">
        {getLocalStorage()[id] ? <Tooltip title="unfollow"><FavoriteIcon sx={{ color: '#AE66FF' }} onClick={()=>{ handleUnfollow(id); }} /></Tooltip> : <Tooltip title="follow"><FavoriteIcon sx={{ color: iconColors }} onClick={()=>{ handleFollow(id); }}/></Tooltip>}
      </IconButton>
    </Card>
  );
};

export default ArtistThumbnail;
