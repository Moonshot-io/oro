import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
  Modal,
  Typography,
} from '@mui/material';
import { Box, Stack, styled } from '@mui/system';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Item } from '../styles/material';
import { useTheme } from '@mui/material/styles';
import AcUnitIcon from '@mui/icons-material/AcUnit';

type Location = {
  location_id: string;
  name: string;
  address_obj: {
    state: string;
    country: string;
    address_string: string;
  };
};

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TravelPlanner: React.FC = () => {
  const location = useLocation();
  const [locations, setLocations] = useState<Array<Location>>([]);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState<Location | null>(null);

  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  // <YouTubeIcon key={'youtube'} sx={{ color: iconColors }} />
  // <CardContent sx={{ bgcolor: inverseMode }}></CardContent>
  // <Typography paragraph sx={{ bgcolor: inverseMode }}></Typography>

  const handleOpen = (content: React.SetStateAction<Location | null>) => {
    setModalContent(content);
    setOpen(true);
  };
  const handleClose = () => {
    setModalContent(null);
    setOpen(false);
  };

  const fetchLocations = async () => {
    const { city } = location.state as { city: string };
    const { data } = await axios.get(`/api/travelPlanner/locations/${city}`);
    setLocations(data.data);
  };

  useEffect(() => {
    fetchLocations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Grid spacing={2}>
      {locations.map((loc) => {
        const image = `https://source.unsplash.com/random/?${loc.name}`;
        return (
          <Grid xs={8} key={loc.location_id}>
            <Card
              sx={{
                minWidth: 275,
                ml: 'auto',
                mr: 'auto',
                bgcolor: inverseMode,
              }}
            >
              <CardContent>
                <img src={image} width='80%' object-fit='cover' />
                <Typography variant='h5' component='div'>
                  {loc.name}
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size='small'
                  onClick={() => handleOpen(loc)}
                  sx={{ bgcolor: inverseMode, ml: 'auto', mr: 'auto' }}
                >
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        );
      })}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='Location modal'
        aria-describedby='Modal for viewing a location'
      >
        <Box sx={style}>
          <Typography variant='h3' textAlign={'left'}>
            {' '}
            About
          </Typography>

          <Stack direction={'row'} columnGap={2}>
            <Stack style={{ width: '50%' }} direction={'column'}>
              <Stack direction={'row'} textAlign={'left'}>
                <Typography variant='h3'>4.5</Typography>
                <Stack ml={2}>
                  <b>Excellent</b>
                  <Typography variant='h6' textAlign={'left'}>
                    5.771
                  </Typography>
                </Stack>
              </Stack>
              <Stack>#11 of 154 hotels in Memphis</Stack>
              <Typography variant='h6' textAlign={'left'}>
                Travelers choice
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant='h6' textAlign={'left'}>
                {' '}
                11 of 154 hotels in Memphis 11 of 154 hotels in Memphis
              </Typography>
              <br />
              <Divider />
              <br />
              <Typography variant='h6' textAlign={'left'}>
                sugget edits to impvoe what{' '}
              </Typography>
              <Typography variant='h6' textAlign={'left'}>
                {' '}
                <b>
                  <u>Improve the listing</u>
                </b>{' '}
              </Typography>
            </Stack>

            <Stack style={{ width: '50%' }} direction={'column'}>
              <Typography variant='h6' textAlign={'left'}>
                <b>Property amenties</b>
              </Typography>
              <Stack mb={3} direction={'row'} columnGap={3}>
                <Stack direction={'column'}>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                </Stack>
                <Stack direction={'column'}>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                  <Typography>
                    <AcUnitIcon fontSize='small' /> Valet pargking{' '}
                  </Typography>
                </Stack>
              </Stack>
              <Typography variant='h6'>
                <b>show more </b>
              </Typography>
              <br />
              <Typography mb={3} variant='h6' textAlign={'left'}>
                <b>Room features</b>
              </Typography>
              <Stack direction={'row'} columnGap={3}>
                <Stack direction={'column'}>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                </Stack>
                <Stack direction={'column'}>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <br />

              <Typography mb={3} variant='h6' textAlign={'left'}>
                <b>Room features</b>
              </Typography>
              <br />
              <Stack direction={'row'} columnGap={3}>
                <Stack direction={'column'}>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                </Stack>
                <Stack direction={'column'}>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                  <Stack direction={'row'}>
                    <AcUnitIcon fontSize='small' />{' '}
                    <Typography ml={3}>Valet pargking</Typography>
                  </Stack>
                </Stack>
              </Stack>
              <Typography variant='h6' textAlign={'left'}>
                <b>show more </b>
              </Typography>
              <br />
            </Stack>
          </Stack>
          <Typography id='location-modal-title' variant='h6' component='h2'>
            {modalContent?.name}
          </Typography>
        </Box>
      </Modal>
    </Grid>
  );
};

export default TravelPlanner;
