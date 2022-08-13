import React, { useNavigate, useState } from 'react';
import { styled } from '@mui/material/styles';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,	Grid,	Card,	CardHeader,	CardMedia,	CardContent,	CardActions,	Collapse,	Typography,	FavoriteIcon,	ExpandMoreIcon,	YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon, Item
} from '../styles/material';
import EventCards from './EventCards';
import axios from 'axios';
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

const ArtistInfoCard = ({artistProps}) => {
  // console.log(artistProps);
  const [expanded, setExpanded] = React.useState(false);
  const [events, setEvents] = useState(
    [{
      name: 'No events found',
      image: '/images/patrick-perkins-pay-artists.jpg',
      description: 'There are currently no events found for this artist.',
      id: 1001,
    }]
  );
  const {
    artistName,
    bio,
    facebook,
    homepage,
    image,
    instagram,
    itunes,
    twitter,
    wiki,
    youtube,
  } = artistProps;

  const socials = {
    youtube: [youtube, <YouTubeIcon key={youtube}/>],
    twitter: [twitter, <TwitterIcon key={twitter}/>],
    facebook: [facebook, <FacebookIcon key={facebook}/>],
    instagram: [instagram, <InstagramIcon key={instagram}/>],
    homepage: [homepage, <LanguageIcon key={homepage}/>],
    itunes: [itunes, <MusicNoteIcon key={itunes}/>],
    wiki: [wiki, <QuizIcon key={wiki}/>],
  };
  // console.log(artist);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getArtistEvents = (artist) => {
    const noSpecialChars: string = artist
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    axios.get('/favArtists/events', { params: { keyword: noSpecialChars } })
      .then((responseObj) => {
        console.log(responseObj.data.events);
        setEvents(responseObj.data.events);
      })
      .then(() => {
        console.log(events);
      })
      .catch(err => console.error(err));

    console.log(events);
  };

  return (
    <Card>
      <CardHeader
        title={artistName}
      />
      <CardMedia
        component="img"
        height="194"
        image={image}
        alt={artistName}
      />
      <CardContent>
        <Typography noWrap variant="body2" color="text.secondary">
          {bio}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={()=>{
            handleExpandClick();
            getArtistEvents(artistName);
          }}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent id={artistName}>
          <Typography paragraph>Bio:</Typography>
          <Typography paragraph>
            {bio}
          </Typography>
          <Typography paragraph>Socials:</Typography>
          <Typography paragraph>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {Object.keys(socials).map((social) => {
                  return (
                    <Grid item key={social}>
                      <Item>
                        <a href={socials[social][0]}>{socials[social][1]}</a>
                      </Item>
                    </Grid>
                  );
                })}
              </Grid>
            </Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
              {
                events.length > 1
                  ? <Grid item id={artistName}>
                    <Typography paragraph>Events:</Typography>
                    { events.map((eventObj) => {
                      return <EventCards events={eventObj} key={eventObj.id}/>;
                    })}
                  </Grid>
                  : <Typography paragraph>No Upcoming Events</Typography>
              }
            </Grid>
          </Box>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ArtistInfoCard;
