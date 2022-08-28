import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Notification from '../components/Notification';
import {Button} from '../styles/material';
import { useTheme } from '@mui/material/styles';

const NotificationsFeed: React.FC = () => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = useTheme();
  const inverseMode = theme.palette.secondary.main;
  const [notifications, setNotifications] = useState<Array<{id: number; userId: string; commentId: number; type: string; read: boolean; created_at: string;}>>([]);


  useEffect(() => {
    getNotifications();
  }, []);

  useEffect(() => {
    axios.put('/api/notifications', {
      userId: currentUserInfo?.id,
    });

  }, [notifications]);


  const getNotifications = (): void => {
    axios.get('/api/notifications', {
      params: {
        userId: currentUserInfo?.id
      }
    })
      .then((notificationsObj) => {
        setNotifications(notificationsObj.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const clearNotifications = (): void => {
    axios.delete('/api/notifications/all', {
      data: {
        userId: currentUserInfo?.id,
      }
    });
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
