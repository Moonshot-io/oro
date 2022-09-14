import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import UserPhotos from '../components/UserPhotos';
import { UserContext } from '../context/UserContext';
import { styled } from '@mui/material/styles';
import {
  ArrowForwardIosSharpIcon,
  MuiAccordion,
  MuiAccordionSummary,
  MuiAccordionDetails,
  Typography,
  List,
  ListItem,
  Button,
  Avatar,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FacebookIcon,
  InstagramIcon,
  TwitterIcon,
  Grid,
  IconButton,
  Box,
  Link,
  Snackbar,
  CardMedia,
  Divider
} from '../styles/material';
import { useTheme } from '@mui/material/styles';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';

interface eventType {
  name: string;
  id: string;
  eventAPIid: string;
  date: string;
  image: string;
  venue: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  startDate: string;
  endDate: string;
}

const Accordion = styled((props) => (
  <MuiAccordion children={''} disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const Profile = () => {
  const { currentUserInfo, getCurrentUser } = useContext(UserContext);
  const [userEvents, setUserEvents] = useState([]);
  const [userPhotos, setUserPhotos] = useState([]);
  const [facebookLink, setFacebookLink] = useState('');
  const [instagramLink, setInstagramLink] = useState('');
  const [twitterLink, setTwitterLink] = useState('');
  const [expanded, setExpanded] = useState<string | false>(false);
  const [open, setOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const navigate = useNavigate();
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const firstName = currentUserInfo?.fullName.split(' ')[0];

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });

  const redirectToGoogle = () => {
    window.open('/auth/google', '_self');
  };

  const getUserEvents = () => {
    axios
      .get(`/api/profile/events/${currentUserInfo?.id}`)
      .then(({ data }) => {
        setUserEvents(data);
      })
      .catch((err) => console.error(err));
  };

  const getUserPhotos = () => {
    axios
      .get(`/api/profile/event_photos/${currentUserInfo?.id}`)
      .then(({ data }) => {
        setUserPhotos(data);
      })
      .catch((err) => console.error(err));
  };

  const handleChange = (panel: string | boolean | ((prevState: string | false) => string | false)) => (_event: any, newExpanded: any) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSnackClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const handleUpdate = async () => {
    axios
      .put(`/api/profile/${currentUserInfo?.id}`, {
        socialMedia: {
          facebook: `${facebookLink}` || null,
          instagram: `${instagramLink}` || null,
          twitter: `${twitterLink}` || null,
        },
      })
      .then(() => setOpenSnack(true))
      .then(() => handleClose())
      .then(() => getCurrentUser())
      .catch((err) => console.error(err));
  };

  const handleFacebookChange = (e) => {
    setFacebookLink(e.target.value);
  };

  const handleInstagramChange = (e) => {
    setInstagramLink(e.target.value);
  };

  const handleTwitterChange = (e) => {
    setTwitterLink(e.target.value);
  };

  useEffect(() => {
    getUserPhotos();
    getUserEvents();
  }, []);

  if (currentUserInfo?.id) {
    return (
      <div className="page-body">
        <Avatar
          alt={currentUserInfo.fullName}
          src={currentUserInfo.profileURL}
          sx={{ width: 150, height: 150, mt: '30px', ml: 'auto', mr: 'auto' }}
        />
        <h1>Hello {firstName}</h1>
        <div>
          <Button
            sx={{ bgcolor: inverseMode, colors: inverseMode, mb: '30px' }}
            variant='outlined'
            onClick={handleClickOpen}
          >
            Update Profile
          </Button>
          <Dialog
            open={open}
            onClose={handleClose}
          >
            <DialogTitle sx={{ bgcolor: inverseMode, colors: inverseMode }}>
              Update Profile
            </DialogTitle>
            <DialogContent>
              <DialogContentText>
                Add your social media accounts to stay connected with other
                concert and festival goers.
              </DialogContentText>
              <div>
                <TextField
                  autoFocus
                  margin='dense'
                  id='name'
                  label={<FacebookIcon />}
                  type='email'
                  fullWidth
                  variant='standard'
                  placeholder='Facebook Link'
                  onChange={handleFacebookChange}
                />
              </div>
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label={<InstagramIcon />}
                type='email'
                fullWidth
                variant='standard'
                placeholder='Instagram Link'
                onChange={handleInstagramChange}
              />
              <TextField
                autoFocus
                margin='dense'
                id='name'
                label={<TwitterIcon />}
                type='email'
                fullWidth
                variant='standard'
                placeholder='Twitter Link'
                onChange={handleTwitterChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
          <Snackbar
            open={openSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleClose}
              severity='success'
              sx={{ width: '100%' }}
            >
              Profile Updated
            </Alert>
          </Snackbar>
        </div>
        <div>
          <Box>
            <Grid container spacing={2} className='social-media'>
              {
                currentUserInfo.fbId
                  ?
                  <Grid item className='social-buttons'>
                    <Link href={currentUserInfo.fbId}>
                      <IconButton>
                        <FacebookIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                  : null
              }
              {
                currentUserInfo.instaId
                  ?
                  <Grid item className='social-buttons'>
                    <Link href={currentUserInfo.instaId}>
                      <IconButton>
                        <InstagramIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                  : null
              }
              {
                currentUserInfo.twitterId
                  ?
                  <Grid item className='social-buttons'>
                    <Link href={currentUserInfo.twitterId}>
                      <IconButton>
                        <TwitterIcon />
                      </IconButton>
                    </Link>
                  </Grid>
                  : null
              }
            </Grid>
          </Box>
        </div>
        <>
          {userEvents.map((event: eventType, index: number) => {
            return (
              <div key={index}>
                <Accordion
                  sx={{ bgcolor: inverseMode }}
                  expanded={expanded === `panel${index + 1}`}
                  onChange={handleChange(`panel${index + 1}`)}
                >
                  <AccordionSummary
                    sx={{ bgcolor: inverseMode }}
                    aria-controls='panel1d-content'
                    id='panel1d-header'
                  >
                    <Typography sx={{ textAlign: 'initial' }}>
                      {event.name}
                    </Typography>
                    <Typography>
                      {moment(event.date).format('ll')}
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails sx={{ bgcolor: inverseMode }}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={event.image}
                      alt={event.name}
                    />
                    <List>
                      <ListItem>
                        <strong>Venue: </strong>
                        &nbsp;
                      </ListItem>
                      <ListItem>
                        {event.venue}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <strong>Location: </strong>
                        &nbsp;
                      </ListItem>
                      {
                        event.state
                          ?
                          <ListItem>
                            {event.address},{' '}
                            {event.city},{' '}
                            {event.state},{' '}
                            {event.postalCode}
                          </ListItem>
                          :
                          <ListItem>
                            {event.address},{' '}
                            {event.city},{' '}
                            {event.postalCode}
                          </ListItem>
                      }
                      <Divider />
                      <ListItem>
                        <strong>Ticket sale starts: </strong>
                        &nbsp;
                      </ListItem>
                      <ListItem>
                        {moment(event.startDate).format('llll')}
                      </ListItem>
                      <Divider />
                      <ListItem>
                        <strong>Ticket sale ends: </strong>
                        &nbsp;
                      </ListItem>
                      <ListItem>
                        {moment(event.endDate).format('llll')}
                      </ListItem>
                      <Button
                        sx={{ bgcolor: iconColors, color: inverseMode }}
                        onClick={() => navigate(`/details/?id=${event.eventAPIid}`)}
                      >
                        More Details
                      </Button>
                    </List>
                  </AccordionDetails>
                </Accordion>
              </div>
            );
          })}
        </>
        <UserPhotos photos={userPhotos} getUserPhotos={getUserPhotos} />
      </div>
    );
  } else if (!currentUserInfo?.id) {
    return (
      <div>
        <h1>Please Sign In To View Profile</h1>
        <form action="/auth/google" id='google-button'>
          <GoogleButton onClick={redirectToGoogle} />
        </form>
      </div>
    );
  }
};

export default Profile;
