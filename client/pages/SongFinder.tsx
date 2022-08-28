import React, { useState, useEffect, useContext } from 'react';
const MicRecorder = require('mic-recorder-to-mp3');
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Button, Grid, Fab} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Star, Person, MusicNote, LibraryMusic, Lyrics, RemoveCircleOutline} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { UserContext } from '../context/UserContext';

window.oncontextmenu = function (event: any) {
  // eslint-disable-next-line no-console

  const pointerEvent = event as PointerEvent;
  // eslint-disable-next-line no-console

  if (pointerEvent.pointerType === 'touch') {
    // context menu was triggerd by long press
    return false;
  }

  // just to show that pointerEvent.pointerType has another value 'mouse' aka right click
  if (pointerEvent.pointerType === 'mouse') {
    // context menu was triggered by right click
    return true;
  }

  // returning true will show a context menu for other cases
  return true;
};

const Mp3Recorder = new MicRecorder({ bitRate: 128});

const SongFinder: React.FC = () => {
  const theme = useTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  // const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
  const [song, setSong] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  // const [artistImage, setArtistImage] = useState('');
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [albumImage, setAlbumImage] = useState<string>('');
  const [favorited, setFavorited] = useState<boolean>(false);
  const [lyrics, setLyrics] = useState<Array<string>>([]);
  const [recording, setRecording] = useState<boolean>(false);
  // const [deleteToken, setDeleteToken] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true},
      () => {
        setIsBlocked(true);
      },
      () => {
        setIsBlocked(false);
      });
  }, []);


  // useEffect(() => {
  //   if (artist) {
  //     axios.get(`/api/favArtists/${currentUserInfo?.id}`)
  //       .then((results) => {
  //         results.data.allArtists.forEach((artistObj) => {
  //           if (artistObj.artistName === artist) {
  //             setFavorited(true);
  //           }
  //         });
  //       })
  //       .catch((err) => console.error(err));

  //   }
  // }, [artist]);

  useEffect(() => {
    if (artist) {
      axios.get(`/api/favArtists/${currentUserInfo?.id}`)
        .then((results) => {
          results.data.allArtists.forEach((artistObj) => {
            if (artistObj.artistName === artist) {
              setFavorited(true);
            }
          });
        })
        .catch((err) => console.error(err));

    }
  }, [artist]);

  useEffect(() => {
    if (previewSource) {
      axios.post('/api/songs', {
        data: previewSource,
      })
        .then((results) => {
          setLyrics(results.data.lyrics.lyrics.split('\n'));
          setSong(results.data.title);
          setArtist(results.data.apple_music.artistName);
          setAlbumTitle(results.data.apple_music.albumName);
          setAlbumImage(results.data.spotify.album.images[0].url);
        })
        .catch((err) => console.error(err));

    }

  }, [previewSource]);

  const start = (): void => {
    setRecording(true);
    if (isBlocked) {
      console.log('permission denied');
    } else {
      Mp3Recorder.start()
        .then(() => setTimeout(stop, 5000))
        .catch((e) => console.error(e));
    }
  };

  const stop = (): void => {
    setRecording(false);
    Mp3Recorder.stop().getMp3()
      .then(([buffer, blob]) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          setPreviewSource(reader.result);

        };
        // setSong('');
        setArtist('');
        setAlbumTitle('');
        setAlbumImage('');
        setLyrics([]);
        setFavorited(false);
      })
      .catch((e) => console.error(e));
  };

  const getLyrics = () => {
    if (lyrics && Array.isArray(lyrics)) {
      return lyrics.map((line, index) => {
        return (
          <div key={index + 1}>
            {line + '\n'}
          </div>
        );
      });
    } else {
      return null;
    }
  };

  const addToFavorites = (): void => {
    axios.post('/api/favArtists', {
      artistName: artist,
      userId: currentUserInfo?.id
    })
      .then(() => {
        setFavorited(true);
      })
      .catch((err) => console.error(err));
  };

  const removeFavorites = (): void => {
    axios.put('/api/favArtists/update', {
      params: {
        artist: artist,
        user: currentUserInfo?.id
      }
    })
      .then(() => {
        setFavorited(false);
      })
      .catch((err) => console.error(err));
  };

  const favoriteButton = () => {
    if (artist && favorited === true) {
      return (
        <div>
          <Button sx={{ bgcolor: iconColors }} variant='contained' size='small' onClick={removeFavorites}>{<RemoveCircleOutline></RemoveCircleOutline>} remove from favorites</Button>
        </div>
      );
    } else if (artist && favorited === false) {
      return (
        <div>
          <Button sx={{ bgcolor: iconColors }} variant='contained' size='small' onClick={addToFavorites}>{<Star></Star>} add to favorites</Button>
        </div>
      );
    }
  };




  return (
    <div>
      <h1>SongFinder</h1>

      <div>
        <Grid container>
          <Grid item xs = {0} md = {4} sx={{ bgcolor: iconColors }}></Grid>
          <Grid item xs ={12} md = {4}>
            <Accordion sx={{ bgcolor: iconColors }} expanded={true} >
              <AccordionSummary sx={{ bgcolor: inverseMode }}>{<MusicNote></MusicNote>} Song Name
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: inverseMode }}>
                {song}
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: iconColors }}>
              <AccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon sx={{ bgcolor: iconColors }}/>}>{<Person></Person>} Artist
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: inverseMode }}>
                <div>
                  <div id='artistName'>
                    {artist}
                  </div>

                  <div id='favoriteButton'>
                    {favoriteButton()}
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: iconColors }}>
              <AccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon sx={{ bgcolor: iconColors }}/>}>{<Lyrics></Lyrics>} Lyrics
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: inverseMode }}>
                <div id='lyrics'>
                  {getLyrics()}
                </div>
              </AccordionDetails>
            </Accordion>

            <Accordion sx={{ bgcolor: iconColors }}>
              <AccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon sx={{ bgcolor: iconColors }}/>}>{<LibraryMusic></LibraryMusic>} Album
              </AccordionSummary>
              <AccordionDetails sx={{ bgcolor: inverseMode }}>
                <div>
                  {albumTitle}
                </div>
                <img height='100px' width='auto' src={albumImage}/>
              </AccordionDetails>
            </Accordion>
          </Grid>
          {/* <Grid item xs = {4}></Grid> */}
        </Grid>
      </div>
      <div>
        {recording && 'Audio is recording, please wait'}
      </div>
      {!recording && 'click to start recording'}
      {recording &&
        <Fab sx={{ bgcolor: inverseMode }} variant='circular'>
          <img height='40px' width='auto' src='https://northshorecenter.org/nscpa_2020/wp-content/plugins/dkddi-events-addon/images/balls.gif'/>
        </Fab>}

      <div style={{marginTop: '10px'}}>
        {!recording && <Fab sx={{ bgcolor: inverseMode }} variant='circular' onClick={start}><MusicNote sx={{ color: iconColors }}></MusicNote></Fab>}
      </div>
    </div>
  );
};

export default SongFinder;
