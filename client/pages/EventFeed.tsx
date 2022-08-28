import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { UserContext } from '../context/UserContext';
import {useSearchParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';

import FeedPhoto from '../components/FeedPhoto';

import {OutlinedInput, Fab, Box, Button, Typography} from '../styles/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import Dialog from '@mui/material/Dialog';


const EventFeed: React.FC = () => {
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
  const [photo, setPhoto] = useState<File | null>(null);
  const [feedPhotos, setFeedPhotos] = useState<Array<{caption?: string; created_at: string; deleteToken: string | null; eventAPIid: string; id: number; photoUrl: string; userId: string;}>>([]);
  const [eventName, setEventName] = useState<string>('');
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [caption, setCaption] = useState<string>('');

  const [searchParams] = useSearchParams();
  const eventId: string | null = searchParams.get('id');
  
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  }, [photo]);

  const updateFeed = (): void => {
    axios.get('/api/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        setPhoto(null);
        setFeedPhotos([...responseObj.data]);
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
    if (photo) {
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
          setFeedPhotos(feedPhotos => [data.data, ...feedPhotos]);
        })
        .catch((err) => console.error(err));

    }
  };

  const closeDialog = (): void => {
    setDialogOpen(false);
    setCaption('');
  };

  const handleCaption = (e: {target: {value: string}}) => {
    setCaption(e.target.value);
  };

  const uploadPhoto = async (): Promise<void> => {
    await document.getElementById('fileUpload')?.click();
  };

  const renderFeed = () => {
    return (
      <div>
        {feedPhotos.map((photo, i) => {
          return (
            <div key={i} margin-top="30px">
              <FeedPhoto updateFeed={updateFeed} photo={photo}/>
            </div>
          );
        })}
      </div>
    );
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

      <div>
        {renderFeed()}
      </div>
      <Box sx={{position: 'sticky'}}>
        <OutlinedInput sx={{mt: '20px', display: 'none', accept: 'image/*'}} type='file' id='fileUpload' name='image' onChange={handleFileChange}/>
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



