import React, { useEffect } from 'react';
import {Box, Grid } from '../styles/material';


const Home: React.FC = () => {
  useEffect(() => {
    // getUser();
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid xs={12} md={12} item>
          <img src="/images/concert.jpg" width="50%"/>
        </Grid>
      </Grid>
    </Box>
  );
};


export default Home;
