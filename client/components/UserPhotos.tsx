import React from 'react';
import { ImageList, Grid } from '../styles/material';
import { useTheme } from '@mui/material/styles';
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
  const theme = useTheme();
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
