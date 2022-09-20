import React from 'react';
import { Grid, UseTheme } from '../styles/material';
import UserPicture from './UserPicture';

interface UserPhotosProps {
  photos: {
    userId: string;
    photoUrl: string;
    eventAPIid: string;
    create_at: string;
    caption?: string;
    deleteToken?: string;
  }[],
  getUserPhotos: any;
};

const UserPhotos: React.FC<UserPhotosProps> = ({ photos, getUserPhotos }) => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  return (
      <Grid
        container
        id='user-uploads'
        spacing={{ xs: .5, md: 2 }}
      >
        {Array.from(photos).map((photo, index) => (
          <Grid
            item
            key={index}
            xs={3.8} md={3}
            >
            <UserPicture photo={photo} getUserPhotos={getUserPhotos} />
          </Grid>
        ))}
      </Grid>
  );
};

export default UserPhotos;
