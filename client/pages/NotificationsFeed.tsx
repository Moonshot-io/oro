import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Notification from '../components/Notification';
import {OutlinedInput, Fab, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { useTheme } from '@mui/material/styles';

const NotificationsFeed: React.FC = () => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = useTheme();
  const inverseMode = theme.palette.secondary.main;
  const [notifications, setNotifications] = useState([]);


  useEffect(() => {
    getNotifications();
    axios.put('/api/notifications', {
      userId: currentUserInfo.id,
    })
      .then(() => {})
      .catch((err) => console.error(err));
  }, []);


  const getNotifications = () => {
    axios.get('/api/notifications', {
      params: {
        userId: currentUserInfo.id
      }
    })
      .then((notificationsObj) => {
        setNotifications(notificationsObj.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearNotifications = () => {
    axios.delete('/api/notifications/all', {
      data: {
        userId: currentUserInfo.id,
      }
    })
      .then(() => console.info('deleted'))
      .catch((err) => console.error(err));
    setNotifications([]);
  };



  return (
    <div>
      <h1>Notifications</h1>
      <Button sx={{ bgcolor: inverseMode }} onClick={clearNotifications}>Clear Notifications</Button>
      <div>
        {notifications.map((notif, i) => {
          return (
            <div key={i}>

              <Notification notif={notif}/>
            </div>
          );
        })}
      </div>
    </div>

  );
};

export default NotificationsFeed;
