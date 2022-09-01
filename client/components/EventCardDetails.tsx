import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import moment from 'moment';
import { Box } from '@mui/material';
import { InfoIcon, Grid, Styled, UseTheme, Typography, ButtonBase, PushPinIcon } from '../styles/material';
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
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
      eventAPIid: event.eventId
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
  let date = event.eventDate;
  date = moment(date).add(1, 'day').format('MMMM Do YYYY');
  const image = event.artistInfo[0].artistImages[1].url;

  const getDetails = () => {
    navigate(`/details/?id=${event.eventId}`);
  };

  const fontColor = {
    style: { color:'#1A2027' }
  };

  return (
    <div>
    <Card variant='outlined' sx={{ bgcolor: inverseMode, maxWidth: 'flex' }}>
    <CardHeader
      action={
        <IconButton aria-label="settings">
          <InfoIcon onClick={getDetails} color='primary'/>
        </IconButton>
      }
      title={<Typography>
      <h1>{event.eventName}</h1>
      </Typography>
      }
      subheader={<Typography><h3>{date}</h3></Typography>}
    />
    <CardMedia
      component="img"
      height="flex"
      image={image}
    />
    <CardContent>
      <Typography variant="body2">
      {event.venueInfo.map((venue, index: number) => (
              <span key={`venue${index}`}>
                {venue.venueName}
                <br/>
                {Object.values(venue.address)}
                <br/>
                {venue.city}, {venue.state} {venue.postalCode}
              </span>
            ))
            }
      </Typography>
    </CardContent>
    <CardActions disableSpacing>
      <IconButton aria-label="add to favorites">
      <PushPinIcon
            id={event.eventId}
            htmlColor={pins.includes(event.eventId) ? '#1A76D2' : '#C1C1C1'}
            onClick={ handleClick }
            sx={{ mr: '20px' }}
          />
      </IconButton>
      <ExpandMore
        expand={expanded}
        onClick={handleExpandClick}
        aria-expanded={expanded}
        aria-label="show more"
      >
        <ExpandMoreIcon color='primary' />
      </ExpandMore>
    </CardActions>
    <Collapse in={expanded} timeout="auto" unmountOnExit>
      <CardContent>
        <Typography paragraph>Artists:</Typography>
        <Typography paragraph>
        {event.artistInfo[1] ? event.artistInfo.map((artist, index: number) => (
                <span key={`artistName${index}`}>
                  {index === event.artistInfo.length - 1 ? artist.artistName : artist.artistName+', '}
                </span>
              )) : event.artistInfo[0].artistName}
        </Typography>
      </CardContent>
    </Collapse>
  </Card>
  <br/>
};

export default EventCardDetails;
