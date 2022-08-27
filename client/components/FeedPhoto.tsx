import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Comments from '../components/Comments';
import {Button, Fab, OutlinedInput, Card, Paper, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { styled } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import Dialog from '@mui/material/Dialog';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { UserContext } from '../context/UserContext';

const FeedPhoto: React.FC = (props) => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const {photo, updateFeed} = props;
  const [profilePic, setProfilePic] = useState('');
  const [expanded, setExpanded] = React.useState(false);
  const [captionText, setCaptionText] = useState('');
  const [editor, setEditor] = useState(false);
  const [deleterOpen, setDeleterOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [owner, setOwner] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  useEffect(() => {
    if (currentUserInfo.id === photo.userId) {
      setOwner(true);
    }
    getAvatar();
  }, []);

  const ExpandMore = styled((props) => {
    const { ...other } = props;
    return <IconButton {...other} />;
  })(({ theme }) => ({
    margin: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const getAvatar = async () => {
    await axios.get('/api/eventFeed/avatar', {
      params: {
        userId: photo.userId
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
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
        updateFeed();
      })
      .catch((err) => console.error(err));
  };

  const openEditor = () => {
    setMenuOpen(false);
    setEditor(true);
  };

  const closeEditor = () => {
    setEditor(false);
    setCaptionText('');
  };

  const openDeleter = () => {
    setDeleterOpen(true);
    setMenuOpen(false);
  };

  const openMenu = (event) => {
    setMenuOpen(true);
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    setAnchorEl(null);
  };

  const deletePhoto = () => {
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
          })
            .then(() => console.info(`${comment.id} DELETED`))
            .catch((err) => console.error(err));
        });
      })
      .catch((err) => console.error(err));
  };

  const closeDeleter = () => {
    setDeleterOpen(false);
  };

  // const getMenuOption = () => {
  //   if (owner) {
  //     return (

  //     );
  //   }
  // };


  return (
    <div>
      {/* <Modal style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}} sx={{overflow: 'scroll'}} open={modalStatus} onClose={handleClose}>
        <Box sx={{margin: 'auto', bgcolor: inverseMode, width: 400, alignItems: 'left', justifyContent: 'left', pt: '20px', outline: 'none'}}>

          <img width='350px' height='auto' src={photo.photoUrl}/>
          <Grid container sx={{mt: '20px'}}>
            <Comments photo={photo}/>
          </Grid>
        </Box>
      </Modal> */}
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
            currentUserInfo.id === photo.userId
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

            {editor && <OutlinedInput onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} sx={{ bgcolor: inverseMode }} placeholder={photo.caption} value={captionText} onChange={handleEdit}/>}

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
