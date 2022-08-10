import React, {} from 'react';
import { Link, Routes, Route} from 'react-router-dom';
import Profile from '../pages/Profile';
import Notifications from '../pages/Notifications';
import EventListings from '../pages/EventListings';
import SongFinder from '../pages/SongFinder';
import Artists from '../pages/Artists';
import Menu from '../components/Menu';

const App: React.FC = () => { // update React.FC, .FC deprecated?

  return (
    <div>
      <header>
        <h1>Vibe Society</h1>
        <nav>
          <Link to='/profile'>My Account</Link>
          <Link to='/notifications'>Notifications</Link>
          <Link to='/eventListings'>Find Events</Link>
          <Link to='/songFinder'>Song Finder</Link>
          <Link to='/artists'>Artists</Link>
        </nav>
        <Menu />
      </header>
      <Routes>
        <Route path='/profile' element={<Profile />}/>
        <Route path='/notifications' element={<Notifications/>}/>
        <Route path='/eventListings' element={<EventListings/>}/>
        <Route path='/songFinder' element={<SongFinder/>}/>
        <Route path='/artists' element={<Artists/>}/>
      </Routes>
    </div>
  );
};
  
export default App;
// <Link to='/eventDetails'>Event Details</Link>
