import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';
import moment from 'moment';

import { UserContext } from '../context/UserContext';
import { useTheme } from '@mui/material/styles';

import Comments from '../components/Comments';

import {Styled, MoreHorizIcon, Menu, MenuItem, Dialog, Button, MuiAlert, Card, Paper, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton, Snackbar, CssTextField} from '../styles/material';
import { AlertProps } from '@mui/material/Alert';



interface FeedPhotoProps {
  photo: {
    userId?: string;
    photoUrl: string;
    eventAPIid: string;
    id: number;
    created_at?: string;
    caption?: string;
    deleteToken?: string | null;
  },
  updateFeed: () => void,
  deleteSnack: () => void,
  socket: { on: (arg0: string, arg1: { (userId: any): void; (data: any): void; }) => void; id: any; to: (arg0: any) => { (): any; new(): any; emit: { (arg0: string, arg1: any): void; new(): any; }; }; }
}


const FeedPhoto: React.FC<FeedPhotoProps> = ({photo, updateFeed, deleteSnack, socket}) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [profilePic, setProfilePic] = useState<string>('');
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [captionText, setCaptionText] = useState<string>(`${photo.caption}`);
  const [editor, setEditor] = useState<boolean>(false);
  const [deleterOpen, setDeleterOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [owner, setOwner] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openCaptionSnack, setOpenCaptionSnack] = useState<boolean>(false);

  const [feedPhoto, setFeedPhoto] = useState<{userId?: string; photoUrl: string; eventAPIid: string; id: number; created_at: string; caption?: string; deleteToken?: string | null}>({
    userId: '',
    photoUrl: '',
    eventAPIid: '',
    id: 0,
    created_at: '',
    caption: '',
    deleteToken: null,
  });

  const getAvatar = (id: string): void => {
    axios.get('/api/eventFeed/avatar', {
      params: {
        userId: id,
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {

    updateFeed();
  }, [profilePic]);

  useEffect(() => {
    if (currentUserInfo?.id === feedPhoto.userId) {
      setOwner(true);
    } else {
      setOwner(false);
    }
    getAvatar(feedPhoto.userId);
  }, [feedPhoto]);


  useEffect(() => {
    setFeedPhoto(photo);
  }, [photo])

  useEffect(() => {
    updateFeed();
  }, [profilePic]);

  const ExpandMore = Styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = (): void => {
    setExpanded(!expanded);
  };



  const handleEdit = (e: {target: {value: string}}): void => {
    setCaptionText(e.target.value);
  };
  const handleSubmitEdit = (): void => {
    axios.put('/api/eventFeed', {
      photoUrl: photo.photoUrl,
      caption: captionText,
    })
      .then(() => {
        setEditor(false);
        updateFeed();
        setOpenCaptionSnack(true);
      })
      .catch((err) => console.error(err));
  };

  const openEditor = (): void => {
    setMenuOpen(false);
    setEditor(true);
  };

  const closeEditor = (): void => {
    setEditor(false);
    setCaptionText(`${photo.caption}`);
  };

  const openDeleter = (): void => {
    setDeleterOpen(true);
    setMenuOpen(false);
  };

  const openMenu = (event: {currentTarget: null}) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = (): void => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const deletePhoto = (): void => {
    axios.delete('/api/eventFeed', {
      data: {
        photoUrl: photo.photoUrl,
      }
    })
      .then((commentData) => {
        setDeleterOpen(false);
        updateFeed();
        deleteSnack();
        commentData.data.forEach((comment) => {
          axios.delete('/api/notifications', {
            data: {
              commentId: comment.id,
            }
          });
        });
      })
  };

  const closeDeleter = (): void => {
    setDeleterOpen(false);
  };

  const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref
  ) {
    return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />;
  });


  const handleSnackClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenCaptionSnack(false);

  };

  const inputstyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${inverseMode} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #a352ff inset",
      },
      '-webkit-text-fill-color': '#a352ff',
      maxLength: 30,
    }
  };


  return (
    <div>
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: '20px', backgroundImage: 'none',}}>
        <Dialog open={deleterOpen}>
          <Typography textAlign='left' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>are you sure you want to delete your photo?</Typography>
          <Button variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={deletePhoto}>DELETE</Button>
          <Button variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={closeDeleter}>cancel</Button>
        </Dialog>

        {owner && <Paper sx={{justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography textAlign='right'>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              sx={{margin: 'auto', alignItems: 'center'}}
              open={menuOpen}
              onClose={closeMenu}
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
              transformOrigin={{vertical: 'top', horizontal: 'center'}}
            >
              <MenuItem onClick={openEditor}>edit caption</MenuItem>
              <MenuItem onClick={openDeleter}>delete photo</MenuItem>
            </Menu>
            <IconButton onClick={openMenu}>
              <MoreHorizIcon sx={{color: iconColors}}/>
            </IconButton>
          </Typography>
        </Paper>
        }
        <CardHeader
          avatar={
            currentUserInfo?.id === photo.userId
              ? <Link to='/profile'>
                <Avatar src={profilePic} />
              </Link>
              : <Link to={`/user/?id=${photo.userId}`}>
                <Avatar src={profilePic} />
              </Link>
          }
          subheader={<Typography textAlign='right' sx={{ bgcolor: inverseMode }}>{moment(photo.created_at).calendar()}</Typography>}
          sx={{ bgcolor: inverseMode }}
        />
        <CardMedia
          component="img"
          height="194"
          image={photo.photoUrl}
          sx={{ bgcolor: inverseMode }}
        />
        <CardContent sx={{ bgcolor: inverseMode }}>
            <Typography variant='subtitle1' sx={{ bgcolor: inverseMode }}>

            <span>
              {!editor && photo.caption}
            </span>

            <div>
              {editor && <CssTextField inputProps={inputstyle} onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} value={captionText} sx={{bgcolor: inverseMode }} onChange={handleEdit}/>}
            </div>
            </Typography>

          <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
            {editor &&
            <Button sx={{ bgcolor: iconColors }} onClick={closeEditor}>
              <Typography variant='body2' sx={{ color: inverseMode }}>
                cancel
              </Typography>
            </Button>}

            {editor &&
            <Button sx={{ bgcolor: iconColors }} onClick={handleSubmitEdit}>
              <Typography variant='body2' sx={{ color: inverseMode }}>
                confirm
              </Typography>
            </Button>}

          </Typography>
        </CardContent>
        <CardActions
          sx={{ bgcolor: inverseMode }}
          disableSpacing>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <Button sx={{ color: iconColors }}>see all comments</Button>
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent sx={{ bgcolor: inverseMode }}>
            <Typography sx={{ bgcolor: inverseMode }}>
              <Comments socket={socket} photo={photo}/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>

      <Snackbar
        open={openCaptionSnack}
        autoHideDuration={3000}
        onClose={handleSnackClose}
      >
        <Alert
          severity='success'
          color='info'
          sx={{ width: '100%' }}
        >
          Caption Updated
        </Alert>
      </Snackbar>


    </div>
  );
};

export default FeedPhoto;
