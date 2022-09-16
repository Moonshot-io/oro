import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../context/UserContext';

import { UseTheme, ListItemAvatar, ListItemText, Divider, Avatar, Typography, List, ListItemButton, Grid, ImageList, Card, CardHeader, CardMedia, CardContent, Box } from '../styles/material';

const Contacts = ({changeChat, currentContact}) => {
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

if(currentContact === undefined){
  return (
    <Box sx={{
      flexGrow: 1,
      height: '100%' }}>
      <Grid container spacing={2}>
      {
        userContacts.map((contact, index) => {
          return (
            <Grid item xs={6} sm={4} md={3}>
            <Card sx={{
              backgroundImage: 'none',
              bgcolor: inverseMode,
              ':hover': {
                boxShadow: 20,
                opacity: 0.8,
              }
            }}>
              <CardMedia
                style={{ cursor: 'pointer' }}
                component="img"
                height="100%"
                image={contact.profileURL}
                alt={contact.fullName}
                sx={{ bgcolor: inverseMode }}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  changeCurrentChat(index, contact);
                }} />
                <CardContent>
          <Typography variant="body1" component="div">
          {contact.fullName}
          </Typography>
        </CardContent>
            </Card>
            </Grid>
              );
            })
          }
          </Grid>
        </Box>
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
                  primary={contact.fullName}
                  secondary={<React.Fragment>
                  </React.Fragment>} />
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

{/* <Grid xs={6} mb='10px'>
                <ListItemButton
                  sx={{ align: 'center', backgroundColor: inverseMode }}
                  key={'listitembutton' + index}
                  alignItems="flex-start"
                  selected={selectedIndex === index}
                  onClick={(event) => {
                    handleListItemClick(event, index);
                    changeCurrentChat(index, contact);
                  }}
                >
                  <Grid xs={2}>
                    <Avatar key={'avatar' + index} src={contact.profileURL} />
                  </Grid>
                  <Grid xs={8}>
                    <ListItemText
                      primary={contact.fullName}
                      secondary={<React.Fragment>
                      </React.Fragment>} />
                  </Grid>
                </ListItemButton>
              </Grid> */}