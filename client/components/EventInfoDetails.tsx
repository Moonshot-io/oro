import * as React from 'react';
import {Divider, Typography, Grid } from '../styles/material';

interface MainProps {
  description: string;
  title: string;
}

export const Main = (props: MainProps) => {
  const { description, title } = props;

  return (
    <Grid item xs={12} md={8}>
      <Typography variant='h6' gutterBottom>
        {title}
      </Typography>
      <Divider />
      <Typography>{description}</Typography>
    </Grid>
  );
};
