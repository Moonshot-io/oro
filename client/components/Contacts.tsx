import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../context/UserContext';

import { UseTheme, ListItemAvatar, ListItemText, Divider, Avatar, Typography, List, ListItemButton, Grid, ImageList } from '../styles/material';

const Contacts = ({changeChat}) => {
  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const currentUser = currentUserInfo;
  const [currentUserName, setCurrentUserName ] = useState('');
  const [ currentUserImage, setCurrentUserImage ] = useState('');
  const [ currentSelected, setCurrentSelected ] = useState(0);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (currentUser) {
      setCurrentUserName(currentUser.fullName);
      if(currentUser.profileURL){
        setCurrentUserImage(currentUser.profileURL);
      }
    }
  }, [currentUser]);
  const changeCurrentChat = (index:number, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
  ) => {
    setSelectedIndex(index);
  };


  return (
  <Grid maxWidth='100%'>
  <ImageList sx={{ bgcolor: inverseMode,  gridAutoFlow: "column",
            gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr)) !important",
            gridAutoColumns: "minmax(160px, 1fr)" }}>
      {
        userContacts.map((contact, index) => {
          return (
              <><ListItemButton
              sx={{ color: iconColors, align:'center' }}
              key={'listitembutton' + index}
              alignItems="flex-start"
              selected={selectedIndex === index}
              onClick={(event) => {
                handleListItemClick(event, index);
                changeCurrentChat(index, contact);
              } }
            >
              <ListItemAvatar key={'listitemavatar' + index} sx={{align:'center'}}>
                <Avatar key={'avatar' + index} src={contact.profileURL} />
              <ListItemText
                primary={contact.fullName}
                secondary={<React.Fragment>
                </React.Fragment>} />
              </ListItemAvatar>
            </ListItemButton></>
              );
            })
          }
          </ImageList>
          </Grid>
  );
};



export default Contacts;
