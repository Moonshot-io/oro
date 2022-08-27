import React, { useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
// import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from './Header';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@mui/material';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
import { useTheme } from '@mui/material/styles';
const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getEventDetails, eventDetails } = useContext(EventContext);

  const idEvent = searchParams.get('id');

  const theme = useTheme();
  const inverseMode = theme.palette.secondary.main;

  const getDetails = () => {
    navigate(`/eventFeed/?id=${idEvent}`);
  };

  useEffect(() => {
    if (idEvent !== null) {
      getEventDetails(idEvent);
    }
  }, []);

  const mainFeaturedPost: {
    description?: string;
    image?: string;
    title?: string;
  } = {
    title: eventDetails?.name,
    description: `${eventDetails?.venues.name}... ${eventDetails?.venues.city.name}, ${eventDetails?.venues.state.name}`,
    image: eventDetails?.image,
  };

  const handleClick = () => {
    const city = eventDetails?.venues.city.name;
    if (city) {
      navigate('/travel-planner', { state: { city } });
    }
  };

  return (
    <Container maxWidth='lg'>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
      <Grid sx={{ mt: 3, alignItems: 'center' }}>
        <Grid>
          <Button sx={{ bgcolor: inverseMode }} onClick={handleClick}>Travel Information</Button>
        </Grid>
        <Grid>
          <Button sx={{ bgcolor: inverseMode }} onClick={getDetails}>Event Feed</Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EventDetails;
