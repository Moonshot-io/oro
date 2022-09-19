import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Grid, OutlinedInput, Button, Avatar, Typography, UseTheme, Dialog } from '../styles/material';
import moment from 'moment';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';

interface CommentProps {
  comment: {
    comment: string;
    created_at: string;
    edited: boolean;
    id: number;
    photoUrl: string;
    userId: string;
  },
  getComments: () => void
}

const Comment: React.FC<CommentProps> = ({comment, getComments}) => {

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;
  const theme = UseTheme();
  const highlight = theme.palette.primary.contrastText;
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const [commentText, setCommentText] = useState<string>(`${comment.comment}`);
  const [editor, setEditor] = useState<boolean>(false);
  const [deleterOpen, setDeleterOpen] = useState<boolean>(false);
  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;

  const [profilePic, setProfilePic] = useState<string>('');

  useEffect(() => {
    getAvatar();
  }, []);

  const getAvatar = async (): Promise<void> => {
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

  const deleteComment = (): void => {
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

  const handleEdit = (e: {target: {value: string}}) => {
    setCommentText(e.target.value);
  };

  const handleSubmitEdit = () => {
    axios.put('/api/comments', {
      id: comment.id,
      comment: commentText,
    })
      .then(() => {
        setEditor(false);
        getComments();
      })
      .catch((err) => console.error(err));
  };

  const openEditor = (): void => {
    setEditor(true);
  };

  const closeEditor = (): void => {
    setEditor(false);
    setCommentText(`${comment.comment}`);
  };

  const openDeleter = (): void => {
    setDeleterOpen(true);
  };

  const closeDeleter = (): void => {
    setDeleterOpen(false);
  };


  return (
    <div className='comments'>
      <Grid container>
        <Grid item xs={2} sm={2} md={2}>
          {
            currentUserInfo?.id === comment.userId
            ? <Link to='/profile'>
              <Avatar sx={{ height: '30px', width: '30px', mb: '20px'}} src={profilePic} />
            </Link>
            : <Link to={`/user/?id=${comment.userId}`}>
                <Avatar sx={{ height: '30px', width: '30px', mb: '20px'}} src={profilePic} />
              </Link>
          }
        </Grid>
        <Grid item xs={10} sm={10} md={10}>
          <div className={mode === 'dark' ? 'commentsPaperDark' : 'commentsPaperLight'}>
            <Dialog open={deleterOpen}>
              <Typography textAlign='left' sx={{ color: iconColors, mb: '20px', ml: '5px'}}>are you sure you want to delete your comment?</Typography>
              <Button variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={deleteComment}>DELETE</Button>
              <Button variant='contained' size='small' sx={{ bgcolor: inverseMode }} onClick={closeDeleter}>cancel</Button>
            </Dialog>
            {!editor &&
              <Typography textAlign='left' sx={mode === 'dark' ? {color: iconColors} : {color: iconColors}}>
                 <span className='comment'>
                  {comment.comment}
                  {comment.edited && ' (edited)'}
                 </span>
              </Typography>}
            <Typography variant='body2' sx={{ bgcolor: inverseMode }}>
              {editor && <OutlinedInput fullWidth={true} inputProps={{maxLength: 150}} onKeyPress={(e) => e.key === 'Enter' && handleSubmitEdit()} sx={{color: iconColors}} value={commentText} onChange={handleEdit}/>}
            </Typography>
            <span>
              {editor && <Button  fullWidth={true} variant='contained' size='small' sx={{ bgcolor: iconColors }} onClick={handleSubmitEdit}>confirm</Button>}
              {editor && <Button fullWidth={true} variant='contained' size='small' sx={{bgcolor: iconColors }} onClick={closeEditor}>cancel</Button>}
            </span>
          </div>
            <Typography sx={{ color: iconColors, fontSize: '12px'}}>
            {!editor &&
              <span>
                <span className='commentTime'>
                  {moment(comment.created_at).calendar()}
                </span>
                {currentUserInfo?.id === comment.userId &&
                <span className='editDelete'>
                  <span className='edit' onClick={openEditor}>
                    edit
                  </span>

                  <span className='divider'>
                    |
                  </span>

                  <span className='delete' onClick={openDeleter}>
                    delete
                  </span>
                </span>
                  }

              </span>
                  }
                </Typography>
        </Grid>
      </Grid>
    </div>
  );
};

export default Comment;
