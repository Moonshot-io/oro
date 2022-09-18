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
  Divider,
  CardActions,
  CardContent,
  Typography,
  Link,
} from '../styles/material';
import { Stack } from '@mui/material';

function DetailCard({ detail }): JSX.Element {
  const { currentUserInfo } = useContext(UserContext);
  const theme = UseTheme();
  const navigate = useNavigate();
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
            {detail?.name}
          </Typography>
          <Typography> Promoter :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.promoter?.name}
          </Typography>
          <Typography> Venue :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.venues?.name}
          </Typography>
          <Typography> Address :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.venues?.address?.line1} <br></br>
            {detail?.venues?.city?.name}, {detail?.venues?.state?.name},{' '}
            {detail?.venues?.postalCode}
          </Typography>
          <Typography>Phone Number :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.boxOfficeInfo.phoneNumberDetail}
          </Typography>
          <Typography>Box Office Info :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.boxOfficeInfo.openHoursDetail}
          </Typography>
          <Typography>Parking Info :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.boxOfficeInfo.parkingDetails}
          </Typography>
          <Typography>Will Call Info :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.boxOfficeInfo.willCallDetail}
          </Typography>
          <Typography>General Event Info :</Typography>
          <Typography variant='body2' color='text.secondary'>
            {detail?.info?.info}
            <br />
            <Divider />
            <br />
            {detail?.info?.note}
            <br />
            <Divider />
            <br />
            {detail?.generalInfo?.generalRule}
          </Typography>
        </CardContent>
        <Stack
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <CardActions>
            <ColorButton variant='contained' onClick={handleClick}>
              Save
            </ColorButton>
          </CardActions>
          <CardActions>
            <Link href={detail?.ticketURL} style={{ textDecoration: 'none' }}>
              <ColorButton variant='contained'>Purchase Tickets</ColorButton>
            </Link>
          </CardActions>
        </Stack>
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
    image?: string;
  } = {
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
