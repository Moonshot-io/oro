import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import {OutlinedInput, Fab, Box} from '../styles/material';
import { styled } from '@mui/material';
import { EventContext } from '../context/EventContext';
import { UserContext } from '../context/UserContext';
import { useSearchParams } from 'react-router-dom';
import FeedPhoto from '../components/FeedPhoto';
import { useTheme } from '@mui/material/styles';



const EventFeed: React.FC = ({socket, userId}) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const { getEventDetails, eventDetails } = useContext(EventContext);
  const [expanded, setExpanded] = React.useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const eventId = searchParams.get('id');


  useEffect(() => {
    if (photo) {
      const reader = new FileReader();
      reader.readAsDataURL(photo);

      reader.onloadend = () => {
        setPreviewSource(reader.result);
      };
    }
  }, [photo]);

  const updateFeed = () => {
    axios.get('/api/eventFeed', {
      params: {
        eventId,
      }
    })
      .then((responseObj) => {
        setFeedPhotos(responseObj.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    updateFeed();
  }, []);

  const handleFileChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (photo) {
      const formData = new FormData();
      formData.append('myFile', photo, photo.name);

      // console.log(photo, photo.name);
      // console.log('uploaded');
      axios.post('/api/eventFeed', {
        imageData: previewSource,
        eventId,
        userId: currentUserInfo.id
      })
        .then(() => updateFeed())
        .catch((err) => console.error(err));
      setPhoto(null);
    }
  };
  return (
    <div>
      <h1>EventFeed</h1>

      {feedPhotos.map((photo, i) => {
        return (
          <div key={i} margin-top="30px">
            <FeedPhoto photo={photo}/>
          </div>
        );
      })}
      <Box sx={{position: 'sticky'}}>
        <OutlinedInput sx={{mt: '20px'}} accept="image/*" type='file' name='image' onChange={handleFileChange}/>
        <Fab variant='extended' size='small' onClick={handleFileUpload} sx={{ml: '20px'}}>
                Upload
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
