// import * as React from 'react';
// import {Box, Drawer, Button, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, InboxIcon, MailIcon} from '../styles/material';
// import { Link, Routes, Route, useNavigate } from 'react-router-dom';
// import MenuIcon from '@mui/icons-material/Menu';

// export default function Menu() {
//   const [state, setState] = React.useState({
//     top: false,
//     left: false,
//     bottom: false,
//     right: false,
//   });

//   const toggleDrawer = (anchor, open) => (event) => {
//     if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
//       return;
//     }

//     setState({ ...state, [anchor]: open });
//   };

//   const list = (anchor) => (
//     <Box
//       sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
//       role="presentation"
//       onClick={toggleDrawer(anchor, false)}
//       onKeyDown={toggleDrawer(anchor, false)}
//     >
//       <List>
//         {[
//           <Link to='/profile' key={'profile'}>My Account</Link>,
//           <Link to='/notifications' key={'notifications'}>Notifications</Link>,
//           <Link to='/eventListings' key={'eventListings'}>Find Events</Link>,
//           <Link to='/songFinder' key={'songFinder'}>Song Finder</Link>,
//           <Link to='/artists' key={'artists'}>Artists</Link>].map((text, index) => (
//           <ListItem key={`text${index}`} disablePadding>
//             <ListItemButton>
//               <ListItemIcon>
//                 {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
//               </ListItemIcon>
//               <ListItemText primary={text} />
//             </ListItemButton>
//           </ListItem>
//         ))}
//       </List>
//     </Box>
//   );

//   return (
//     <div>
//       {['right'].map((anchor, index) => (
//         <React.Fragment key={`anchor${index}`}>
//           <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
//           <Drawer
//             anchor={anchor}
//             open={state[anchor]}
//             onClose={toggleDrawer(anchor, false)}
//           >
//             {list(anchor)}
//           </Drawer>
//         </React.Fragment>
//       ))}
//     </div>
//   );
// }
