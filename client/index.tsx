import React from 'react';
import App from './components/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { UserContextProvider } from './context/UserContext';
import { ArtistContextProvider } from './context/ArtistContext';
import { Box, Grid, Paper, Container } from './styles/material';
import { styled } from '@mui/material/styles';
import { EventContext, EventContextProvider } from './context/EventContext';
const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Failed to find the root element');
}
const root = createRoot(rootElement);

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

root.render(
  <Box>
    <Grid container>
      <Grid item xs={12} md={12}>
        <Item>
          {/* <EventContextProvider>
            <UserContextProvider>
              <ArtistContextProvider> */}
          <BrowserRouter>
            <Routes>
              <Route path='*' element={<App />} />
            </Routes>
          </BrowserRouter>
          {/* </ArtistContextProvider>
            </UserContextProvider>
          </EventContextProvider> */}
        </Item>
      </Grid>
    </Grid>
  </Box>
);
