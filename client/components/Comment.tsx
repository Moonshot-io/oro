import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Paper, Grid, OutlinedInput, Fab, Button, Card, CardHeader, CardMedia, CardContent, CardActions, Collapse, Avatar, Typography, IconButton } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import Dialog from '@mui/material/Dialog';
const Comment: React.FC = (props) => {

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const [commentText, setCommentText] = useState('');
  const [editor, setEditor] = useState('');
  const { comment, getComments } = props;
  const [deleterOpen, setDeleterOpen] = useState(false);

  const [profilePic, setProfilePic] = useState('');

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async () => {
    await axios.get('/api/eventFeed/avatar', {
      params: {
        userId: comment.userId
      }
    })
      .then((userProfile) => {
        setProfilePic(userProfile.data);
      })
      .catch((err) => console.error(err));
  };

  const deleteComment = () => {
    axios.delete('/api/comments', {
      data: {
        id: comment.id,
      }
    })
      .then(() => {
        setDeleterOpen(false);
        getComments();
      })
      .catch((err) => console.error(err));
  };

  const handleEdit = (e) => {
    setCommentText(e.target.value);
  }

  const handleSubmitEdit = () => {
    axios.put('/api/comments', {
      id: comment.id,
      comment: commentText,
    })
      .then(() => {
        setCommentText('');
        setEditor(false);
        getComments();
      })
      .catch((err) => console.error(err));
  }

  const openEditor = () => {
    setEditor(true);
  }

  const closeEditor = () => {
    setEditor(false);
    setCommentText('');
  }

  const openDeleter = () => {
    setDeleterOpen(true);
  };

  const closeDeleter = () => {
    setDeleterOpen(false);
  };
  const getEditDeleteOptions = () => {
    if (comment.userId === currentUserInfo.id) {
      return (
        <Typography textAlign='right' sx={{ color: iconColors, mb: '20px' }}>
          <span onClick={openEditor}>
            edit
          </span>
          <span>
            |
          </span>
          <span onClick={openDeleter}>
            delete
          </span>
        </Typography>
      );
    }
  };


  return (
    <div>
      <Grid container spacing={4}>
        <Grid item xs={2} sm={2} md={2}>
          {
            currentUserInfo.id === comment.userId
            ? <Link to='/profile'>
              <Avatar src={profilePic} />
            </Link>
            : <Link to={`/user/?id=${comment.userId}`}>
                <Avatar sx={{ height: '30px', width: '30px', ml: '15px', mb: '20px'}} src={profilePic} />
              </Link>
          }
          {/* <Link to={`/user/?id=${comment.userId}`}>
            <Avatar sx={{ height: '30px', width: '30px', ml: '15px', mb: '20px'}} src={profilePic}/>
          </Link> */}
        </Grid>
        <Grid item xs={8} sm={8} md={8}>
          <Paper>
            <Dialog open={deleterOpen}>
              <Typography textAlign='left' sx={{ color: inverseMode, mb: '20px', ml: '5px'}}>are you sure you want to delete your comment?</Typography>
              <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={deleteComment}>DELETE</Button>
              <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeDeleter}>cancel</Button>
            </Dialog>
            {!editor && <Typography textAlign='left' sx={{ color: inverseMode, mb: '20px', ml: '5px'}}>{comment.comment} {comment.edited && ' (edited)'}</Typography>}
            {!editor && <Typography textAlign='right' sx={{ color: inverseMode, mb: '20px' }}>{moment(comment.created_at).calendar()}</Typography>}
            <Typography variant='body2' sx={{ bgcolor: iconColors }}>
              {editor && <OutlinedInput onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} sx={{color: inverseMode}} placeholder={comment.comment} value={commentText} onChange={handleEdit}/>}
            </Typography>
            {editor && <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={handleSubmitEdit}>confirm changes</Button>}
            {editor && <Button variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={closeEditor}>cancel</Button>}
          </Paper>
          {getEditDeleteOptions()}
        </Grid>
      </Grid>
      <div>
        {/* <Fab href='edit' variant='extended' size='small'>edit</Fab>
        <Fab href='delete' variant='extended' size='small'>delete</Fab> */}
      </div>
    </div>
  );
};

export default Comment;
