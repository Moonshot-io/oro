import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import Toolbar from '@mui/material/Toolbar';
import Contacts from '../components/Contacts';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import IconButton from '@mui/material/IconButton';
import RateReviewIcon from '@mui/icons-material/RateReview';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'
import { useTheme } from '@mui/material/styles';

const UserChat: React.FC = () => {
  const socket = useRef()
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const [ user, setUser ] = useState(undefined)
  const currentUser = currentUserInfo;
  const [ currentChat, setCurrentChat ] = useState(undefined);
  const navigate = useNavigate();
  useEffect(() => {
    if(currentUser){
        socket.current = io('/');
        socket.current.emit('add-user', currentUser.id)
    }
  }, [currentUser]);
  useEffect(()=>{console.info('CHAT', document.querySelectorAll(" p > div "))}, [])

  const obj = {id: '88', profileURL: 'stuff'}

  //WORKING LOGIN REDIRECT
  useEffect(() => {
    if (!currentUserInfo?.id) {
      navigate('/login');
      }
    }, [currentUserInfo]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  return (
    <div>
      <div>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static" sx={{ bgcolor: inverseMode }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                href='/profile'
                sx={{ mr: 2 }}
              >
                <ArrowBackIosNewIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                Messages
              </Typography>
              <Button sx={{ color: iconColors }}>< RateReviewIcon /></Button>
            </Toolbar>
          </AppBar>
        </Box>
      </div>
      <React.Fragment>
        <Grid container columnSpacing={0} maxWidth="100%" height= '70vh'>
          <Grid item xs={12} key='contactscontainer' maxWidth="100%">
            <Box sx={{ bgcolor: '#0D1013', height: 'auto', width: '100%' }}>
              <Contacts key='contacts' changeChat={handleChatChange} />
            </Box>
          </Grid>
            <Box sx={{ bgcolor: '#0D1013', height: 'auto', maxWidth: '100%' }}>
          <Grid item xs={12} key='chatcontainer' maxWidth= '100%'>
              <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
          </Grid>
            </Box>
        </Grid>
      </React.Fragment>
    </div>
  );
};


export default UserChat;
