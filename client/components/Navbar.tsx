import * as React from 'react';
import { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link, Routes, Route } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import NightlightIcon from '@mui/icons-material/Nightlight';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { UserContext } from '../context/UserContext';
import { ThemeContext } from '../context/ThemeContext';
import { useTheme } from '@mui/material/styles';
<<<<<<< HEAD
const iconColors = '';
const inverseMode = '';

=======
import { blue } from '@mui/material/colors';
const iconColors = '';
const inverseMode = '';

>>>>>>> ddddffa84a7edbba3cd93b0dc95b0de6bf2b8968
const pages = [
  <Link
    to='/eventListings'
    style={{ textDecoration: 'none'}}
    key={'eventListings'}
  >
    Find Events
  </Link>,
  <Link
    to='/eventFeed'
    style={{ textDecoration: 'none' }}
    key={'eventListings'}
  >
    Event Feed
  </Link>,
  <Link to='/songFinder' style={{ textDecoration: 'none' }} key={'songFinder'}>
    Song Finder
  </Link>,
  <Link to='/artists' style={{ textDecoration: 'none' }} key={'artists'}>
    Artists
  </Link>,
  <Link to='/details' style={{ textDecoration: 'none' }} key={'details'}>
    details
  </Link>,
  <Link to='/login' style={{ textDecoration: 'none' }} key={'login'}>
    Login
  </Link>,
  <Link to='/profile' style={{ textDecoration: 'none' }} key={'profile'}>
    Account
  </Link>,
  <Link
    to='/travelPlanner'
    style={{ textDecoration: 'none' }}
    key={'travelPlanner'}
  >
    Travel Planner
  </Link>,
  <Link to='/backpack' style={{ textDecoration: 'none' }} key={'backpack'}>
    BackPack
  </Link>,
  <Link to='/notifications' style={{ textDecoration: 'none' }} key={'songFinder'}>
      Notifications
  </Link>,
<Link to='/chat' style={{ textDecoration: 'none' }} key={'chat'}>Chat</Link>,
];

const Navbar = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const themeContext = useContext(ThemeContext);
  const { mode, setMode, toggleMode } = themeContext;

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const { logoutUser } = useContext(UserContext);

  const handleLogout = () => {
    logoutUser();
  };

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position='sticky' sx={{ bgcolor: inverseMode }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <img src='images/VSLOGO.png' height='75' />
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex', bgcolor: inverseMode } }}>
            {pages.map((page, index) => (
              <Button
                key={`page${index}`}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0}}>
            <IconButton onClick={toggleMode}>
              {mode === 'dark' ? (
                <div><Tooltip title='Dark mode'><NightlightIcon fontSize='small' sx={{ color: iconColors }}/></Tooltip>
                </div>
              ) : (
                <div><Tooltip title='Light mode'><WbSunnyIcon fontSize='small' sx={{ color: iconColors }}/></Tooltip>
                </div>
              )}
            </IconButton>
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size='large'
              aria-label='account of current user'
              aria-controls='menu-appbar'
              aria-haspopup='true'
              onClick={handleOpenNavMenu}
            >
              <MenuIcon sx={{ color: iconColors }}/>
            </IconButton>
            <Menu
              id='menu-appbar'
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'block', lg: 'block' },
              }}
            >
              {pages.map((page, index) => (
                <MenuItem key={`nav${index}`} onClick={handleCloseNavMenu}>
                  <Typography textAlign='center'>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
