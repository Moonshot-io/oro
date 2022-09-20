import React, { useState, useContext, useEffect, useRef} from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { useLocation } from "react-router-dom";

import Profile from '../pages/Profile';
import Home from '../pages/Home';
import NotificationsFeed from '../pages/NotificationsFeed';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Login from '../pages/Login';
import EventDetails from '../pages/EventDetails';
import EventFeed from '../pages/EventFeed';
import OtherUser from '../pages/OtherUser';
import TravelPlanner from '../pages/TravelPlanner';
import Navbar from '../components/Navbar';
import UserChat from '../pages/UserChat';
import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { Container } from '../components/Container';
import BackPack from '../pages/BackPack';
import { UserContext } from '../context/UserContext';

import { io } from 'socket.io-client'
const App: React.FC = () => {
  const socket = useRef()
  const userContext = useContext(UserContext);

  const { currentUserInfo } = userContext;
  const location = useLocation();

  const [notifications, setNotifications] = React.useState<Array<{id: number; userId: string; commentId: number; type: string; read: boolean; created_at: string;}>>([]);
  const [profilePic, setProfilePic] = useState('');
  const [notiCount, setNotiCount] = useState<number>(0);



  useEffect(() => {
    socket.current = io.connect();
  }, []);
  socket.current.on('noti-receive', (data) => {
    getNotifications();
  })

  useEffect(() => {
    getNotifications();
  }, []);

    useEffect(() => {
    if(currentUserInfo?.id){
        socket.current.emit('add-user', currentUserInfo.id, currentUserInfo.fullName)
    }
    getNotifications();
  }, [currentUserInfo]);

  useEffect(() => {
    setNotiCount(notifications.filter((noti) => noti.read === false).length);
  }, [notifications])


  const getNotifications = () => {
    if (currentUserInfo?.id === undefined) {
      setNotifications([]);
    } else {
      axios.get('/api/notifications', {
        params: {
          userId: currentUserInfo?.id
        }
      })
        .then((notifData) => {
            setNotifications([...notifData.data]);
        })
        .catch((err) => console.error(err));
    }
  };

  const navClick = () => {
    getNotifications();
    getAvatar();
  };

  const getAvatar = async () => {
    if (currentUserInfo?.id === undefined) {
      setProfilePic(null);
    } else {
      await axios.get('/api/eventFeed/avatar', {
        params: {
          userId: currentUserInfo?.id
        }
      })
        .catch(() => console.info('no notifications'));
    }
  };

  return (
    <Container onClick={navClick}>
      <EventContextProvider>
        <ArtistContextProvider>
          <Navbar notiCount={notiCount} profile={profilePic} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notifications' element={<NotificationsFeed key={location.key} getNotifications= {getNotifications} notif={notifications}/>} />
            <Route path='/backpack' element={<BackPack />} />
            <Route path='/eventListings' element={<EventListings />} />
            <Route path='/eventFeed' socket={socket} element={<EventFeed />} />
            <Route path='/songFinder' element={<SongFinder />} />
            <Route path='/artists' element={<Artists />} />
            <Route path='/artists/*' element={<Artists />} />
            <Route path='/details' element={<EventDetails />} />
            <Route path='/login' element={<Login />} />
            <Route path='/user' element={<OtherUser />} />
            <Route path='/travel-planner' element={<TravelPlanner />} />
            <Route path='/chat' element={<UserChat />} />
          </Routes>
        </ArtistContextProvider>
      </EventContextProvider>
    </Container>
  );
};

export default App;