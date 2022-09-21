import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import { InfoIcon, Grid, Styled, UseTheme, Typography, PushPinIcon, Card, CardHeader, CardMedia, CardContent, ColorButton } from '../styles/material';
import axios from 'axios';

const EventCardDetails = ({event}) => {
  const { currentUserInfo } = useContext(UserContext);
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;

  const [expanded, setExpanded] = React.useState(false);

  useEffect(() => {
    getPins();
  }, []);

  const getPins = () => {
    axios.get(`/api/events/list/pins/${currentUserInfo?.id}`)
      .then(responseObj => {
        setPins(responseObj.data.map((event, index) => event.eventAPIid));
      })
      .catch(err => console.error('GET PINS', err));
  };

  const [ pins, setPins ] = useState(['foo', 'bar']);

  const postEvent = () => {
    axios.post('/api/events/list/pins', {
      userId: currentUserInfo?.id,
      eventAPIid: event.eventId,
      name: event.eventName,
      date: event.eventDate,
      image: event.eventImg,
      venue: event.venueInfo[0].venueName,
      address: event.venueInfo[0].address.line1,
      city: event.venueInfo[0].city,
      state: event.venueInfo[0].state,
      postalCode: event.venueInfo[0].postalCode,
      startDate: event.startDate,
      endDate: event.endDate
    })
      .then(getPins)
      .catch(err => console.error('POST ERROR', err));
  };

  const deleteEvent = () => {
    axios.delete(`/api/events/list/pins/${currentUserInfo?.id}`, { data: { eventAPIid: event.eventId } })
      .then(() => {
        getPins();
      })
      .catch(err => console.error('axios delete error', err));
  };

  const handleClick = (eventId: string) => {
    if (pins.includes(event.eventId)) {
      return deleteEvent();
    } else if (pins == ['foo', 'bar']) {
      setPins(event.eventId);
      return postEvent();
    } else if (!pins.includes(event.eventId)) {
      return postEvent();
    }
  };

  const navigate = useNavigate();
  const image = event.artistInfo[0].artistImages[1].url;

  const getDetails = () => {
    navigate(`/details/?id=${event.eventId}`);
  };

  return (
    <div>
      <Card sx={{ bgcolor: inverseMode, maxWidth: 'flex', backgroundImage:'none' }}>
      <Typography variant="h6" pt="20px">{moment(event.eventDate).add(1, 'day').format('MMMM Do YYYY')}</Typography>
        <div><CardHeader style={{display: "block", overflow: "hidden", textOverflow: "ellipsis", width: '90%'}}
          title={<Typography variant="h3" noWrap>
            {event.eventName}
          </Typography>} /></div>
        <CardMedia
          component="img"
          height="flex"
          image={image} />
        <CardContent>
          <Grid container spacing={2} mt="10px">
            <Grid xs={6} sm={6}>
              <ColorButton sx={{backgroundColor: pins.includes(event.eventId) ? '#1A76D2' : '#a352ff' }} variant="contained" onClick={()=>{handleClick(event.eventId)}}>
                <PushPinIcon
                className="icon-buttons"
                  id={event.eventId}
                  />
              {pins.includes(event.eventId) ? 'saved' : 'save'}
              </ColorButton>
            </Grid>
            <Grid xs={6} sm={6}>
              <ColorButton variant="contained" onClick={getDetails}>
                <InfoIcon  className="icon-buttons" />
                Info
              </ColorButton>
            </Grid>
          </Grid>
        </CardContent>
    </Card><br />
  </div>
);
        };
export default EventCardDetails;