/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { EventContext } from '../context/EventContext';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { Main } from '../components/EventInfoDetails';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../components/MainFeaturedPost';
// import Sidebar from './Sidebar';

interface EventDetailsProps {
  id: string;
}
const EventDetails: React.FC<EventDetailsProps> = () => {
  const { getEventDetails, eventDetails, eventId } = useContext(EventContext);
  useEffect(() => {
    console.log('this is here', eventId);
    getEventDetails(eventId);
    console.log('EVENT DETAILS', eventDetails);
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

  // const description = {
  //   description?: string;
  // } = {
  //   description:
  // }

  const theme = createTheme();

  return (
    // <div>{eventDetails?.name}</div>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          <Grid container spacing={5} sx={{ mt: 3 }}>
            <Main
              title='Event Details'
              description={`${eventDetails?.dates.localDate}\n ${eventDetails?.dates.localTime}\n ${eventDetails?.dates.localDate}\n ${eventDetails?.venues.name}`}
            />
            {/* <Sidebar
              title={sidebar.title}
              description={sidebar.description}
              archives={sidebar.archives}
              social={sidebar.social}
            /> */}
          </Grid>
        </main>
      </Container>
    </ThemeProvider>
  );
};

export default EventDetails;
