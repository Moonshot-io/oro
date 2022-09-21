import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {Box, MenuItem, InputLabel, FormControl, Select, UseTheme} from '../styles/material';

export default function Dropdown({eventList, updateEvents}) {
  const theme = UseTheme();
  const themeBGColor = theme.palette.primary.main;

  const [events, setEvents] = React.useState([...eventList]);
  const [label, setLabel] = React.useState('city');
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    const newCity = event.target.value;
    updateEvents(newCity);
  };

  React.useEffect(()=>{
  }, [events]);

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth size='small'>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          onChange={handleChange}
        >
         <MenuItem value="all">All</MenuItem>
          {(()=>{
            const cities = {};
            return eventList.map((event)=>{

              if(event.venueInfo){
                const cityName = event.venueInfo[0].city;
                if(!cities[cityName]){
                    cities[cityName] = cityName;
                    return <MenuItem value={cityName}>{cityName}</MenuItem>
                }
              } else {
                const cityName = event.city;
                if(!cities[cityName]){
                    cities[cityName] = cityName;
                    return <MenuItem value={cityName}>{cityName}</MenuItem>
                }
              }
          })})()}
        </Select>
      </FormControl>
    </Box>
  );
}
