import React, { useState, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';

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
// import { UserContextProvider } from '../context/UserContext';
// import { ThemeContext } from '../context/ThemeContext';
import { Container } from '../components/Container';
import BackPack from '../pages/BackPack';
import { UserContext } from '../context/UserContext';

const App: React.FC = () => {
  // update React.FC, .FC deprecated?
  // const themeContext = useContext(ThemeContext);
  const userContext = useContext(UserContext);
  const { currentUserInfo } = userContext;

  const [notifications, setNotifications] = React.useState(0);
  const [profilePic, setProfilePic] = useState('');

  const getNotifications = () => {
    if (currentUserInfo?.id === undefined) {
      setNotifications(0);
    } else {
      axios.get('/api/notifications', {
        params: {
          userId: currentUserInfo?.id
        }
      })
        .then((notifData) => {
          setNotifications(notifData.data.filter((notif) => !notif.read).length);
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
      {/* <UserContextProvider> */}
      <EventContextProvider>
        <ArtistContextProvider>
          <Navbar notif={notifications} profile={profilePic} />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/notifications' element={<NotificationsFeed />} />
            <Route path='/backpack' element={<BackPack />} />
            <Route path='/eventListings' element={<EventListings />} />
            <Route path='/eventFeed' element={<EventFeed />} />
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
      {/* </UserContextProvider> */}
    </Container>
  );
};

export default App;
