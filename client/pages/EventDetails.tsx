import React, { useContext } from 'react';
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
// import Sidebar from './Sidebar';
// import Footer from './Footer';

const EventDetails: React.FC = () => {
  const { getEventDetails } = useContext(EventContext);
  const eventData = getEventDetails('Z7r9jZ1AdFYep');

  const mainFeaturedPost = {
    title: eventData?.name,
    description: `${eventData?.venues.name}... ${eventData?.venues.city}, ${eventData?.venues.state}`,
    image: eventData?.image.url,
  };

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} sx={{ mt: 3 }}></Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default EventDetails;
