import React, { useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from './Header';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { useSearchParams } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';

const EventDetails: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { getEventDetails, eventDetails } = useContext(EventContext);

  const idEvent = searchParams.get('id');

  // console.log('THIS IS THE ID', idEvent);

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

  const theme = createTheme();

  return (
    <Container maxWidth='lg'>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
        <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
      </main>
    </Container>
  );
};

export default EventDetails;
