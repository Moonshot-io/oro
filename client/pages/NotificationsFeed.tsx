import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context/UserContext';
import axios from 'axios';
import Notification from '../components/Notification';
import {Button, Typography, UseTheme} from '../styles/material';

interface NotificationProps {
  notif: {
    commentId: number;
    created_at: string;
    id: number;
    read: boolean;
    type: string;
    userId: string;
  }
}

const NotificationsFeed: React.FC<NotificationProps> = ({notif}) => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;
  const [notifications, setNotifications] = useState<Array<{id: number; userId: string; commentId: number; type: string; read: boolean; created_at: string;}>>([]);


  useEffect(() => {
    setNotifications(notif);
    // console.log(notif);
    // getNotifications();
  }, []);

  useEffect(() => {
    axios.put('/api/notifications', {
      userId: currentUserInfo?.id,
    });

  }, [notifications]);


  // const getNotifications = (): void => {
  //   axios.get('/api/notifications', {
  //     params: {
  //       userId: currentUserInfo?.id
  //     }
  //   })
  //     .then((notificationsObj) => {
  //       setNotifications(notificationsObj.data);
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const clearNotifications = (): void => {
    axios.delete('/api/notifications/all', {
      data: {
        userId: currentUserInfo?.id,
      }
    });
    setNotifications([]);
  };



  return (
    <div className="page-body">
      <Typography
    variant="h2">Notifications</Typography>
      <Button sx={{ bgcolor: inverseMode }} onClick={clearNotifications}>Clear Notifications</Button>
      <div >
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
