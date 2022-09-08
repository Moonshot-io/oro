import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserPhotos from '../components/UserPhotos';
import { useTheme } from '@mui/material/styles';
import { Box, Grid, Link, IconButton, FacebookIcon, InstagramIcon, TwitterIcon, Avatar, Typography } from '../styles/material';

const OtherUser: React.FC = () => {
  const [userInfo, setUserInfo] = useState
    <{
      googleId: string;
      fullName: string;
      profileURL: string;
      fbId?: string;
      instaId?: string;
      twitterId?: string;
    }>({
      googleId: '',
      fullName: '',
      profileURL: '',
      fbId: '',
      instaId: '',
      twitterId: '',
    });
  const [userPhotos, setUserPhotos] = useState([]);
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const params = (new URLSearchParams(window.location.search));
  const id = params.get('id');

  const getUserInfo = () => {
    axios.get(`/api/profile/${id}`)
      .then(({ data }) => {
        setUserInfo(data);
      })
      .catch(err => console.error(err));
  };

  const getUserPhotos = () => {
    axios.get(`/api/profile/event_photos/${id}`)
      .then(({ data }) => {
        setUserPhotos(data);
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    getUserInfo();
    getUserPhotos();
  }, []);

  return (
    <div className="page-body">
      <Typography
    variant="h2">{userInfo['fullName']}</Typography>
      <div id='profile_avatar'>
        <Avatar
          alt={userInfo['fullName']}
          src={userInfo['profileURL']}
          sx={{ width: 150, height: 150, mt: '30px', ml: 'auto', mr: 'auto' }}
        />
      </div>
      <div>
        <Box>
          <Grid container spacing={2}>
            {
              userInfo.fbId
                ?
                <Grid item>
                  <Link href={userInfo.fbId}>
                    <IconButton><FacebookIcon /></IconButton>
                  </Link>
                </Grid>
                : null
            }
            {
              userInfo.instaId
                ?
                <Grid item>
                  <Link href={userInfo.instaId}>
                    <IconButton><InstagramIcon /></IconButton>
                  </Link>
                </Grid>
                : null
            }
            {
              userInfo.twitterId
                ?
                <Grid item>
                  <Link href={userInfo.twitterId}>
                    <IconButton><TwitterIcon /></IconButton>
                  </Link>
                </Grid>
                : null
            }
          </Grid>
        </Box>
      </div>
      <UserPhotos photos={userPhotos} getUserPhotos={getUserPhotos} />
    </div>
  );
};

export default OtherUser;
