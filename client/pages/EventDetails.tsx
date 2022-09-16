import React, { useContext, useEffect, useState } from 'react';
import { EventContext } from '../context/EventContext';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import axios from 'axios';
import MainFeaturedPost from '../components/MainFeaturedPost';
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom';
import {
  UseTheme,
  IconButton,
  PushPinIcon,
  ColorButton,
  Grid,
  Container,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '../styles/material';

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

  return (
    <div>
      <Card
        sx={{
          maxWidth: 345,
          backgroundColor: inverseMode,
          textAlign: 'left',
          backgroundImage: 'none',
        }}
      >
        <CardContent>
          <Typography
            color={iconColors}
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
            {detail?.venues?.address?.line1} <br></br>
            {detail?.venues?.city?.name}, {detail?.venues?.state?.name},{' '}
            {detail?.venues?.postalCode}
          </Typography>
        </CardContent>
        <CardActions>
          <ColorButton variant='contained' onClick={handleClick}>
            Save
          </ColorButton>
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

  const theme = UseTheme();

  const getDetails = () => {
    navigate(`/eventFeed/?id=${idEvent}`);
  };

  useEffect(() => {
    if (idEvent !== null) {
      getEventDetails(idEvent);
      console.log(getEventDetails(idEvent), 'not null');
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
    <div>
      <Container maxWidth='lg'>
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
        </main>
        <div className='page-body'>
          <Grid sx={{ mt: 3, alignItems: 'center' }}>
            <DetailCard detail={eventDetails} />
            <Grid>
              <ColorButton onClick={handleClick}>
                Travel Information
              </ColorButton>
            </Grid>
            <Grid>
              <ColorButton onClick={getDetails}>Event Feed</ColorButton>
            </Grid>
          </Grid>
        </div>
      </Container>
    </div>
  );
};

export default EventDetails;
