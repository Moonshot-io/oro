import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, Avatar, UseTheme } from '../styles/material';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';

interface CommentProps {
  comment: {
    comment: string;
    created_at: string;
    edited: boolean;
    id: number;
    photoUrl: string;
    userId: string;
  },
  getComments: () => void
}

const AvatarComponent: React.FC = () => {

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = UseTheme();
  const themeContext = useContext(ThemeContext);

  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async (): Promise<void> => {
    await axios.get('/api/eventFeed/avatar', {
      params: {
        userId: currentUserInfo?.id
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
  };




  return (
    <div className='comments'>
          <Link to='/profile'>
              <Avatar sx={{ height: '30px', width: '30px'}} src={profilePic} />
            </Link>
    </div>
  );
};

export default AvatarComponent;
