import * as React from 'react';
import { Box, Grid, Typography, Paper } from '../styles/material';
import { useNavigate } from 'react-router-dom';
export default function ArtistBanner({artistDetails}) {
  const navigate = useNavigate();
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

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        width: '100%',
        height: { xs: '90%', md: '350px' },
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top',
        backgroundImage: `url(${artistDetails.image})`,
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
              position: 'relative',
              mt: { xs: '80%', md: '50%' } ,
              p: { xs: 2, md: 4 },
              pr: { md: 0 },
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
            {/* <Typography variant='h5' color='inherit' paragraph>
              {post.description}
            </Typography> */}
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
