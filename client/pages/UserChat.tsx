import React, { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';
import Contacts from '../components/Contacts';
import ChatContainer from '../components/ChatContainer';
import { io } from 'socket.io-client'
import { ColorButton, ArrowBackIosNewIcon, Fab, Box, UseTheme, Typography, Grid } from '../styles/material';

const UserChat: React.FC = () => {
  const socket = useRef()
  const theme = UseTheme();
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

  //WORKING LOGIN REDIRECT
  useEffect(() => {
    if (!currentUserInfo?.id) {
      navigate('/login');
      }
    }, [currentUserInfo]);

  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };

  const goBack = () => {
    setCurrentChat(undefined);
  };

  return (
    <div className="page-body">
      <div>
      <Typography
    variant="h2">Chats</Typography>
      </div>
      <Box>
        <Grid container columnSpacing={0} maxWidth="100%" height= '70vh'>
          <Grid item xs={1} md={1} lg={3} key='contactscontainer' width="100%">
              <Contacts key='contacts' changeChat={handleChatChange} />
          </Grid>
          <Grid item xs={11} md={11} lg={9} key='chatcontainer' maxWidth= '100%'>
              <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
          </Grid>
            </Grid>
            </Box>
            </div>
)
};


export default UserChat;


// //import React, { useState, useEffect, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { UserContext } from '../context/UserContext';
// import Contacts from '../components/Contacts';
// import ChatContainer from '../components/ChatContainer';
// import { io } from 'socket.io-client'
// import { ColorButton, ArrowBackIosNewIcon, Fab, Box, UseTheme, Typography, Grid } from '../styles/material';

// const UserChat: React.FC = () => {
//   const socket = useRef()
//   const theme = UseTheme();
//   const iconColors = theme.palette.secondary.contrastText;
//   const inverseMode = theme.palette.secondary.main;

//   const userContext = useContext(UserContext);
//   const { currentUserInfo, userContacts } = userContext;
//   const [ user, setUser ] = useState(undefined)
//   const currentUser = currentUserInfo;
//   const [ currentChat, setCurrentChat ] = useState(undefined);
//   const navigate = useNavigate();
//   useEffect(() => {
//     if(currentUser){
//         socket.current = io('/');
//         socket.current.emit('add-user', currentUser.id)
//     }
//   }, [currentUser]);
//   useEffect(()=>{console.info('CHAT', document.querySelectorAll(" p > div "))}, [])

//   //WORKING LOGIN REDIRECT
//   useEffect(() => {
//     if (!currentUserInfo?.id) {
//       navigate('/login');
//       }
//     }, [currentUserInfo]);

//   const handleChatChange = (chat) => {
//     setCurrentChat(chat);
//   };

//   const goBack = () => {
//     setCurrentChat(undefined);
//   };


// if(currentChat === undefined){
//   return (
//     <div className="page-body">
//       <div>
//       <Typography
//     variant="h2">Chats</Typography>
//       </div>
//       <React.Fragment>
//         <Grid container columnSpacing={0} maxWidth="100%" height= '70vh'>
//           <Grid item xs={12} key='contactscontainer' maxWidth="100%">
//             <Box sx={{ height: 'auto', width: '100%' }}>
//               <Contacts key='contacts' changeChat={handleChatChange} />
//             </Box>
//           </Grid>
//         </Grid>
//       </React.Fragment>
//     </div>
//   );
// } else {
//   return (
//   <div className="page-body">
//   <div>
//   <Typography
// variant="h2">Chats</Typography>
//   </div>
//   <Box sx={{ position: 'sticky', zIndex: 'tooltip' }}>
//   <Grid container>
//         <Grid>
//             <Fab
//               size='small'
//               onClick={() => goBack()}
//               sx={{
//                 top: 100,
//                 right: 'auto',
//                 bottom: 'auto',
//                 left: 'inherit',
//                 position: 'fixed'
//               }}>
//               <ArrowBackIosNewIcon onClick={() => goBack()} />
//             </Fab>
//             </Grid>
//             </Grid>
//           </Box>
//                 <React.Fragment>
//         <Grid container columnSpacing={0} maxWidth="100%">
//           <Grid item xs={12} key='contactscontainer' maxWidth="100%">
//             <Box sx={{ height: 'auto', width: '100%' }}>
//               <Contacts key='contacts' changeChat={handleChatChange} currentContact={currentChat}/>
//             </Box>
//           </Grid>
//         </Grid>
//       </React.Fragment>
//             <Box sx={{ height: 'auto', maxWidth: '100%' }}>
//           <Grid item xs={12} key='chatcontainer' maxWidth= '100%'>
//               <ChatContainer currentUser={currentUser} currentChat={currentChat} socket={socket} />
//           </Grid>
//             </Box>
//             </div>
// )
// }
// };


// export default UserChat;
