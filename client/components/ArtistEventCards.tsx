import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import moment from 'moment';

import {
  Grid,
  Paper,
  Typography,
  ButtonBase,
  LocalActivityIcon,
  CalendarMonthIcon,
  InfoIcon,
  DescriptionIcon,
  Button,
  UseTheme,
  Link
} from '../styles/material';

const Img = styled('img')({
  margin: 'auto',
  display: 'block',
  maxWidth: '100%',
  maxHeight: '100%',
});

const EventCards = ({ events }) => {
  const theme = UseTheme();
  const navigate = useNavigate();
  let date = events.dates.start.dateTime;
  date = moment(date).add(1, 'day').format('MMMM Do YYYY');
  const image = events.images[0].url;
  const id = events.id;
  const { name, url, info } = events;

  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const getDetails = (id:string) => {
    navigate(`/details/?id=${id}`);
  };

  return (
    <Paper
      sx={{
        p: 2,
        marginTop: 1,
        maxWidth: 500,
        flexGrow: 1,
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.main,
        textAlign: 'left',
      }}
    >
      <Grid container spacing={2}>
        <Grid item>
          <ButtonBase
            onClick={() => {
              getDetails(id);
            }}
          >
            <InfoIcon /> More details
          </ButtonBase>
        </Grid>
        <Grid item xs={12} container>
          <Grid item container direction='column' spacing={2}>
            <Grid item>
              <Img alt='alt tag' src={image} />
            </Grid>
            <Grid item>
              <Typography variant='h6' paragraph>{name}</Typography>
            </Grid>
            <Grid item>
              <CalendarMonthIcon sx={{ color: theme.palette.primary.contrastText,mr:"5px" }}/>
              {date}
            </Grid>
            {info ? (
              <Grid item>
                <DescriptionIcon sx={{ color: theme.palette.primary.contrastText, mr:"5px" }}/>
                {info}
              </Grid>
            ) : (
              <Grid item>
                <DescriptionIcon sx={{ color: theme.palette.primary.contrastText, mr:"5px" }}/> No event details
              </Grid>
            )}
            <Grid item>
              <Link href={url} style={{ textDecoration: 'none' }}>
            <Button variant='contained' sx={{ bgColor: inverseMode }}><LocalActivityIcon sx={{ color: inverseMode, mr:"5px"}} /> Buy Tickets</Button>
            </Link>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default EventCards;