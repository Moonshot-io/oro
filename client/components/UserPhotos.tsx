import React from 'react';
import { ImageList } from '../styles/material';
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
  }[];
};

const UserPhotos: React.FC<UserPhotosProps> = ({ photos, getUserPhotos }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  return (
    <div>
      <ImageList sx={{ margin: '8px' }} cols={3} rowHeight={128.67}>
        {photos.map((photo, index) => (
          <div key={index}>
            <UserPicture photo={photo} getUserPhotos={getUserPhotos} />
          </div>
        ))}
      </ImageList>
    </div>
  );
};

export default UserPhotos;
