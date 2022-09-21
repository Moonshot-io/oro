import React, {useState} from 'react';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import {
  Grid,
  Paper,
  Typography,
  LocalActivityIcon,
  CalendarMonthIcon,
  DescriptionIcon,
  UseTheme,
  Link,
  ColorButton,
} from '../styles/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const EventCards = ({ events }) => {
  const theme = UseTheme();
  let date = events.dates.start.dateTime;
  date = moment(date).add(1, 'day').format('MMMM Do YYYY');
  const image = events.images[0].url;
  const { name, url, info } = events;

  return (
    <Paper
      sx={{
        p: 2,
        marginTop: 1,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.secondary.contrastText,
        textAlign: 'left',
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} container>
          <Grid item container direction='column' spacing={2}>
            <Grid item>
              <Img alt='alt tag' src={image} />
            </Grid>

            <Grid item>
              <Typography variant='h6' paragraph>
                {name}
              </Typography>
            </Grid>

            <Grid item>
              <CalendarMonthIcon
                sx={{ color: theme.palette.primary.contrastText, mr: '5px' }}
              />
              {date}
            </Grid>

            {info ? (
              <Grid item>
                <DescriptionIcon
                  sx={{ color: theme.palette.primary.contrastText, mr: '5px' }}
                />
                {info}
              </Grid>
            ) : (
              <Grid item>
                <DescriptionIcon
                  sx={{ color: theme.palette.primary.contrastText, mr: '5px' }}
                />{' '}
                No event details
              </Grid>
            )}

            <Grid item>
              <Grid item xs={12} sm={6}>
                <Link href={url} style={{ textDecoration: 'none' }}>
                  <ColorButton variant='contained'>
                    <LocalActivityIcon
                      className='icon-buttons'
                      sx={{ mr: '5px' }}
                    />{' '}
                    Tickets
                  </ColorButton>
                </Link>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventCards;
