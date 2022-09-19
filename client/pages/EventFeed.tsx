import React, { useState, useEffect, useContext, useReducer } from 'react';
import axios from 'axios';

import { UserContext } from '../context/UserContext';
import {useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ThemeContext } from '../context/ThemeContext';

import FeedPhoto from '../components/FeedPhoto';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import {Dialog, TaskAltIcon, DoDisturbAltIcon, AddPhotoAlternateIcon, OutlinedInput, Fab, Box, Button, Typography, Grid, Snackbar} from '../styles/material';


const EventFeed: React.FC = ({socket}) => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [feedPhotos, setFeedPhotos] = useState<Array<{caption?: string; created_at: string; deleteToken: string | null; eventAPIid: string; id: number; photoUrl: string; userId: string;}>>([]);
  const [eventName, setEventName] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');
  const [openDeleteSnack, setOpenDeleteSnack] = useState(false);
  const [openUploadSnack, setOpenUploadSnack] = useState(false);

  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;

  const [searchParams] = useSearchParams();
  const eventId: string | null = searchParams.get('id');

  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const deleteSnack = () => {
    setOpenDeleteSnack(true);
  };
  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    } else {
      setPreviewSource('');
    }
  }, [photo]);


  const updateFeed = (): void => {
    axios.get('/api/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        setFeedPhotos([...responseObj.data]);
        setPhoto(null);
        setPreviewSource(null);
      })
      .catch((err) => console.error(err));
  };
  const getEvent = (): void => {
    axios.get('/api/eventDetails', {
      params: {
        id: eventId
      }
    })
      .then((eventData) => {
        setEventName(eventData.data.name);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getEvent();
    updateFeed();
  }, []);

  const handleFileChange = (e: {target: {files: FileList}}): void => {
    setPhoto(e.target.files[0]);
    setDialogOpen(true);
  };

  const handleFileUpload = (): void => {
    const formData = new FormData();
    formData.append('myFile', photo, photo.name);

    axios.post('/api/eventFeed', {
      imageData: previewSource,
      eventId,
      userId: currentUserInfo?.id,
      caption,
    })
      .then((data) => {
        setDialogOpen(false);
        setPhoto(null);
        setPreviewSource(null);
        setCaption('');
        updateFeed();
        setOpenUploadSnack(true);

      })
      .catch((err) => console.error(err));

  };


  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenDeleteSnack(false);
    setOpenUploadSnack(false);

  };

  const closeDialog = (): void => {
    setDialogOpen(false);
    setCaption('');
    setPhoto(null);
  };

  const handleCaption = (e: {target: {value: string}}) => {
    setCaption(e.target.value);
  };

  const uploadPhoto = async (): Promise<void> => {
    await document.getElementById('fileUpload')?.click();
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });


  if (!feedPhotos.length) {
    return (
      <div className="page-body">
        <br></br>
        <Typography variant='h4' sx={{ color: iconColors }}>
          {eventName} Event Feed
        </Typography>



      <br></br>
        <Typography variant='body1' sx={{ color: iconColors }}>
          Looks like there are no photos yet, start the party yourself by uploading one!
        </Typography>

        <Dialog open={dialogOpen}>
            <img width='220px' height='auto' src={`${previewSource}`}/>

            <Typography variant='body1' sx={{ bgcolor: inverseMode, color: iconColors }}>
              <OutlinedInput fullWidth={true} placeholder='enter caption' inputProps={{maxLength: 30}} onKeyPress={(e) => e.key === 'Enter' && handleFileUpload()} value={caption} onChange={handleCaption}/>
            </Typography>

            <Button fullWidth={true} variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={handleFileUpload}><TaskAltIcon sx={{color: 'green'}}/></Button>
            <Button fullWidth={true} variant='contained' size='small' sx={{ bgcolor: inverseMode}} onClick={closeDialog}><DoDisturbAltIcon sx={{color: 'red'}}/></Button>
          </Dialog>

        <Box sx={{position: 'sticky'}}>
        <OutlinedInput sx={{mt: '20px', display: 'none', accept: 'image/*'}} type='file' id='fileUpload' name='image' onClick={(event) => {event.target.value = null}} onChange={handleFileChange}/>
          <Fab
              className='uploadButton'
              size='large'
              onClick={uploadPhoto}
              sx={{
                ml: '20px',
                bgcolor: mode === 'dark' ? '#51AFF7' : '#533483',
                margin: 0,
                top: 'auto',
                right: 20,
                bottom: 20,
                left: 'auto',
                position: 'fixed'}}>
              <AddPhotoAlternateIcon sx={{color: 'white'}}/>
            </Fab>
        </Box>


        <Snackbar
            open={openDeleteSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity='success'
              color='info'
              sx={{ width: '100%' }}
            >
              Photo Deleted
            </Alert>
          </Snackbar>

          <Snackbar
            open={openUploadSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity='success'
              color='info'
              sx={{ width: '100%' }}
            >
              Photo Uploaded
            </Alert>
          </Snackbar>
      </div>
    )
  } else {
      return (
        <div className="page-body">
          <Typography variant='h4' sx={{ color: iconColors }}>
            {eventName} Event Feed
          </Typography>

          <Dialog open={dialogOpen}>
            <img width='220px' height='auto' src={`${previewSource}`}/>

            <Typography variant='body1' sx={{ bgcolor: inverseMode, color: iconColors }}>
              <OutlinedInput fullWidth={true} placeholder='enter caption' inputProps={{maxLength: 30}} onKeyPress={(e) => e.key === 'Enter' && handleFileUpload()} value={caption} onChange={handleCaption}/>
            </Typography>

            <Button fullWidth={true} variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={handleFileUpload}><TaskAltIcon sx={{color: 'green'}}/></Button>
            <Button fullWidth={true} variant='contained' size='small' sx={{ bgcolor: inverseMode}} onClick={closeDialog}><DoDisturbAltIcon sx={{color: 'red'}}/></Button>
          </Dialog>

          <div>
            {feedPhotos.map((photo, i) => {
            return (
              <div margin-top="30px" key={i}>
                <FeedPhoto socket={socket} deleteSnack={deleteSnack} updateFeed={updateFeed} photo={photo}/>
              </div>
            );
          })}
          </div>
          <Box sx={{position: 'sticky'}}>
            <OutlinedInput sx={{mt: '20px', display: 'none', accept: 'image/*'}} type='file' id='fileUpload' name='image' onClick={(event) => {event.target.value = null}} onChange={handleFileChange}/>
            <Fab
            className='uploadButton'
            size='large'
            onClick={uploadPhoto}
            sx={{
              ml: '20px',
              bgcolor: mode === 'dark' ? '#51AFF7' : '#533483',
              margin: 0,
              top: 'auto',
              right: 20,
              bottom: 20,
              left: 'auto',
              position: 'fixed'}}>
            <AddPhotoAlternateIcon sx={{color: 'white'}}/>
          </Fab>
          </Box>

          <Snackbar
            open={openDeleteSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity='success'
              color='info'
              sx={{ width: '100%' }}
            >
              Photo Deleted
            </Alert>
          </Snackbar>

          <Snackbar
            open={openUploadSnack}
            autoHideDuration={3000}
            onClose={handleSnackClose}
          >
            <Alert
              onClose={handleSnackClose}
              severity='success'
              color='info'
              sx={{ width: '100%' }}
            >
              Photo Uploaded
            </Alert>
          </Snackbar>
        </div>
      );

  }
};

export default EventFeed;



