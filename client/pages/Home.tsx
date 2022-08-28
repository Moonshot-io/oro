import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

import { Box, Grid, UseTheme, Typography, Badge, TravelExploreIcon, MusicNoteIcon, LuggageIcon, GradeIcon, PriceChangeIcon, ForumIcon, EmailIcon, AccountCircleIcon } from '../styles/material';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;
  const navigate = useNavigate();
  useEffect(() => {
    // getUser();
  }, []);
  return (
    <Box sx={{ flexGrow: 1, mt: '60px' }}>
      <Grid container spacing={2}>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link
      to='/eventListings'
      style={{ textDecoration: 'none' }}
      key={'eventListings'}
    >
      <TravelExploreIcon sx={{ color: inverseMode, fontSize: '4.5rem' }} className='nav-icons'/>
      <Typography sx={{ color: inverseMode }}>Find Events</Typography>
    </Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/songFinder' style={{ textDecoration: 'none' }} key={'songFinder'}>
      <MusicNoteIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }} className='nav-icons'/>
      <Typography sx={{ color: inverseMode }}>Song Finder</Typography>
    </Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/artists' style={{ textDecoration: 'none' }} key={'artists'}>
      <GradeIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }} className='nav-icons'/>
      <Typography sx={{ color: inverseMode }}>Favorite Artists</Typography>
    </Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/chat' style={{ textDecoration: 'none' }} key={'chat'}> <ForumIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }} className='nav-icons'/><Typography sx={{ color: inverseMode }}>Chat</Typography></Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/profile' style={{ textDecoration: 'none' }} key={'profile'}>
        <AccountCircleIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }}/>
      <Typography sx={{ color: inverseMode }}>Account</Typography></Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/notifications' style={{ textDecoration: 'none' }} key={'notifications'}>
        <Badge color="primary" >
          <EmailIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }} className='nav-icons'/>
        </Badge>
        <Typography sx={{ color: inverseMode }}>Notifications</Typography></Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link to='/backpack' style={{ textDecoration: 'none' }} key={'backpack'}>
      <PriceChangeIcon sx={{ color: inverseMode,  fontSize: '4.5rem' }} className='nav-icons'/>
      <Typography sx={{ color: inverseMode }}>Budgets</Typography>
    </Link>
        </Grid>
        <Grid xs={6} md={6} item sx={{ mb: '15px' }}>
        <Link
      to='/travelPlanner'
      style={{ textDecoration: 'none' }}
      key={'travelPlanner'}
    >
      <LuggageIcon className='nav-icons' sx={{ color: inverseMode,  fontSize: '4.5rem' }}/>
      <Typography sx={{ color: inverseMode }}>Travel Planner</Typography>
    </Link>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Home;
