import path from 'path'
import expres from 'express'
import axios from 'axios'
import { Router } from 'express' 

require('dotenv').config();

const eventListingsRouter = Router();

console.log('hello');

eventListingsRouter.get('/list', (req, res) => {
  console.log(req.query)
  // const punctuationless = req.query.keyword
  // .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, " ")
  // .replace(/\s{1,}/g, "+")
  // .toLowerCase();
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => console.log(responseObj))
})


export default eventListingsRouter;