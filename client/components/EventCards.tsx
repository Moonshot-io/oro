import React, { useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';
import PushPinIcon from '@mui/icons-material/PushPin';
import axios from 'axios';
import EventCardDetails from '../components/EventCardDetails';


const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});


const EventCards = ({setEvents, events, keyword}) => {

  return (
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
        <div>
          {
            events.map((event) => (
              <EventCardDetails
                events={events}
                setEvents={setEvents}
                keyword={keyword}
                event={event}
                key={keyword}

              />
            ))
          }
        </div>

      </Grid>
    </Paper>
  );
};

export default EventCards;
