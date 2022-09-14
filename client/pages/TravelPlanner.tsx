import { ColorButton, Card, CardActions, CardContent, CircularProgress, Divider, Grid, Modal, Typography, Box, Stack, UseTheme } from '../styles/material';
import axios from 'axios';
import React, { useState, useEffect, useCallback, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { CircleRounded } from '@mui/icons-material';
import { wrap } from 'module';

interface Hotel {
  location_id: string;
  name: string;
  address_obj: {
    state: string;
    country: string;
    address_string: string;
    postalcode?: string;
  };
}

type HotelDetails = Partial<HotelDetailsResponse>;

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '80%',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const TravelPlanner: React.FC = () => {
  const [hotels, setHotels] = useState<Array<Hotel>>([]);
  const [open, setOpen] = useState(false);
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);

  const { eventDetails } = useContext(EventContext);
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;

  const fetchLocations = useCallback(async () => {
    const city = eventDetails?.venues.city.name;
    const state = eventDetails?.venues.state.name;
    if (city && state) {
      const { data } = await axios.get(
        `/api/travelPlanner/hotels?state=${state}&city=${city}`
      );
      setHotels(data.data);
    }
  }, [eventDetails]);

  useEffect(() => {
    fetchLocations();
  }, [fetchLocations]);

  const handleOpen = async (hotel: Hotel | null) => {
    if (hotel?.location_id) {
      setOpen(true);
      const { data } = await axios.get(
        `/api/travelPlanner/hotels/${hotel.location_id}`
      );
      setHotelDetails(data);
    }
  };
  const handleClose = () => {
    setHotelDetails(null);
    setOpen(false);
  };

  const rating = Number(hotelDetails?.rating);

  return (
    <div className='page-body'>
      <Typography variant='h2'>Search for Hotels</Typography>
      <br />
      <Box>
        <Grid
          container
          style={{ gap: 10, maxHeight: '50vh', maxWidth: '100vh' }}
        >
          {hotels
            .filter((hotel) => !!hotel.address_obj.postalcode)
            .map((hotel) => {
              const image = `https://source.unsplash.com/random/?${hotel.name}`;
              return (
                <Grid xs={12} key={hotel.location_id}>
                  <Card
                    sx={{
                      ml: 'auto',
                      mr: 'auto',
                      bgcolor: inverseMode,
                    }}
                  >
                    <CardContent>
                      <img src={image} width='80%' object-fit='cover' />
                      <Typography variant='h5' component='div'>
                        {hotel.name}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button
                        size='small'
                        onClick={() => handleOpen(hotel)}
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
              {hotelDetails ? (
                <>
                  <Typography variant='h3' textAlign={'left'}>
                    {hotelDetails.name}
                  </Typography>
                  <br />
                  <Divider />
                  <br />
                  <Stack
                    direction={'row'}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                    }}
                    columnGap={2}
                  >
                    <Stack direction={'column'}>
                      <Stack direction={'row'} textAlign={'left'}>
                        <Typography variant='h3'>{rating || ''}</Typography>
                        <Stack ml={2}>
                          <b>
                            {rating < 2
                              ? 'Poor'
                              : rating < 3
                              ? 'Fair'
                              : rating < 4
                              ? 'Good'
                              : rating < 5
                              ? 'Excellent'
                              : ''}
                          </b>
                          <Typography variant='h6' textAlign={'left'}>
                            {hotelDetails.num_reviews} reviews
                          </Typography>
                        </Stack>
                      </Stack>
                      <Stack>{hotelDetails.ranking_data?.ranking_string}</Stack>
                      {hotelDetails.awards?.map((award) => {
                        return (
                          <Typography variant='h6' textAlign={'left'}>
                            <img src={award.images.small} />{' '}
                            {award.display_name}
                          </Typography>
                        );
                      })}
                      <br />
                      <Divider />
                      <br />
                      <p>{hotelDetails.description}</p>
                      <br />
                      <Divider />
                      <br />
                      <Typography textAlign={'left'}>
                        <a
                          href={hotelDetails.web_url}
                          rel='noreferrer nofollow'
                          target='_blank'
                          style={{ color: '#fff' }}
                        >
                          Click here for more information on TripAdvisor
                        </a>
                      </Typography>
                    </Stack>

                    <Stack direction={'column'}>
                      <Typography variant='h5' textAlign={'left'}>
                        <b>Property Amenities</b>
                      </Typography>
                      <div style={{ display: 'flex', flexFlow: 'row wrap' }}>
                        {hotelDetails.amenities?.slice(0, 10).map((amenity) => {
                          return (
                            <div style={{ textAlign: 'left', width: '50%' }}>
                              - {amenity}
                            </div>
                          );
                        })}
                      </div>
                      {Number(hotelDetails.amenities?.length) > 10 && (
                        <Typography variant='h6' textAlign={'left'}>
                          And {Number(hotelDetails.amenities?.length) - 10}{' '}
                          more...
                        </Typography>
                      )}
                    </Stack>
                    <br />
                  </Stack>
                </>
              ) : (
                <CircularProgress />
              )}
            </Box>
          </Modal>
        </Grid>
      </Box>
    </div>
  );
};

export default TravelPlanner;

interface Subrating {
  name: string;
  localized_name: string;
  rating_image_url: string;
  value: string;
}

interface HotelDetailsResponse {
  location_id: string;
  name: string;
  description: string;
  web_url: string;
  address_obj: {
    street1: string;
    street2?: string;
    city: string;
    state: string;
    country: string;
    postalcode: string;
    address_string: string;
  };
  ancestors: [
    {
      level: string;
      name: string;
      location_id: string;
    },
    {
      abbrv: string;
      level: string;
      name: string;
      location_id: string;
    },
    {
      level: string;
      name: string;
      location_id: string;
    }
  ];
  latitude: string;
  longitude: string;
  timezone: string;
  phone: string;
  write_review: string;
  ranking_data: {
    geo_location_id: string;
    ranking_string: string;
    geo_location_name: string;
    ranking_out_of: string;
    ranking: string;
  };
  rating: string;
  rating_image_url: string;
  num_reviews: string;
  review_rating_count: {
    '1': string;
    '2': string;
    '3': string;
    '4': string;
    '5': string;
  };
  subratings: {
    '0': Subrating;
    '1': Subrating;
    '2': Subrating;
    '3': Subrating;
    '4': Subrating;
    '5': Subrating;
  };
  photo_count: string;
  see_all_photos: string;
  price_level: string;
  amenities: string[];
  parent_brand: string;
  brand: string;
  category: {
    name: string;
    localized_name: string;
  };
  subcategory: {
    name: string;
    localized_name: string;
  }[];
  styles: string[];
  neighborhood_info: {
    location_id: string;
    name: string;
  }[];
  trip_types: {
    name: string;
    localized_name: string;
    value: string;
  }[];
  awards: {
    award_type: string;
    year: string;
    images: {
      small: string;
      large: string;
    };
    categories: string[];
    display_name: string;
  }[];
}
