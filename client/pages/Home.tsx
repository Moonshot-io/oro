import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

import { Box, Grid, UseTheme, Typography, Badge, TravelExploreIcon, MusicNoteIcon, LuggageIcon, GradeIcon, PriceChangeIcon, ForumIcon, EmailIcon, AccountCircleIcon } from '../styles/material';

import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const highlight = theme.palette.primary.contrastText;
  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;
  const navigate = useNavigate();
  useEffect(() => {
    // getUser();
  }, []);
  return (
    <div>
      <div className="home-body">
    <Box sx={{ flexGrow: 1, mt:'40px'}}>
    <div className='home-text-box home-body home-text'>
    <Typography
    variant="h2"
    align="left"
    className='home-text-box-box home-body home-text'>What is Vibe Society?</Typography>
    <Typography
    variant="body1"
    align="left"
    className='home-text-box home-body home-text'>
        Vibe Society is a social app made for all types of music lovers. From the casual listener to the hardcore festival/concert goer, this app lets you discover new songs and keep up-to-date with where your favorite artists will be and plan your next adventures with ease.
        </Typography>
      </div>
      <br></br>
      <Grid container spacing={2}>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
          <div className="home-icons">
        <Link
        className="home-icons"
      to='/eventListings'
      style={{ textDecoration: 'none' }}
      key={'eventListings'}
    >
      <TravelExploreIcon sx={{ color: highlight, fontSize: '2.5rem' }} className="home-icons"/>
      <Typography className="home-text">Find Events</Typography>
    </Link>
    </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
    <div className="home-icons">
        <Link className="home-icons" to='/songFinder' style={{ textDecoration: 'none' }} key={'songFinder'}>
      <MusicNoteIcon sx={{ color: highlight,  fontSize: '2.5rem' }} className="home-icons"/>
      <Typography className="home-text">Song Finder</Typography>
    </Link>
        </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
        <div className="home-icons">
        <Link to='/artists' className="home-icons" style={{ textDecoration: 'none' }} key={'artists'}>
      <GradeIcon className="home-icons" sx={{ color: highlight,  fontSize: '2.5rem' }} />
      <Typography className="home-text">Favorite Artists</Typography>
    </Link>
        </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
        <div className="home-icons">
        <Link to='/chat' className="home-icons" style={{ textDecoration: 'none' }} key={'chat'}> <ForumIcon sx={{ color: highlight,  fontSize: '2.5rem' }} className="home-icons"/><Typography className="home-text">Chat</Typography></Link>
        </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
        <div className="home-icons">
        <Link to='/profile' className="home-icons" style={{ textDecoration: 'none' }} key={'profile'}>
        <AccountCircleIcon className="home-icons" sx={{ color: highlight,  fontSize: '2.5rem' }}/>
      <Typography className="home-text">Account</Typography></Link>
        </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
        <div className="home-icons">
        <Link to='/notifications' className="home-icons" style={{ textDecoration: 'none' }} key={'notifications'}>
        <Badge color="primary" >
          <EmailIcon sx={{ color: highlight,  fontSize: '2.5rem' }} className="home-icons"/>
        </Badge>
        <Typography className="home-text">Notifications</Typography></Link>
        </div>
        </Grid>

        <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
        <div className="home-icons">
        <Link className="home-icons" to='/backpack' style={{ textDecoration: 'none' }} key={'backpack'}>
      <PriceChangeIcon className="home-icons" sx={{ color: highlight,  fontSize: '2.5rem' }} />
      <Typography className="home-text">Budgets</Typography>
    </Link>
        </div>
        </Grid>

      </Grid>
    </Box>
    </div>
    </div>
  );
};


export default Home;


{/* <Grid xs={6} md={4} item sx={{ mb: '15px' }}>
<div className="home-icons">
<Link
className="home-icons"
to='/travelPlanner'
style={{ textDecoration: 'none' }}
key={'travelPlanner'}
>
<LuggageIcon className="home-icons" sx={{ color: inverseMode,  fontSize: '2.5rem' }}/>
<Typography className="home-icons" sx={{ color: inverseMode }}>Travel Planner</Typography>
</Link>
</div>
</Grid> */}