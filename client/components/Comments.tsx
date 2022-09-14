import React, { useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {Fab} from '../styles/material';
import SendIcon from '@mui/icons-material/Send';
import Comment from './Comment';
import { useTheme } from '@mui/material/styles';
import { CssTextField } from '../styles/material';
import { io } from 'socket.io-client'

interface UserPictureProps {
  photo: {
    id: number;
    userId?: string;
    photoUrl: string;
    eventAPIid: string;
    created_at?: string;
    caption?: string;
    deleteToken?: string | null;
  },
}

const Comments: React.FC<UserPictureProps> = ({photo) => {
  const socket = useRef()
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;


  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;



  // const [commentsOpen, setCommentsOpen] = useState(false);
  const [message, setMessage] = useState<string>('');
  const [comments, setComments] = useState<Array<{id: number; userId: string; photoUrl: string; comment: string; edited: boolean; created_at: string;}>>([]);

  useEffect(() => {
    getComments();
  }, []);

  const getComments = async (): Promise<void> => {
    await axios.get('/api/comments', {
      params: {
        photoUrl: photo.photoUrl
      }
    })
      .then((commentData) => {
        setComments(commentData.data);
      })
      .catch((err) => console.error(err));
  };

  const handleComment = (e: {target: {value: string}}): void => {
    setMessage(e.target.value);
  };

  const handleSend = async (): Promise<void> => {
    await axios.post('/api/comments', {
      comment: message,
      photoUrl: photo.photoUrl,
      userId: currentUserInfo?.id,
      ownerId: photo.userId,


    })
      .then((commentData) => {
        setMessage('');
        getComments();
        axios.post('/api/notifications', {
          ownerId: photo.userId,
          commentId: commentData.data.id,
        });
        
        socket.current = io('/');

        socket.current.emit('send-noti', {
          senderId: currentUserInfo.id,
          receiverId: photo.userId
        });

      })
      .catch((err) => console.error(err));
  };

  const inputstyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${inverseMode} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #9B27B0 inset",
      },
      '-webkit-text-fill-color': '#9B27B0',
      color: '#9B27B0',
    }
  };

  const fontColor = {
    style: { color: '#9B27B0' }
  };

  return (
    <div id='comments-container'>

      {comments.map((comment, i) => {
        return (
          <Comment key={i} comment={comment} getComments={getComments}/>
        );
      })}

      <CssTextField placeholder='add comment' onKeyPress={(e) => e.key === 'Enter' && handleSend()} InputLabelProps={fontColor} multiline={true} inputProps={{inputstyle, maxLength: 150}} sx={{ ml: '15px', mb: '40px', mt: '20px'}} color="secondary" size='small' onChange={(e) => handleComment(e)} value={message}/>
      <Fab variant='extended' type='submit' onClick={handleSend}
        sx={{bgcolor: iconColors, ml: '20px', mt: '15px'}}><SendIcon sx={{ color: inverseMode }}/></Fab>
    </div>
  );
};


export default Comments;
