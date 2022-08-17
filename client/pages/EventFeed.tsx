import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Comments from '../components/Comments';
import { Grid, ImageList, ImageListItem, OutlinedInput, Fab} from '@mui/material';

const EventFeed = () => {

  const [previewSource, setPreviewSource] = useState();
  const [photo, setPhoto] = useState(null);
  const [feedPhotos, setFeedPhotos] = useState([]);
  
  
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
    axios.get('/eventFeed')
      .then((responseObj) => {
        console.log(responseObj);
        setFeedPhotos(responseObj.data);
      })
      .catch((err) => console.error(err));
  };
    
  useEffect(() => {
    updateFeed();
  }, []);

  const handleFileChange = (e) => {
    // console.log("photo changed");
    setPhoto(e.target.files[0]);
  };

  const handleFileUpload = () => {
    if (photo) {
      const formData = new FormData();
      formData.append("myFile", photo, photo.name);

      console.log(photo, photo.name);
      console.log('uploaded');
      axios.post('/eventFeed', {
        data: previewSource
      })
        .then(() => updateFeed())
        .catch((err) => console.error(err));
      setPhoto(null);
    }
  };





  return (
    <div>
      <div>Hello EventFeed</div>
      <div>
        {feedPhotos.length && feedPhotos.map((photo, i) => {
          return (
            <div key={i}>
              <div style={{textAlign: 'left'}}>
                {photo.userId}
              </div>
              <img width='200px' height='auto' src={photo.photoUrl}/>
              <div>
                <Comments eventId={photo.eventAPIid} />
              </div>
            </div>
          );
        })}

      </div>

      <OutlinedInput accept="image/*" type='file' name='image' onChange={handleFileChange}/>
      <Fab variant='extended' size='small' onClick={handleFileUpload}>
              Upload
      </Fab>
    </div>
  );
};

export default EventFeed;
