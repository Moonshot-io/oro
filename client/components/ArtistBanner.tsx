import * as React from 'react';
import { Box, Grid, Typography, Paper, UseTheme, IconButton, YouTubeIcon,	TwitterIcon,	MusicNoteIcon,	FacebookIcon,	QuizIcon,	InstagramIcon,	LanguageIcon, Styled, Link  } from '../styles/material';


export default function ArtistBanner({artistDetails}) {
    const theme = UseTheme();
    const iconColors = theme.palette.secondary.contrastText;
    const inverseMode = theme.palette.secondary.main;

  const {
    artistName,
    bio,
    facebook,
    homepage,
    image,
    instagram,
    itunes,
    twitter,
    wiki,
    youtube } = artistDetails;

    const socials = {
        youtube: [youtube, <YouTubeIcon key={'youtube'} sx={{ color: '#FFFFFF' }} />],
        twitter: [twitter, <TwitterIcon key={'twitter'} sx={{ color: '#FFFFFF' }}/>],
        facebook: [facebook, <FacebookIcon key={'fb'} sx={{ color: '#FFFFFF' }}/>],
        instagram: [instagram, <InstagramIcon key={'insta'} sx={{ color: '#FFFFFF' }}/>],
        homepage: [homepage, <LanguageIcon key={'homepage'} sx={{ color: '#FFFFFF' }}/>],
        itunes: [itunes, <MusicNoteIcon key={'music'} sx={{ color: '#FFFFFF' }}/>],
        wiki: [wiki, <QuizIcon key={'wiki'} sx={{ color: '#FFFFFF' }}/>],
      };

  return (
    <Paper
      sx={{
        position: 'relative',
        color: '#fff',
        mb: 4,
        width: '100%',
        height: { xs: '200px', md: '350px' },
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'top',
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.80), rgba(44, 50, 142, 0.80)), url(${artistDetails.image})`,
      }}
    >
      {/* Increase the priority of the hero background image */}
      {<img style={{ display: 'none' }} src={artistDetails.image} />}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
                marginLeft: '25px',
                top: { xs: '125px', md: '250px' },
                right: 'auto',
                bottom: 'auto',
                left: 'inherit',
                position: 'absolute'
            }}
          >
            <Typography
              component='h1'
              variant='h3'
              color='inherit'
              gutterBottom
            >
              {artistDetails.artistName}
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}


<Box
sx={{
    marginLeft: 'auto',
    top: { xs: '125px', md: '250px' },
    right: '25px',
    bottom: 'auto',
    left: 'inherit',
    position: 'absolute'
}}
>
{/* <Typography
  variant='h3'
  gutterBottom
  >
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={1}>
          {Object.keys(socials).map((social: string, index) => {
            return (
              <Grid item key={`social${index}`}>
                <IconButton>
                  <Link href={socials[social][0]} sx={{color: '#ffffff'}}>{socials[social][1]}</Link>
                </IconButton>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Typography>
</Box> */}