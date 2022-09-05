import * as React from 'react';
import { SelectChangeEvent } from '@mui/material/Select';
import {Box, MenuItem, InputLabel, FormControl, Select} from '../styles/material';

// filter by city
// filter by date
export default function Dropdown({eventList, updateEvents}) {
  const [events, setEvents] = React.useState(eventList);
  const [label, setLabel] = React.useState('city');
  const [age, setAge] = React.useState('');
  const [city, setCity] = React.useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
    updateEvents(city);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={handleChange}
        >
          {events.map((event)=>{
            const city = event.venueInfo[0].city;
            console.log(city);
            return <MenuItem value={city}>{city}</MenuItem>
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
