import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../context/UserContext';
import {Star, Person, MusicNote, LibraryMusic, Lyrics, RemoveCircleOutlineIcon, MuiAccordion, MuiAccordionSummary, MuiAccordionDetails, Typography, ExpandMoreIcon, UseTheme, Button, Grid, Fab, ColorButton } from '../styles/material'
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
  const mainBg = theme.palette.primary.main;
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
  const [demoClicked, setDemoClicked] = useState<boolean>(false);

  const demoSong = {
    songName: 'Rolling in the Deep',
    Artist: 'Adele',
    Lyrics: `[Verse 1]
    There's a fire starting in my heart
    Reaching a fever pitch, and it's bringing me out the dark
    Finally, I can see you crystal clear
    Go ahead and sell me out, and then I'll lay your shit bare
    See how I'll leave with every piece of you
    Don't underestimate the things that I will do
    There's a fire starting in my heart
    Reaching a fever pitch, and it's bringing me out the dark
    [Pre-Chorus]
    The scars of your love remind me of us
    They keep me thinkin' that we almost had it all
    The scars of your love, they leave me breathless
    I can't help feeling
    [Chorus]
    We could have had it all
    (You're gonna wish you – never had met me)
    Rolling in the deep
    (Tears are gonna fall, rolling in the deep)
    You had my heart inside of your hand
    (You're gonna wish you – never had met me)
    And you played it to the beat
    (Tears are gonna fall, rolling in the deep)
    [Verse 2]
    Baby, I have no story to be told
    But I've heard one on you, now I'm gonna make your head burn
    Think of me in the depths of your despair
    Make a home down there, as mine sure won't be shared
    [Pre-Chorus]
    (You're gonna wish you – never had met me)
    The scars of your love remind me of us
    (Tears are gonna fall, rolling in the deep)
    They keep me thinkin' that we almost had it all
    (You're gonna wish you – never had met me)
    The scars of your love, they leave me breathless
    (Tears are gonna fall, rolling in the deep)
    I can't help feeling
    [Chorus]
    We could have had it all
    (You're gonna wish you – never had met me)
    Rolling in the deep
    (Tears are gonna fall, rolling in the deep)
    You had my heart inside of your hand
    (You're gonna wish you – never had met me)
    And you played it to the beat
    (Tears are gonna fall, rolling in the deep)
    Could have had it all
    Rolling in the deep
    You had my heart inside of your hand
    But you played it with a beating
    [Verse 3]
    Throw your soul through every open door (oh-oh)
    Count your blessings to find what you look for (whoa-oh)
    Turn my sorrow into treasured gold (oh-oh)
    You'll pay me back in kind and reap just what you sow
    [Breakdown]
    (You're gonna wish you – never had met me)
    We could have had it all
    (Tears are gonna fall, rolling in the deep)
    We could have had it all
    (You're gonna wish you – never had met me)
    It all, it all, it all
    (Tears are gonna fall, rolling in the deep)
    [Chorus]
    We could have had it all
    (You're gonna wish you – never had met me)
    Rolling in the deep
    (Tears are gonna fall, rolling in the deep)
    You had my heart inside of your hand
    (You're gonna wish you – never had met me)
    And you played it to the beat
    (Tears are gonna fall, rolling in the deep)
    We could have had it all
    (You're gonna wish you – never had met me)
    Rolling in the deep
    (Tears are gonna fall, rolling in the deep)
    You had my heart inside of your hand
    (You're gonna wish you – never had met me)
    But you played it, you played it, you played it
    You played it to the beat`,
    albumName: '21',
    albumImage: 'https://i.scdn.co/image/ab67616d0000b273fb7eedd9877b0c60597ef3e5'
  }

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true},
      () => {
        setIsBlocked(true);
      },
      () => {
        setIsBlocked(false);
      });
  }, []);

  const handleDemo = () => {
    setDemoClicked(true);
  }



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
          <ColorButton sx={{ mt: '10px' }} variant='contained' size='small' onClick={addToFavorites}>{<Star></Star>} add to favorites</ColorButton>
        </div>
      );
    }
  };


  if(demoClicked){
    return (
      <div className="page-body">
        <Typography
      variant="h2">SongFinder</Typography>

        <div>
          <Grid container>
            <Grid item xs = {0} md = {4}></Grid>
            <Grid item xs ={12} md = {4}>
              <MuiAccordion sx={{ bgcolor: iconColors }} expanded={true} >
                <MuiAccordionSummary sx={{ bgcolor: inverseMode }}>{<MusicNote className='icon-margin'></MusicNote>} Song Name
                </MuiAccordionSummary>
                <MuiAccordionDetails sx={{ bgcolor: inverseMode}}>
                  {demoSong.songName}
                </MuiAccordionDetails>
              </MuiAccordion>

              <MuiAccordion sx={{ bgcolor: iconColors }}>
                <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Person className='icon-margin'></Person>} Artist
                </MuiAccordionSummary>
                <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                  <div>
                    <div id='artistName'>
                      {demoSong.Artist}
                    </div>

                    <div id='favoriteButton'>
                    <div>
          <ColorButton sx={{ mt: '10px' }} variant='contained' size='small' onClick={addToFavorites}>{<Star></Star>} add to favorites</ColorButton>
        </div>
                    </div>
                  </div>
                </MuiAccordionDetails>
              </MuiAccordion>

              <MuiAccordion sx={{ bgcolor: iconColors }}>
                <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Lyrics className='icon-margin'></Lyrics>} Lyrics
                </MuiAccordionSummary>
                <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                  <div id='lyrics'>
                    {demoSong.Lyrics}
                  </div>
                </MuiAccordionDetails>
              </MuiAccordion>

              <MuiAccordion sx={{ bgcolor: iconColors }}>
                <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<LibraryMusic className='icon-margin'></LibraryMusic>} Album
                </MuiAccordionSummary>
                <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                  <div>
                    {demoSong.albumName}
                  </div>
                  <img height='100px' width='auto' src={demoSong.albumImage}/>
                </MuiAccordionDetails>
              </MuiAccordion>
            </Grid>
          </Grid>
        </div>
        <div className='paragraph-padding'>
          {recording && 'Audio is recording, please wait'}
        </div>
        <div className='paragraph-padding'>
        {!recording && 'click to start recording'}
        </div>
        {recording &&
          <Fab sx={{ bgcolor: inverseMode }} variant='circular'>
            <img height='40px' width='auto' src='https://northshorecenter.org/nscpa_2020/wp-content/plugins/dkddi-events-addon/images/balls.gif'/>
          </Fab>}
        <div style={{marginTop: '10px'}}>
          {!recording && <Fab sx={{ bgcolor: inverseMode }} variant='circular' onClick={start}><MusicNote sx={{ color: iconColors }}></MusicNote></Fab>}
          <br></br>
          <br></br>
          <Button sx={{ bgcolor: mainBg, boxShadow: 0, disableFocusRipple:'true', disableRipple: 'true', height:'20px' }} onClick={handleDemo}></Button>
        </div>
      </div>
    );
  } else {

  return (
    <div className="page-body">
      <Typography
    variant="h2">SongFinder</Typography>

      <div>
        <Grid container>
          <Grid item xs = {0} md = {4}></Grid>
          <Grid item xs ={12} md = {4}>
            <MuiAccordion sx={{ bgcolor: iconColors }} expanded={true} >
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }}>{<MusicNote className='icon-margin'></MusicNote>} Song Name
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode}}>
                {song}
              </MuiAccordionDetails>
            </MuiAccordion>

            <MuiAccordion sx={{ bgcolor: iconColors }}>
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Person className='icon-margin'></Person>} Artist
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
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<Lyrics className='icon-margin'></Lyrics>} Lyrics
              </MuiAccordionSummary>
              <MuiAccordionDetails sx={{ bgcolor: inverseMode }}>
                <div id='lyrics'>
                  {getLyrics()}
                </div>
              </MuiAccordionDetails>
            </MuiAccordion>

            <MuiAccordion sx={{ bgcolor: iconColors }}>
              <MuiAccordionSummary sx={{ bgcolor: inverseMode }} expandIcon={<ExpandMoreIcon/>}>{<LibraryMusic className='icon-margin'></LibraryMusic>} Album
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
      <div className='paragraph-padding'>
        {recording && 'Audio is recording, please wait'}
      </div>
      <div className='paragraph-padding'>
      {!recording && 'click to start recording'}
      </div>
      {recording &&
        <Fab sx={{ bgcolor: inverseMode }} variant='circular'>
          <img height='40px' width='auto' src='https://northshorecenter.org/nscpa_2020/wp-content/plugins/dkddi-events-addon/images/balls.gif'/>
        </Fab>}
      <div style={{marginTop: '10px'}}>
        {!recording && <Fab sx={{ bgcolor: inverseMode }} variant='circular' onClick={start}><MusicNote sx={{ color: iconColors }}></MusicNote></Fab>}
        <br></br>
        <br></br>
        <Button sx={{ bgcolor: mainBg, boxShadow: 0, disableFocusRipple:'true', disableRipple: 'true', height:'20px' }} onClick={handleDemo}></Button>
      </div>
    </div>
  );
      };
};

export default SongFinder;
