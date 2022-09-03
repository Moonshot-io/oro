import React, { useState, useEffect} from 'react';
import axios from 'axios';
import {Paper, Modal, Box, Grid, Typography} from '../styles/material';
import { useTheme } from '@mui/material/styles';
import Comments from './Comments';
import {Avatar} from '../styles/material';
import moment from 'moment';

interface NotificationProps {
  notif: {
    commentId: number;
    created_at: string;
    id: number;
    read: boolean;
    type: string;
    userId: string;
  }
}
const Notification: React.FC<NotificationProps> = ({notif}) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const [person, setPerson] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [photo, setPhoto] = useState<{userId?: string; photoUrl: string; eventAPIid: string; id: number; created_at: string; caption?: string; deleteToken?: string | null} | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [read, setRead] = useState<boolean>(true);

  const getPhoto = (): void => {
    axios.get('/api/eventFeed/photo', {
      params: {
        photoUrl,
      }
    })
      .then((photoObj) => {
        setPhoto(photoObj.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    getPhoto();
  }, [photoUrl]);


  const getPerson = (): void => {
    axios.get('/api/comments/comment', {
      params: {
        commentId: notif.commentId,
      }
    })
      .then((commentData) => {
        axios.get(`/api/profile/${commentData.data.userId}`)
          .then((commenterData) => {
            setPerson(commenterData.data.fullName);
            setUserAvatar(commenterData.data.profileURL);
            setPhotoUrl(commentData.data.photoUrl);
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => console.error(err));
  };

  const getType = (): void => {
    if (notif.type === 'comment') {
      setText(' commented on your photo');
    }
  };

  useEffect(() => {
    if (notif.read === false) {
      setRead(false);
    }
    getPerson();
    getType();
  }, []);

  const handleOpen = (): void => {
    setRead(true);
    setModalStatus(true);
  };

  const handleClose = (): void => {
    setModalStatus(false);
  };


  return (
    <div>
      {
        photo && <Box sx={{m: 'auto'}}>
          <Modal
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'}}
            sx={{overflow: 'scroll', marginTop: '40px', paddingTop: '10px'}}
            open={modalStatus}
            onClose={handleClose}>
            <Box sx={{margin: 'auto', bgcolor: inverseMode, width: 350, alignItems: 'center', justifyContent: 'center', pt: '20px', outline: 'none'}}>

              <img width='300px' height='auto' src={photoUrl}/>
              <Grid container sx={{mt: '20px', width: '20'}}>
                {photo && <Comments photo={photo}/>}
              </Grid>
            </Box>
          </Modal>

          <Paper onClick={handleOpen} sx={{m: 'auto', marginTop: '5px', bgcolor: inverseMode, color: iconColors}}>
            <Grid container sx={{margin: 'auto'}}>
              <Grid item xs={2} sx={{margin: 'auto'}}>
                <Avatar src={userAvatar}/>
              </Grid>

              <Grid item xs={8} sx={{margin: 'auto'}}>
                <Typography textAlign='left' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>{!read && <b>*new*</b>} {person}{text} {moment(notif.created_at).fromNow()}</Typography>
              </Grid>

              <Grid item xs={2} sx={{margin: 'auto'}}>
                <img height='30px' width='auto' src={photoUrl}/>
              </Grid>
            </Grid>
          </Paper>

        </Box>
      }
    </div>
  );
};


export default Notification;
