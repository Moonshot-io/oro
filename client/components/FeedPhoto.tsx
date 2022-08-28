import React, { useState, useEffect, useContext} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';
import {Button, OutlinedInput, Card, Paper, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';

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
  updateFeed: () => void;
}


const FeedPhoto: React.FC<FeedPhotoProps> = ({photo, updateFeed}) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [profilePic, setProfilePic] = useState<string>('');
  const [expanded, setExpanded] = React.useState<boolean>(false);
  const [captionText, setCaptionText] = useState<string>('');
  const [editor, setEditor] = useState<boolean>(false);
  const [deleterOpen, setDeleterOpen] = useState<boolean>(false);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [owner, setOwner] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const [feedPhoto, setFeedPhoto] = useState({});
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
    }
    getAvatar(feedPhoto.userId);
  }, [feedPhoto]);

  useEffect(() => {
    setFeedPhoto(photo);
  }, []);

  useEffect(() => {
    updateFeed();
  }, [profilePic]);

  const ExpandMore = styled((props) => {
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
        setCaptionText('');
        setEditor(false);
        updateFeed();
      })
      .catch((err) => console.error(err));
  };

  const openEditor = (): void => {
    setMenuOpen(false);
    setEditor(true);
  };

  const closeEditor = (): void => {
    setEditor(false);
    setCaptionText('');
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
        commentData.data.forEach((comment) => {
          axios.delete('/api/notifications', {
            data: {
              commentId: comment.id,
            }
          });
        });
      });
  };

  const closeDeleter = (): void => {
    setDeleterOpen(false);
  };


  return (
    <div>
      <Card sx={{ maxWidth: 400, margin: 'auto', mt: '20px'}}>
        <Dialog open={deleterOpen}>
          <Typography textAlign='left' sx={{ color: inverseMode, mb: '20px', ml: '5px'}}>are you sure you want to delete your photo?</Typography>
          <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={deletePhoto}>DELETE</Button>
          <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeDeleter}>cancel</Button>
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
              <MoreHorizIcon sx={{color: inverseMode}}/>
            </IconButton>
          </Typography>
        </Paper>
        }
        {/* {getMenuOption()} */}
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
          <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
            {/* {photo.caption} */}
            <span>
              {!editor && photo.caption}
            </span>

            <div>
              {editor && <OutlinedInput onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} sx={{ bgcolor: inverseMode }} placeholder={photo.caption} value={captionText} onChange={handleEdit}/>}
            </div>

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
            {/* <span onClick={openEditor}>
              <Typography textAlign='right' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>edit</Typography>
            </span> */}
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
              <Comments photo={photo}/>
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};

export default FeedPhoto;
