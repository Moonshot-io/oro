import * as React from 'react';
import { Box, Grid, Typography, Paper } from '../styles/material';


export default function ArtistBanner({artistDetails}) {


  return (
    <Paper
      sx={{
        position: 'relative',
        color: '#fff',
        mb: 4,
        ml: 0,
        mr: 0,
        width: '100%',
        height: { xs: '200px', md: '350px' },
        backgroundSize: 'contain',
        backgroundRepeat: 'repeat-x',
        backgroundPosition: 'top',
        backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.80), rgba(44, 50, 142, 0.80)), url(${artistDetails.image})`,
      }}
    >
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