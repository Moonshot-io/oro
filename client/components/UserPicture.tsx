import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Comments from './Comments';
import {
  Grid,
  Box,
  CloseRoundedIcon,
  Dialog,
  IconButton,
  Typography,
  Button,
  OutlinedInput,
  Snackbar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  MoreVertIcon,
} from '../styles/material';
import { useTheme } from '@mui/material/styles';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { UserContext } from '../context/UserContext';
import Popover from '@mui/material/Popover';

export interface SimpleDialogProps {
  open: boolean;
  onClose: (value: string) => void;
}

interface UserPictureProps {
  photo: {
    id: number;
    userId: string;
    photoUrl: string;
    eventAPIid: string;
    create_at: string;
    caption?: string;
    deleteToken?: string;
  },
  getUserPhotos: any
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
});

const UserPicture: React.FC<UserPictureProps> = ({ photo, getUserPhotos }) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const [photoEvent, setPhotoEvent] = useState([]);
  const [open, setOpen] = useState(false);
  const [captionText, setCaptionText] = useState('');
  const [editor, setEditor] = useState(false);
  const [deleterOpen, setDeleterOpen] = useState(false);
  const [openSnack, setOpenSnack] = useState(false);
  const { currentUserInfo } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handlePopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const closePopover = () => {
    setAnchorEl(null);
  };

  const openPopover = Boolean(anchorEl);
  const moreVert = open ? 'simple-popover' : undefined;

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = (e) => {
    setCaptionText(e.target.value);
  };

  const handleSubmitEdit = () => {
    axios.put('/api/eventFeed', {
      photoUrl: photo.photoUrl,
      caption: captionText,
    })
      .then(() => {
        setCaptionText('');
        setEditor(false);
        setOpen(false);
        getUserPhotos()
      })
      .then(() => setOpenSnack(true))
      .catch((err) => console.error(err));
  };

  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
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

  const deletePhoto = () => {
    axios.delete('/api/eventFeed', {
      data: {
        photoUrl: photo.photoUrl,
      }
    })
      .then((commentData) => {
        setDeleterOpen(false);
        setOpen(false);
        commentData.data.forEach((comment) => {
          axios.delete('/api/notifications', {
            data: {
              commentId: comment.id,
            }
          })
            .catch((err) => console.error(err));
        });
        getUserPhotos();
      })
      .catch((err) => console.error(err));
  };

  const closeDeleter = () => {
    setDeleterOpen(false);
  };

  const getPhotoEvent = () => {
    axios.get(`/api/profile/photo_event/${photo.eventAPIid}`)
      .then(({ data }) => {
        setPhotoEvent(data);
      })
      .catch((err) => console.error(err));
  }

  useEffect(() => {
    getPhotoEvent();
  }, []);

  return (
    <div>
      <img
        id='profile-photo'
        src={`${photo.photoUrl}?w=100&h=100&fit=crop&auto=format`}
        srcSet={`${photo.photoUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
        alt={photoEvent.name}
        onClick={handleOpen}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        id='photo-dialog'
      >
        <Card sx={{ maxWidth: 345, color: inverseMode, backgroundImage: 'none', }}>
          {
            currentUserInfo?.id === photo.userId
              ?
              <div id='dialog-header'>
                <div>
                  <IconButton aria-describedby={moreVert} onClick={handlePopover}>
                    <MoreVertIcon />
                  </IconButton>
                  <Popover
                    id={moreVert}
                    open={openPopover}
                    anchorEl={anchorEl}
                    onClose={closePopover}
                    anchorOrigin={{
                      vertical: 'bottom',
                      horizontal: 'right',
                    }}
                    transformOrigin={{
                      vertical: 'top',
                      horizontal: 'left',
                    }}
                  >
                    <div>
                      <IconButton aria-label='delete' onClick={openDeleter} sx={{ fontSize: '1rem' }}>
                        <DeleteOutlinedIcon sx={{ color: inverseMode }} />{' '}Delete Photo
                      </IconButton>
                      <br />
                      <IconButton aria-label='edit' onClick={openEditor} sx={{ fontSize: '1rem' }}>
                        <EditOutlinedIcon sx={{ color: inverseMode }} />{' '}Edit Caption
                      </IconButton>
                    </div>
                  </Popover>
                </div>
                <CardHeader
                  title={photoEvent.name}
                  subheader={photo.create_at}
                >
                </CardHeader>
                <div>
                  <IconButton onClick={handleClose}>
                    <CloseRoundedIcon />
                  </IconButton>
                </div>
              </div>
              :
              <>
                <CardHeader
                  title={photoEvent.name}
                  subheader={photo.create_at}
                  action={
                    <IconButton onClick={handleClose}>
                      <CloseRoundedIcon />
                    </IconButton>
                  }
                />
              </>
          }
          <CardMedia
            component='img'
            height='auto'
            width='100%'
            image={`${photo.photoUrl}?w=311&h=250&fit=crop&auto=format`}
            alt={photoEvent.name}
          />
          <CardContent sx={{ bgcolor: inverseMode, colors: inverseMode, padding: '0px' }}>
            <Box sx={{ margin: 'auto', bgcolor: inverseMode, width: 'auto', alignItems: 'center', justifyContent: 'center' }}>
              <Dialog open={deleterOpen} onClose={closeDeleter}>
                <Typography textAlign='center' sx={{ color: inverseMode, m: '7px' }}>Are you sure you want to delete your photo?</Typography>
                <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={deletePhoto}>DELETE</Button>
                <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeDeleter}>cancel</Button>
              </Dialog>
              <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
                <span>
                  {!editor && photo.caption}
                </span>

                {editor && <OutlinedInput onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} placeholder={photo.caption} value={captionText} onChange={handleEdit} />}

                {editor &&
                  <Button sx={{ bgcolor: iconColors }} onClick={handleSubmitEdit}>
                    <Typography variant='body2' sx={{ color: inverseMode }}>
                      confirm changes
                    </Typography>
                  </Button>}

                {editor &&
                  <Button sx={{ bgcolor: iconColors }} onClick={closeEditor}>
                    <Typography variant='body2' sx={{ color: inverseMode }}>
                      cancel
                    </Typography>
                  </Button>}
              </Typography>
              <Grid container>
                <Comments photo={photo} />
              </Grid>
            </Box>
          </CardContent>
        </Card>
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
          Caption Updated
        </Alert>
      </Snackbar>
    </div>
  )
};

export default UserPicture;
