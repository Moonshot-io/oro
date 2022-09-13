import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
// import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
// import GitHubIcon from '@mui/icons-material/GitHub';
// import FacebookIcon from '@mui/icons-material/Facebook';
// import TwitterIcon from '@mui/icons-material/Twitter';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import Header from './Header';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
// import Sidebar from './Sidebar';
// import Footer from './Footer';
import { useTheme } from '@mui/material/styles';
import { UseTheme, IconButton, PushPinIcon } from '../styles/material';

function DetailCard({ detail }): JSX.Element {
  const { currentUserInfo } = useContext(UserContext);
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  useEffect(() => {
    getPins();
    console.log(detail);
  }, []);

  const getPins = () => {
    axios
      .get('/api/eventDetails/pins')
      .then((responseObj) => {
        setPins(responseObj.data.map((event, index) => event.eventAPIid));
      })
      .catch((err) => console.error('GET PINS', err));
  };

  const [pins, setPins] = useState(['foo', 'bar']);

  const postEvent = () => {
    axios
      .post('/api/eventDetails/pins', {
        userId: currentUserInfo?.id,
        eventAPIid: detail.id,
      })
      .then(getPins)
      .catch((err) => console.error('POST ERROR', err));
  };

  const deleteEvent = () => {
    axios
      .delete('/api/eventDetails/pins', { data: { eventAPIid: detail.id } })
      .then(() => {
        getPins();
      })
      .catch((err) => console.error('axios delete error', err));
  };

  const handleClick = () => {
    if (pins.includes(detail.id)) {
      return postEvent();
    } else if (pins == ['foo', 'bar']) {
      setPins(detail.id);
      return postEvent();
    } else if (!pins.includes(detail.id)) {
      return postEvent();
    }
  };

  console.log('event detail', detail);
  return (
    <div className='page-body'>
      <Card sx={{ maxWidth: 345 }}>
        <CardContent>
          <Typography
            color='text.secondary'
            gutterBottom
            variant='h5'
            component='div'
          >
            {moment(detail?.dates?.localDate).format('LL')}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.promoter?.name}
          </Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.venues?.address?.line1},{detail?.venues?.city?.name},
            {detail?.venues?.state?.name},{detail?.venues?.postalCode}
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant='contained' onClick={handleClick}>
            Save
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

const EventDetails: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { getEventDetails, eventDetails } = useContext(EventContext);

  const idEvent = searchParams.get('id');

  const theme = useTheme();
  const inverseMode = theme.palette.secondary.main;
  const iconColors = theme.palette.secondary.contrastText;
  const getDetails = () => {
    navigate(`/eventFeed/?id=${idEvent}`);
  };

  useEffect(() => {
    if (idEvent !== null) {
      getEventDetails(idEvent);
      console.log(eventDetails, 'not null');
    }
    console.log(eventDetails, ' null');
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
    <div className="page-body">
    <Container maxWidth='lg'>
      <main>
        <MainFeaturedPost post={mainFeaturedPost} />
      </main>
      <Grid sx={{ mt: 3, alignItems: 'center' }}>
        <DetailCard detail={eventDetails} />
        <Grid>
          <Button sx={{ bgcolor: inverseMode }} onClick={handleClick}>
            Travel Information
          </Button>
        </Grid>
        <Grid>
          <Button sx={{ bgcolor: inverseMode }} onClick={getDetails}>
            Event Feed
          </Button>
        </Grid>
      </Grid>
    </Container>
    </div>
  );
};

export default EventDetails;
