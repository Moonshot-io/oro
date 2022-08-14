import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

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
