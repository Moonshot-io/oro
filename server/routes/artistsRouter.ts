import { Router } from 'express';
import axios from 'axios';
const artistsRouter = Router();
import prisma from '../database/db';

// -----------------------GET ARTIST EVENTS
artistsRouter.get('/events', (req, res) => {
  const { keyword } = req.query;
  axios.get(`https://app.ticketmaster.com/discovery/v2/events.json?size=10&keyword=${keyword}&apikey=${process.env.TICKETMASTER_API_KEY}`)
    .then((responseObj) => {

      if (responseObj.data._embedded) {
        res.status(200).send(responseObj.data._embedded);
      }
    })
    .catch(err => console.error(err));
});

// -----------------------GET ID
// GETS artists based on users' id, if user has no favorites, returns all
artistsRouter.get('/:id', (req, res) => {
  const { id } = req.params;

  prisma.artistFollowing.findMany({
    where: {
      users: {
        some: {
          userId: id
        }
      }
    }
  })
    .then((data) => {
      if (!data.length) {
        prisma.artistFollowing.findMany()
          .then((data) => {
            res.status(200).send({allArtists: data, artists: null});
          });
      } else {
        res.status(200).send({allArtists: data, artists: true});
      }
    })
    .catch((err) => {
      console.error(err);
      prisma.artistFollowing.findMany()
        .then((data) => {
          res.status(200).send({allArtists: data, artists: null});
        });
    })
    .catch((err) => {
      res.sendStatus(500);
    });
});

// -----------------------UPDATE
// update whether a user has followed an artist
artistsRouter.put('/update', (req, res) => {
  const { artist, user } = req.body.params;
  if (typeof artist === 'number') {
    prisma.artistFollowing.update({
      where: {
        id: artist,
      },
      data: {
        users: {
          create: {
            user: {
              connect: {
                id: user
              },
            }
          }
        }
      }
    })
      .then((updates) => {
        res.status(200).send(updates);
      })
      .catch((err) => {
        prisma.artistFollowing.update({
          where: {
            id: artist,
          },
          data: {
            users: {
              deleteMany: {
                userId: user
              },
            }
          }
        })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
          });
        console.error(err);
        res.status(500);
      });
  } else {
    prisma.artistFollowing.update({
      where: {
        artistName: artist,
      },
      data: {
        users: {
          create: {
            user: {
              connect: {
                id: user
              },
            }
          }
        }
      }
    })
      .then((updates) => {
        res.status(200).send(updates);
      })
      .catch((err) => {
        prisma.artistFollowing.update({
          where: {
            artistName: artist,
          },
          data: {
            users: {
              deleteMany: {
                userId: user
              },
            }
          }
        })
          .then((data) => {
            res.status(200).send(data);
          })
          .catch((err) => {
            console.error(err);
            res.status(500);
          });
        console.error(err);
        res.status(500);
      });
  }
});

// -----------------------POST
artistsRouter.post('/', (req, res) => {
  const {artistName, userId} = req.body;

  const obj = {
    artistName,
    bio: '',
    ticketId: '',
    youtube: '',
    twitter: '',
    facebook: '',
    instagram: '',
    itunes: '',
    wiki: '',
    homepage: '',
    image: ''
  };
  axios.get(`https://ws.audioscrobbler.com/2.0/?method=artist.getinfo&artist=${artistName}&api_key=${process.env.LASTFM_API_KEY}&format=json`)
    .then((artistData) => {
      if (artistData.data.artist.bio.summary) {
        obj.bio = artistData.data.artist.bio.summary;
      }

      axios.get(`https://app.ticketmaster.com/discovery/v2/attractions.json?apikey=${process.env.TICKETMASTER_API_KEY}&keyword=${artistName}`)
        .then(async (attractionData) => {
          if (attractionData.data._embedded.attractions) {
            const attraction = attractionData.data._embedded.attractions;
            const links = attraction[0].externalLinks;
            obj.ticketId = attraction[0].id;
            obj.youtube = links.youtube ? links.youtube[0].url : `https://www.youtube.com/results?search_query=${artistName}`;
            obj.twitter = links.twitter ? links.twitter[0].url : `https://twitter.com/search?q=${artistName}`;
            obj.facebook = links.facebook ? links.facebook[0].url : `https://www.facebook.com/search/top/?q=${artistName}`;
            obj.instagram = links.instagram ? links.instagram[0].url : `https://www.google.com/search?q=instagram+${artistName}`;
            obj.itunes = links.itunes ? links.itunes[0].url : `https://www.google.com/search?q=spotify+${artistName}`;
            obj.wiki = links.wiki ? links.wiki[0].url : `https://www.google.com/search?q=wikipedia+${artistName}`;
            obj.homepage = links.homepage ? links.homepage[0].url : `https://www.google.com/search?q=${artistName}`;
            obj.image = attraction[0].images[0].url;
          }

          await prisma.artistFollowing.create({
            data: {
              artistName: obj.artistName,
              bio: obj.bio,
              ticketId: obj.ticketId,
              youtube: obj.youtube,
              twitter: obj.twitter,
              facebook: obj.facebook,
              instagram: obj.instagram,
              itunes: obj.itunes,
              wiki: obj.wiki,
              homepage: obj.homepage,
              image: obj.image,
            }
          })
            .then((data) => {
              prisma.artistFollowing.update({
                where: {
                  id: data.id,
                },
                data: {
                  users: {
                    create: {
                      user: {
                        connect: {
                          id: userId
                        },
                      }
                    }
                  }
                }
              })
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((err) => {
                  console.error(err);
                });
            })
            .catch((err)=> {
              console.error(err);
              prisma.artistFollowing.update({
                where: {
                  artistName
                },
                data: {
                  users: {
                    create: {
                      user: {
                        connect: {
                          id: userId
                        },
                      }
                    }
                  }
                }
              })
                .then((data) => {
                  res.status(200).send(data);
                })
                .catch((err) => {
                  console.error(err);
                });
              res.end();
            });
        });
    });
});


export default artistsRouter;
