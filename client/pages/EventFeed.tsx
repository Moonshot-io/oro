import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import {OutlinedInput, Fab, Box, Button, Typography} from '../styles/material';

import { UserContext } from '../context/UserContext';
import { useSearchParams } from 'react-router-dom';
import FeedPhoto from '../components/FeedPhoto';
import Dialog from '@mui/material/Dialog';
import { useTheme } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';



const EventFeed: React.FC = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [eventName, setEventName] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [caption, setCaption] = useState('');

  const eventId = searchParams.get('id');
  const eventPhotos = [];

  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  }, [photo]);

  const updateFeed = async () => {
    await axios.get('/api/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        console.log(responseObj.data);
        setFeedPhotos(responseObj.data);
        setPhoto(null);
        setDialogOpen(false);
      })
      .catch((err) => console.error(err));
  };
  const getEvent = () => {
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

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
    setDialogOpen(true);
  };



  const handleFileUpload = async () => {
    if (photo) {
      const formData = new FormData();
      formData.append('myFile', photo, photo.name);

      await axios.post('/api/eventFeed', {
        imageData: previewSource,
        eventId,
        userId: currentUserInfo.id,
        caption,
      })
        .then((data) => {
          updateFeed();

        })
        .catch((err) => console.error(err));

    }
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setCaption('');
  };

  const handleCaption = (e) => {
    setCaption(e.target.value);
  };

  const uploadPhoto = async () => {
    await document.getElementById('fileUpload')?.click();
  };

  return (
    <div>

      <h1>
        {eventName}
      </h1>
      <Dialog open={dialogOpen}>
        <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
          <OutlinedInput placeholder='enter caption here' value={caption} onChange={handleCaption}/>
        </Typography>
        <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={handleFileUpload}>UPLOAD</Button>
        <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeDialog}>cancel</Button>
      </Dialog>


      {feedPhotos.map((photo, i) => {
        return (
          <div key={i} margin-top="30px">
            <FeedPhoto updateFeed={updateFeed} photo={photo}/>
          </div>
        );
      })}
      <Box sx={{position: 'sticky'}}>
        <OutlinedInput sx={{mt: '20px', display: 'none'}} accept="image/*" type='file' id='fileUpload' name='image' onChange={handleFileChange}/>
        <Fab
          size='small'
          onClick={uploadPhoto}
          sx={{
            ml: '20px',
            bgcolor: inverseMode,
            margin: 0,
            top: 'auto',
            right: 20,
            bottom: 20,
            left: 'auto',
            position: 'fixed'}}>
          <AddPhotoAlternateIcon/>
        </Fab>
      </Box>
    </div>
  );

  // } else {
  //   return (
  //     <div>
  //       Please Log in to use the app
  //     </div>
  //   )
  // }
};

export default EventFeed;



