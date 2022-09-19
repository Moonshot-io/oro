import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { UseTheme, ListItemAvatar, ListItemText, Divider, Avatar, Typography, List, ListItemButton, Grid, ImageList, Card } from '../styles/material';

const Contacts = ({changeChat, currentContact}) => {
  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const currentUser = currentUserInfo;
  const [allContacts, setAllContacts] = useState(userContacts);
  const [currentUserName, setCurrentUserName ] = useState('');
  const [ currentUserImage, setCurrentUserImage ] = useState('');
  const [ currentSelected, setCurrentSelected ] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = React.useState(false);
  const [currentChat, setCurrentChat] = useState([]);
  const [recentMessages, setMessages] = useState([]);
  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.fullName);
      if(currentUser.profileURL){
        setCurrentUserImage(currentUser.profileURL);
      }
    }
  }, [currentUser]);

  const getMessages = async (sender, receiver) => {
      const response = await axios.post('/api/messages/getmsg', {
        senderId: sender.id,
        receiverId: receiver.id
      });
      console.log(response)
      setCurrentChat(response.data);
  }


  const changeCurrentChat = (index:number, contact) => {

    getMessages(currentUser, contact);
    console.log(index, contact);
    console.log('change current chat');
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };

if(currentContact === undefined){
  return (
  <Grid maxWidth='100%' container>
      {
        userContacts.map((contact, index) => {
          return (
            <Grid xs={12} mb='10px'>
              <ListItemButton
              sx={{ align:'center' }}
              key={'listitembutton' + index}
              alignItems="flex-start"
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                changeCurrentChat(index, contact);
              } }
            >
              <Grid xs={2}>
                <Avatar key={'avatar' + index} src={contact.profileURL} />
                </Grid>
                <Grid xs={8}>
              <ListItemText
                primary={contact.fullName}
                />
            </Grid>
            </ListItemButton>
            </Grid>
              );
            })
          }

          </Grid>
  );

} else {

  return (
    <Grid maxWidth='100%' container>
        {
          [currentContact].map((contact, index) => {
            return (
              <Grid xs={12}>
                <ListItemButton
                sx={{ align:'center' }}
                key={'listitembutton' + index}
                alignItems="flex-start"
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  changeCurrentChat(index, contact);
                } }
              >
                <Grid xs={2}>
                  <Avatar key={'avatar' + index} src={contact.profileURL} />
                  </Grid>
                  <Grid xs={8}>
                <ListItemText
                  primary={contact.fullName} />
              </Grid>
              </ListItemButton>
              </Grid>
                );
              })
            }

            </Grid>
    );
}
};



export default Contacts;
