import React, { useState, useEffect } from 'react';
import Comments from '../components/Comments';
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid, Fab} from '@mui/material';

const EventFeed: React.FC = () => {
  let dummyData = [
    {
      userId: 1,
      photoUrl: 'https://cdn.britannica.com/92/100692-050-5B69B59B/Mallard.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-15'
    },
    {
      userId: 2,
      photoUrl: 'https://www.thespruce.com/thmb/t13CIs9CH0HfuggdQ-DU9zk_QHo=/3780x2126/smart/filters:no_upscale()/do-ducks-have-teeth-4153828-hero-9614a7e9f4a049b48e8a35a9296c562c.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-14'
    },
    {
      userId: 1,
      photoUrl: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/how-to-keep-ducks-call-ducks-1615457181.jpg',
      eventApiID: 'test',
      createdAt: '2022-08-13'
    },
  ];

  return (
    <div>
      <div>Hello EventFeed</div>
      {dummyData.map((photo, i) => {
        return (
          <div key={i}>
            {photo.userId}
            <span>
              <img width='200px' height='auto' src={photo.photoUrl}/>
            </span>
            <div>
              <Comments/>
            </div>

          </div>
        );
      })}

    </div>
  );
};

export default EventFeed;


{/* <Grid container>
<Grid item xs={0} md={5}/>
<Grid item xs={1}>
  <div>
    {photo.userId}
  </div>
</Grid>

<Grid item xs={11} md={1}>
  <div>
    <img width='200px' height='auto' src={photo.photoUrl}/>
  </div>
  <div style={{textAlign: 'right'}} >see all comments</div>

</Grid>
<Grid item xs={0} md={5}/>
</Grid> */}