import * as React from 'react';
import React, { useState, useEffect, useContext } from 'react';
import {Box, Grid, Item} from '../styles/material';
import { UserContext } from '../context/UserContext';


const Home: React.FC = () => {

  const userContext = useContext(UserContext);
  const {value} = userContext;

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
}


export default Home;
