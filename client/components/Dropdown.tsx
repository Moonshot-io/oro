import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {Box, MenuItem, InputLabel, FormControl, Select} from '../styles/material';

// filter by city
// filter by date
export default function Dropdown({eventList, updateEvents}) {
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
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
        //   value={age}
          onChange={handleChange}
        >
         <MenuItem value="all">All</MenuItem>
          {(()=>{
            const cities = {};
            return eventList.map((event)=>{
            const cityName = event.venueInfo[0].city;
            if(!cities[cityName]){
                cities[cityName] = cityName;
                return <MenuItem value={cityName}>{cityName}</MenuItem>
            }
          })})()}
        </Select>
      </FormControl>
    </Box>
  );
}
