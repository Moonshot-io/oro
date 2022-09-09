import React, { useState, useEffect } from 'react';
import { IconButtonProps } from '@mui/material/IconButton';
import {
  Box,	Grid, Typography,	YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon, IconButton, UseTheme, Styled, Button, ArrowBackIosNewIcon, Fab, purple,
} from '../styles/material';
import EventCards from './ArtistEventCards';
import ArtistBanner from './ArtistBanner';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Dropdown from '../components/Dropdown';
interface ExpandMoreProps extends IconButtonProps {
    expand: boolean;
}

const fontColor = {
  style: { color: '#9B27B0' }
};

const ColorButton = Styled(Button)(({ theme }) => ({
  color: theme.palette.getContrastText(purple[500]),
  backgroundColor: purple[500],
  '&:hover': {
    backgroundColor: purple[700],
  },
}));
const ExpandMore = Styled((props: ExpandMoreProps) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface artistPropsType {
  artistProps: {
  id: number,
  artistName: string,
  bio: string,
  ticketId: string,
  youtube: string,
  twitter: string,
  facebook: string,
  instagram: string,
  itunes: string,
  wiki: string,
  homepage: string,
  image: string,
  },
  resetSingle: ()=>void;
}

const ArtistInfoCard = ({artistProps, resetSingle}: artistPropsType) => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const navigate = useNavigate();
  const [expanded, setExpanded] = React.useState(false);
  const [ keyword, setKeyword ] = useState('');
  const [allEvents, setAllEvents] = useState([]);
  const [city, setCity] = useState('any');
  const [eventsExist, setEventsExist] = useState(true);
  const [events, setEvents] = useState(
    [{
      name: 'No events found',
      image: '/images/patrick-perkins-pay-artists.jpg',
      description: 'There are currently no events found for this artist.',
      id: 1001,
      city: 'New Orleans'
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

  const removeHref = ()=>{
    const bioArr = bio.split(' ');
    let newBio = '';
    let i = 0;
    while(bioArr[i][0] !== '<'){
      newBio += bioArr[i] + ' ';
      i++;
    }
    newBio = newBio.slice(0, newBio.length - 1);
    console.log(newBio[newBio.length - 1]);
    if(newBio[newBio.length - 1] !== '.'){
      newBio += '.';
    }
    return newBio;
  }


  const socials = {
    youtube: [youtube, <YouTubeIcon key={'youtube'} sx={{ color: inverseMode }} />],
    twitter: [twitter, <TwitterIcon key={'twitter'} sx={{ color: inverseMode }}/>],
    facebook: [facebook, <FacebookIcon key={'fb'} sx={{ color: inverseMode }}/>],
    instagram: [instagram, <InstagramIcon key={'insta'} sx={{ color: inverseMode }}/>],
    homepage: [homepage, <LanguageIcon key={'homepage'} sx={{ color: inverseMode }}/>],
    itunes: [itunes, <MusicNoteIcon key={'music'} sx={{ color: inverseMode }}/>],
    wiki: [wiki, <QuizIcon key={'wiki'} sx={{ color: inverseMode }}/>],
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getArtistEvents = (artist: string) => {
    const noSpecialChars: string = artist
      .normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    axios.get('/api/favArtists/events', { params: { keyword: noSpecialChars } })
      .then((responseObj) => {
        setEvents(responseObj.data.events);
      })
      .catch(err => console.error(err));
  };

  const goBack = () => {
    resetSingle();
    navigate('/artists');
  };

  useEffect(()=>{
    getArtistEvents(artistName);
  },[])

  const updateEvents = (city) => {
    setCity(city);
    if(city === 'all'){
      setEvents(allEvents);
    } else {
    const filteredEvents = allEvents.filter((event) => {
      return event.venueInfo[0].city === city;
    })
    if(!filteredEvents.length){
      setEvents([...allEvents]);
    } else {
      setEvents([...filteredEvents]);
    }
  }
  }
  // useEffect(() => {
  //   updateEvents(city);
  // }, [city]);

  return (
      <Box>
        <Grid container>
          <Box sx={{ position: 'sticky', zIndex: 'tooltip' }}>
            <Fab
              size='small'
              onClick={() => goBack()}
              sx={{
                marginLeft: '25px',
                top: 100,
                right: 'auto',
                bottom: 'auto',
                left: 'inherit',
                position: 'fixed'
              }}>
              <ArrowBackIosNewIcon onClick={() => goBack()} />
            </Fab>
          </Box>

          <Box>
            <Grid container>
              <Grid xs={12} sm={8}>
                <Typography variant="body1" align="left">
                  {removeHref()}
                </Typography>
              </Grid>
              <Grid xs={12} sm={4}>
                <Typography>
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      {Object.keys(socials).map((social: string, index) => {
                        return (
                          <Grid item key={`social${index}`}>
                            <IconButton>
                              <a href={socials[social][0]}>{socials[social][1]}</a>
                            </IconButton>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </Box>
                </Typography>
              </Grid>
            </Grid>
            <Box>
              <Grid container style={{ gap: 15, maxHeight: '50vh' }} alignItems="left"
              >
                <Grid xs={8} sm={8} md={4}><Dropdown updateEvents={updateEvents} eventList={[...events]} /></Grid>
              </Grid></Box><br />
            <Grid>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container>
                  {events.length > 1
                    ? <><Typography paragraph sx={{ color: inverseMode }}>Events:</Typography><Grid container id={artistName}>
                      {events.map((eventObj, index) => {

                        return (
                          <Grid item xs={12} md={6}>
                            <EventCards events={eventObj} key={`event${index}`} />
                          </Grid>);
                      })}
                    </Grid></>
                    : <Typography paragraph sx={{ color: inverseMode }}>No Upcoming Events</Typography>}
                </Grid>
              </Box>
            </Grid>
          </Box>
        </Grid>
      </Box>

  );
};
export default ArtistInfoCard;
