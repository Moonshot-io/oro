import React, { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import PushPinIcon from '@mui/icons-material/PushPin';
import axios from 'axios';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCardDetails = ({events, event}) => {

  useEffect(() => {
    console.log('EVENTs', events, 'EVENT', event)
  }, []);

  return (
    <div>
    <Paper
    sx={{
      p: 2,
      margin: 'auto',
      maxWidth: 500,
      flexGrow: 1,
      backgroundColor: (theme) =>
        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
      }}
      >

      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase sx={{ width: 128, height: 128 }}>
            <Img alt="alt tag" src={event.artistInfo[0].artistImages[Math.floor(Math.random()*(event.artistInfo[0].artistImages.length))].url} />
          </ButtonBase>
        </Grid>
        <Grid item xs={12} sm container>
          <Grid item xs container direction="column" spacing={2}>
            <Grid item xs>
              <Typography variant="body2" gutterBottom>
                {event.artistInfo.map(artist => (
                  <div>
                  {artist.artistName}
                  </div>
                ))}
                {event.eventName}<br/>
                {event.eventDate}<br/>
                {event.venueInfo.map(venue => (
                  <div>
                    {Object.values(venue.address)}<br/>
                    {venue.city}, {venue.state} {venue.postalCode}
                  </div>
                ))
                }<br/>
                {event.venueInfo.city}, {event.venueInfo.state}<br/>
              </Typography>
            </Grid>
          </Grid>
          <Grid item>
            <PushPinIcon/>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </div>
  );
};

export default EventCardDetails;
