import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import { InfoIcon, Grid, Styled, UseTheme, Typography, PushPinIcon, Card, CardHeader, CardMedia, CardContent, IconButton, Button } from '../styles/material';
import axios from 'axios';
import { IconButtonProps } from '@mui/material/IconButton';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = Styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));


const Img = Styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCardDetails = ({event}) => {
  const { currentUserInfo } = useContext(UserContext);
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    getPins();
  }, []);

  const getPins = () => {
    axios.get('/api/events/list/pins')
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
    axios.delete('/api/events/list/pins', { data: { eventAPIid: event.eventId } })
      .then(() => {
        getPins();
      })
      .catch(err => console.error('axios delete error', err));
  };

  const handleClick = () => {
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
  // let date = event.eventDate;
  // date = moment(date).add(1, 'day').format('MMMM Do YYYY');
  const image = event.artistInfo[0].artistImages[1].url;

  const getDetails = () => {
    navigate(`/details/?id=${event.eventId}`);
  };

  const fontColor = {
    style: { color:'#1A2027' }
  };

  return (
    <div>
      <Card sx={{ bgcolor: inverseMode, maxWidth: 'flex' }}>
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
              <Button variant="contained" onClick={handleClick} ><IconButton aria-label="add to favorites">
                <PushPinIcon
                  id={event.eventId}
                  htmlColor={pins.includes(event.eventId) ? '#1A76D2' : '#C1C1C1'}
                  />
              </IconButton> {pins.includes(event.eventId) ? 'saved' : 'save'}
              </Button>
            </Grid>
            <Grid xs={6} sm={6}>
              <Button variant="contained" onClick={getDetails}><IconButton aria-label="settings">
                <InfoIcon  />
              </IconButton>
                Info
              </Button>
            </Grid>
          </Grid>
        </CardContent>
    </Card><br />
  </div>
);
        };
export default EventCardDetails;