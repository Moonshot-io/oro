import React, { useState, useEffect, useContext, useRef} from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import Comment from './Comment';
import { io } from 'socket.io-client'

import AvatarComponent from './Avatar';
import { CssTextField, Grid, UseTheme, SendIcon, Fab, ColorButton, InputAdornment } from '../styles/material';
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
  getNotifications: () => void;
}

const Comments: React.FC<UserPictureProps> = ({photo, getNotifications}) => {
  const socket = useRef()
  const theme = UseTheme();
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

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
        if (!(currentUserInfo.id === photo.userId)) {
          axios.post('/api/notifications', {
            ownerId: photo.userId,
            commentId: commentData.data.id,
          });

          socket.current = io('/');

          socket.current.emit('send-noti', {
            senderId: currentUserInfo.id,
            receiverId: photo.userId,
            sender: currentUserInfo?.fullName,
          });
        }
      })
      .catch((err) => console.error(err));
  };

  const inputstyle = {
    style: {
      WebkitBoxShadow: `0 0 0 1000px ${inverseMode} inset`,
      "&:-webkit-autofill": {
        WebkitBoxShadow: "0 0 0 1000px #a352ff inset",
      },
      '-webkit-text-fill-color': '#a352ff',
      color: '#a352ff',
    }
  };

  const fontColor = {
    style: { color: '#a352ff' }
  };

  return (
    <div id='comments-container'>

      {comments.map((comment, i) => {
        return (
          <Comment key={i} comment={comment} getComments={getComments}/>
        );
      })}
      {currentUserInfo.id &&
        <Grid container sx={{alignItems:"center"}}>
        <Grid item xs={2} sm={2} md={2} sx={{alignItems:"center"}}>
        <AvatarComponent/>
        </Grid>
        <Grid item xs={10} sm={10} md={10} sx={{alignItems:"center"}}>
        <CssTextField
        placeholder='add comment'
        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        InputLabelProps={fontColor}
        multiline={true}
        inputProps={{
          inputstyle, maxLength: 150
        }}
        InputProps={{endAdornment:
          (
            <InputAdornment position="end">
              <ColorButton onClick={handleSend} sx={{bgColor:'#a352ff'}}>
              <SendIcon sx={{ color: inverseMode }}/>
              </ColorButton>
            </InputAdornment>
          )
          }}
        sx={{ mb: '20px', mt: '20px', pr: '1px'}} color="secondary" size='small' onChange={(e) => handleComment(e)}
        value={message}/>
          </Grid>
          </Grid>

      }

      {!currentUserInfo.id &&
      'Please log in to leave a comment'
      }
    </div>
  );
};


export default Comments;
