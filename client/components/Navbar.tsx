import React, { useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

import { Box, Grid, Container, AppBar, Tooltip, UseTheme, Divider, Typography, Toolbar, IconButton, Menu, MenuIcon, Button, MenuItem, NightlightIcon, WbSunnyIcon, Badge, HomeIcon, TravelExploreIcon, MusicNoteIcon, LuggageIcon, GradeIcon, PriceChangeIcon, ForumIcon, LoginIcon, EmailIcon, LogoutIcon } from '../styles/material';

import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

interface navPropsType {
  notif: number
}

const Navbar = (props: navPropsType) => {
  const { currentUserInfo, getCurrentUser, logoutUser } = useContext(UserContext);

  const { notif } = props;
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const themeContext = useContext(ThemeContext);
  const { mode, toggleMode } = themeContext;

  const navigate = useNavigate();

  const pages = [

    ['/', <Link
      to='/'
      style={{ textDecoration: 'none' }}
      key={'home'}
    >
      <HomeIcon className='nav-icons'/>
      Home
    </Link>],
    ['/eventListings', <Link
      to='/eventListings'
      style={{ textDecoration: 'none' }}
      key={'eventListings'}
    >
      <TravelExploreIcon className='nav-icons'/>
      Find Events
    </Link>],
    ['/travelPlanner', <Link
      to='/travelPlanner'
      style={{ textDecoration: 'none' }}
      key={'travelPlanner'}
    >
      <LuggageIcon className='nav-icons'/>
      Travel Planner
    </Link>],
    ['/backpack', <Link to='/backpack' style={{ textDecoration: 'none' }} key={'backpack'}>
      <PriceChangeIcon className='nav-icons'/>
      Budgets
    </Link>],
    ['/songFinder', <Link to='/songFinder' style={{ textDecoration: 'none' }} key={'songFinder'}>
      <MusicNoteIcon className='nav-icons'/>
      Song Finder
    </Link>],
    ['/artists', <Link to='/artists' style={{ textDecoration: 'none' }} key={'artists'}>
      <GradeIcon className='nav-icons'/>
      Favorite Artists
    </Link>]
  ];

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (page?: any) => {
    if (page === '/home') {
      if (logoutUser) {
        logoutUser();
      }
    }
    setAnchorElNav(null);
    navigate(page, { replace: true });
  };

  let isLoggedIn = false;

  if (currentUserInfo?.id) {
    isLoggedIn = true;
  }

  useEffect(() => {
    if (getCurrentUser) {
      getCurrentUser();
    }
  }, [getCurrentUser]);

  const AccountBlock = () => {
    const account = [
      ['/profile', <Link to='/profile' style={{ textDecoration: 'none' }} key={'profile'}>
        <img src={currentUserInfo?.profileURL} className='nav-icons avatar'/>Account</Link>],
      ['/chat', <Link to='/chat' style={{ textDecoration: 'none' }} key={'chat'}> <ForumIcon className='nav-icons'/>Chat</Link>],
      ['/notifications', <Link to='/notifications' style={{ textDecoration: 'none' }} key={'notifications'}>
        <Badge badgeContent={notif} color="primary" >
          <EmailIcon className='nav-icons'/>
        </Badge>
        Notifications</Link>]
    ];
    return (account.map((page, index) => (
      <MenuItem key={`nav${index}`} onClick={() => { handleCloseNavMenu(page[0]); }}>
        <Typography variant='h6' textAlign='center'>{page[1]}</Typography>
      </MenuItem>
    )));
  };

  return (
    <AppBar position='sticky' sx={{ bgcolor: inverseMode, paddingRight: '20px' }}>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Grid container>
            <Grid item xs={9} sm={10} style={{ display: 'flex', alignItems: 'left' }}>
              <a href='/'><img src={mode === 'dark' ? 'images/VSLOGO-dark.png' : 'images/VSLOGO.png'} height='75' /></a>
              <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'none', bgcolor: inverseMode }, mr: '5px' }}>
                {pages.map((page, index) => (
                  <Button
                    key={`page${index}`}
                    onClick={()=>{ handleCloseNavMenu(); }}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page[1]}
                  </Button>
                ))}
              </Box>
            </Grid>
            <Grid item xs={2} sm={1} style={{ display: 'flex' }} sx={{ margin: 'auto' }}>
              <IconButton onClick={toggleMode}>
                {mode === 'dark' ? (
                  <div><Tooltip title='Dark mode'><NightlightIcon fontSize='medium' sx={{ color: iconColors }} /></Tooltip>
                  </div>
                ) : (
                  <div><Tooltip title='Light mode'><WbSunnyIcon fontSize='medium' sx={{ color: iconColors }} /></Tooltip>
                  </div>
                )}
              </IconButton>
            </Grid>
            <Grid item xs={1} style={{ display: 'flex' }} sx={{ margin: 'auto' }}>
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
              >
                <MenuIcon sx={{ color: iconColors }} fontSize='large' />
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
                onClose={()=>{ handleCloseNavMenu(); }}
                sx={{
                  display: { xs: 'block', md: 'block', lg: 'block' },
                }}
              >
                {pages.map((page, index) => (
                  <MenuItem key={`nav${index}`} onClick={() => { handleCloseNavMenu(page[0]); }}>
                    <Typography variant='h6' textAlign='center'>{page[1]}</Typography>
                  </MenuItem>
                ))}
                <Divider style={{width: '100%', height: '1%'}} sx={{ borderColor: iconColors, opacity: 0.2 }}/>
                {
                  isLoggedIn
                    ? <div>{AccountBlock()}
                      <MenuItem onClick={() => { isLoggedIn ? handleCloseNavMenu('/home') : handleCloseNavMenu('/login'); }}>
                        <Link to='/home' style={{ textDecoration: 'none' }} key={'logout'} onClick={logoutUser}>
                          <LogoutIcon className='nav-icons'/>
                          Logout
                        </Link>
                      </MenuItem> </div>
                    :
                    <MenuItem onClick={() => { isLoggedIn ? handleCloseNavMenu('/home') : handleCloseNavMenu('/login'); }}>
                      <Link to='/login' style={{ textDecoration: 'none' }} key={'login'}>
                        <LoginIcon className='nav-icons'/>
                          Login
                      </Link>
                    </MenuItem>
                }
              </Menu>
            </Grid>
          </Grid>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
