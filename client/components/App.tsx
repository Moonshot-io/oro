import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import Notifications from '../pages/Notifications';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Login from '../pages/Login';

import { ArtistContextProvider } from '../context/ArtistContext';
import { EventContextProvider } from '../context/EventContext';
import { UserContextProvider } from '../context/UserContext';
import Navbar from '../components/Navbar';

const App: React.FC = () => {
  // update React.FC, .FC deprecated?

  return (
    <EventContextProvider>
      <UserContextProvider>
        <ArtistContextProvider>
          <div>
            <header>
              <Navbar />
            </header>
            <Routes>
              <Route path='/home' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/notifications' element={<Notifications />} />
              <Route path='/eventListings' element={<EventListings />} />
              <Route path='/songFinder' element={<SongFinder />} />
              <Route path='/artists' element={<Artists />} />
              <Route path='/login' element={<Login />} />
            </Routes>
          </div>
        </ArtistContextProvider>
      </UserContextProvider>
    </EventContextProvider>
  );
};

export default App;
// <Link to='/eventDetails'>Event Details</Link>
