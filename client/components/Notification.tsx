import React, { useState, useEffect, useContext} from 'react';
import axios from 'axios';
import {Paper, Modal, OutlinedInput, Box, Grid, Typography, Dialog, DialogContent, DialogTitle, AppBar, Toolbar, IconButton, Tooltip, CloseRoundedIcon, Button} from '../styles/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import { useTheme } from '@mui/material/styles';
import Comments from './Comments';
import FeedPhoto from './FeedPhoto';
import PhotoDialog from './PhotoDialog';
import {Avatar} from '../styles/material';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

interface NotificationProps {
  notif: {
    commentId: number;
    created_at: string;
    id: number;
    read: boolean;
    type: string;
    userId: string;
  },
  getNotifications: () => void;
}
const Notification: React.FC<NotificationProps> = ({notif, getNotifications}) => {
  const theme = useTheme();
  const highlight = theme.palette.primary.contrastText;
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const { currentUserInfo } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [person, setPerson] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [photoUrl, setPhotoUrl] = useState<string>('');
  const [modalStatus, setModalStatus] = useState<boolean>(false);
  const [photo, setPhoto] = useState<{userId?: string; photoUrl: string; eventAPIid: string; id: number; created_at: string; caption?: string; deleteToken?: string | null} | null>(null);
  const [userAvatar, setUserAvatar] = useState<string>('');
  const [read, setRead] = useState<boolean>(true);

  const [captionText, setCaptionText] = useState('');
  const [photoEvent, setPhotoEvent] = useState([]);
  const [editor, setEditor] = useState(false);
  const [deleterOpen, setDeleterOpen] = useState(false);

  const [notification, setNotification] = useState<{commentId: number; created_at: string; id: number; read: boolean; type: string; userId: string;} | null>(null)

  const getPhotoEvent = () => {
    if (photo) {
      axios.get(`/api/profile/photo_event/${photo.eventAPIid}`)
        .then(({ data }) => {
          setPhotoEvent(data);
        })
        .catch((err) => console.error(err));
    }
  }


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

  useEffect(() => {
    getPhotoEvent();
  }, [photo])

  useEffect(() => {
    if (notification?.read === false) {
      setRead(false);
    }
    getPerson();
    getType();
  }, [notification])

    useEffect(() => {
      setNotification(notif);
    }, []);

  const handleEdit = (e) => {
    setCaptionText(e.target.value);
  };


  const getPerson = (): void => {
    axios.get('/api/comments/comment', {
      params: {
        commentId: notification?.commentId,
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
    if (notification?.type === 'comment') {
      setText(' commented on your photo');
    }
  };


  const handleOpen = (): void => {
    setRead(true);
    setModalStatus(true);
  };

  const handleClose = (): void => {
    setModalStatus(false);
  };

  const openEditor = () => {
    setEditor(true);
  };

  const closeEditor = () => {
    setEditor(false);
    setCaptionText('');
  };

  const openDeleter = () => {
    setDeleterOpen(true);
  };

  const deletePhoto = async () => {
    await axios.delete('/api/eventFeed', {
      data: {
        photoUrl: photo.photoUrl,
      }
    })
      .then((commentData) => {
        setDeleterOpen(false);
        setModalStatus(false);
        commentData.data.forEach((comment) => {
          axios.delete('/api/notifications', {
            data: {
              commentId: comment.id,
            }
          })
          .then(() => {
            getNotifications();
          })
          .then(() => {
            navigate('/notifications');
          })
          .catch((err) => console.error(err));
        });
        // getUserPhotos();
      })
      .catch((err) => console.error(err));
  };

  const closeDeleter = () => {
    setDeleterOpen(false);
  };

  const handleSubmitEdit = () => {
    axios.put('/api/eventFeed', {
      photoUrl: photo.photoUrl,
      caption: captionText,
    })
      .then(() => {
        setCaptionText('');
        setEditor(false);
        setModalStatus(false);
        navigate('/notifications');
        // getUserPhotos()
      })
      //setOpenSnack(true)
      .catch((err) => console.error(err));
  };


  return (
    <div className='notificationBody'>
      {/* {
        photo &&
        <PhotoDialog key={location.key} open={modalStatus} photoObj={photo}/>

      } */}
      {
        photo && person && notification?.id &&
        
        <Box >
      <Dialog
        open={modalStatus}
        onClose={handleClose}
        id='photo-dialog'
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            {
              currentUserInfo?.id === photo.userId
                ? <>
                  <IconButton onClick={openDeleter}>
                    <Tooltip title="Delete Photo" placement="top-start">
                      <DeleteOutlinedIcon sx={{ color: inverseMode }} />
                    </Tooltip>
                  </IconButton>
                  <IconButton onClick={openEditor}>
                    <Tooltip title="Edit Caption" placement="top-start">
                      <EditOutlinedIcon sx={{ color: inverseMode }} />
                    </Tooltip>
                  </IconButton>
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                      position: 'absolute',
                      right: 12,
                      top: 8,
                      color: 'secondary',
                    }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                  <br />
                  <DialogTitle id='dialog-title' sx={{ color: inverseMode }}>
                    {photoEvent.name}
                  </DialogTitle>
                </>
                :
                <>
                  <DialogTitle id='dialog-title' sx={{ color: inverseMode }}>
                    {photoEvent.name}
                  </DialogTitle>
                  <IconButton
                    edge="end"
                    color="secondary"
                    onClick={handleClose}
                    aria-label="close"
                    sx={{
                      position: 'absolute',
                      right: 12,
                      top: 8,
                      color: 'secondary',
                    }}
                  >
                    <CloseRoundedIcon />
                  </IconButton>
                </>
            }
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ bgcolor: inverseMode, colors: inverseMode, padding: '0px' }}>
          <Box sx={{ margin: 'auto', bgcolor: inverseMode, width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
            <img width='370px' height='auto' src={photo.photoUrl} />
            <Dialog open={deleterOpen} onClose={closeDeleter}>
              <Typography textAlign='center' sx={{ color: inverseMode, m: '7px' }}>Are you sure you want to delete your photo?</Typography>
              <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={deletePhoto}>DELETE</Button>
              <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeDeleter}>cancel</Button>
            </Dialog>
            <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
              {/* {photo.caption} */}
              <span>
                {!editor && photo.caption}
              </span>

              {editor && <OutlinedInput onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} placeholder={photo.caption} value={captionText} onChange={handleEdit} />}
              <div>
                {editor &&
                  <Button sx={{ bgcolor: iconColors }} onClick={closeEditor}>
                    <Typography variant='body2' sx={{ color: inverseMode }}>
                      cancel
                    </Typography>
                  </Button>}

                {editor &&
                  <Button sx={{ bgcolor: iconColors }} onClick={handleSubmitEdit}>
                    <Typography variant='body2' sx={{ color: inverseMode }}>
                      confirm changes
                    </Typography>
                  </Button>}

   
              </div>
            </Typography>
            <Grid container>
              <Comments photo={photo} />
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>

      

          <Paper onClick={handleOpen} sx={{m: 'auto', marginTop: '5px', bgcolor: read ? inverseMode: highlight, color: iconColors}}>
            <Grid container sx={{m: 'auto', mr: '10px'}}>
              <Grid item xs={2} sx={{m: 'auto'}}>
                <Avatar sx={{m: 'auto'}} src={userAvatar}/>
              </Grid>

              <Grid item xs={8} sx={{m: 'auto'}}>
                <Typography textAlign='left' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>{!read && <b>*new*</b>} {person}{text} {moment(notification?.created_at).fromNow()}</Typography>
              </Grid>

              <Grid item xs={2} sx={{m: 'auto', p: 1}}>
                <img className='notificationIMG' src={photoUrl}/>
              </Grid>
            </Grid>
          </Paper>
          </Box>
          }
    </div>
  );
};


export default Notification;
