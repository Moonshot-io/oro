import React, { useEffect, useState, useContext } from 'react';

import { UserContext } from '../context/UserContext';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';

// const drawerWidth = 240;

// const openedMixin = (theme: Theme): CSSObject => ({
//   width: drawerWidth,
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.enteringScreen,
//   }),
//   overflowX: 'hidden',
// });

// const closedMixin = (theme: Theme): CSSObject => ({
//   transition: theme.transitions.create('width', {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   overflowX: 'hidden',
//   width: `calc(${theme.spacing(7)} + 1px)`,
//   [theme.breakpoints.up('sm')]: {
//     width: `calc(${theme.spacing(8)} + 1px)`,
//   },
// });

// const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
//   ({ theme, open }) => ({
//     width: drawerWidth,
//     flexShrink: 0,
//     whiteSpace: 'nowrap',
//     boxSizing: 'border-box',
//     ...(open && {
//       ...openedMixin(theme),
//       '& .MuiDrawer-paper': openedMixin(theme),
//     }),
//     ...(!open && {
//       ...closedMixin(theme),
//       '& .MuiDrawer-paper': closedMixin(theme),
//     }),
//   }),
// );

const Contacts = ({changeChat}) => {
  const userContext = useContext(UserContext);
  const { currentUserInfo, userContacts } = userContext;
  const theme = useTheme();
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

  // <Drawer variant="permanent" open={open}>
  //   <DrawerHeader>
  //     <IconButton onClick={handleDrawerClose}>
  //       {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
  //     </IconButton>
  //   </DrawerHeader>
  //   <Divider />
  //   <List>
  //     {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
  //       <ListItem key={text} disablePadding sx={{ display: 'block' }}>
  //         <ListItemButton
  //           sx={{
  //             minHeight: 48,
  //             justifyContent: open ? 'initial' : 'center',
  //             px: 2.5,
  //           }}
  //         >
  //           <ListItemIcon
  //             sx={{
  //               minWidth: 0,
  //               mr: open ? 3 : 'auto',
  //               justifyContent: 'center',
  //             }}
  //           >
  //             {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
  //           </ListItemIcon>
  //           <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
  //         </ListItemButton>
  //       </ListItem>
  //     ))}
  //   </List>
  // </Drawer>

    <div>
      {
        userContacts.map((contact, index) => {
          return (
            <List sx={{ bgcolor: inverseMode }} key={'list' + index}>
              <ListItemButton
                sx={{ color: iconColors }}
                key={'listitembutton' + index}
                alignItems="flex-start"
                selected={selectedIndex === index}
                onClick={(event) => {
                  handleListItemClick(event, index);
                  changeCurrentChat(index, contact);
                }}
              >
                <ListItemAvatar key={'listitemavatar' + index}>
                  <Avatar key={'avatar' + index} src={contact.profileURL} />
                </ListItemAvatar>
                <ListItemText
                  primary={contact.fullName}
                  secondary={
                    <React.Fragment>
                      <Typography
                        key={'contactTypography' + index}
                        sx={{ display: 'inline', color: iconColors}}
                        variant="body2"
                        color="#F3F3F3"
                      >
                    messages
                      </Typography>
                    </React.Fragment>
                  }
                />
              </ListItemButton>
              <Divider key={'divider' + index} variant="inset" component="li" />
            </List>
          );
        })
      }
    </div>
  );
};



export default Contacts;
