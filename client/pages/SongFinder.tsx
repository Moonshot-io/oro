import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {Star, Person, MusicNote, LibraryMusic, Lyrics, RemoveCircleOutlineIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, ExpandMoreIcon, UseTheme, Button, Grid, Fab } from '../styles/material'
const MicRecorder = require('mic-recorder-to-mp3');

window.oncontextmenu = function (event: any) {

  const pointerEvent = event as PointerEvent;

  if (pointerEvent.pointerType === 'touch') {
    return false;
  }

  if (pointerEvent.pointerType === 'mouse') {

    return true;
  }

  return true;
};

const Mp3Recorder = new MicRecorder({ bitRate: 128});

const SongFinder: React.FC = () => {
  const theme = UseTheme();
  const iconColors = theme.palette.secondary.contrastText;
  const inverseMode = theme.palette.secondary.main;
  const userContext = useContext(UserContext);
  const {currentUserInfo} = userContext;

  const [isBlocked, setIsBlocked] = useState<boolean>(false);
  const [previewSource, setPreviewSource] = useState<string | ArrayBuffer | null>('');
  const [song, setSong] = useState<string>('');
  const [artist, setArtist] = useState<string>('');
  const [albumTitle, setAlbumTitle] = useState<string>('');
  const [albumImage, setAlbumImage] = useState<string>('');
  const [favorited, setFavorited] = useState<boolean>(false);
  const [lyrics, setLyrics] = useState<Array<string>>([]);
  const [recording, setRecording] = useState<boolean>(false);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true},
      () => {
        setIsBlocked(true);
      },
      () => {
        setIsBlocked(false);
      });
  }, []);



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
          <Button sx={{ bgcolor: iconColors }} variant='contained' size='small' onClick={removeFavorites}>{<RemoveCircleOutlineIcon></RemoveCircleOutlineIcon>} remove from favorites</Button>
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
    <div className="page-body">
      <Typography
    variant="h2">SongFinder</Typography>

      <div>
        <Grid container>
          <Grid item xs = {0} md = {4}></Grid>
          <Grid item xs ={12} md = {4}>
            <MuiAccordion sx={{ bgcolor: iconColors }} expanded={true} >
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }}>{<MusicNote></MusicNote>} Song Name
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode}}>
                {song}
              </MuiAccordionDetails>
            </MuiAccordion>

            <MuiAccordion sx={{ bgcolor: iconColors }}>
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Person></Person>} Artist
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                <div>
                  <div id='artistName'>
                    {artist}
                  </div>

                  <div id='favoriteButton'>
                    {favoriteButton()}
                  </div>
                </div>
              </MuiAccordionDetails>
            </MuiAccordion>

            <MuiAccordion sx={{ bgcolor: iconColors }}>
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Lyrics></Lyrics>} Lyrics
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                <div id='lyrics'>
                  {getLyrics()}
                </div>
              </MuiAccordionDetails>
            </MuiAccordion>

            <MuiAccordion sx={{ bgcolor: iconColors }}>
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<LibraryMusic></LibraryMusic>} Album
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                <div>
                  {albumTitle}
                </div>
                <img height='100px' width='auto' src={albumImage}/>
              </MuiAccordionDetails>
            </MuiAccordion>
          </Grid>
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
