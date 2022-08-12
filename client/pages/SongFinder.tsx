import React, { useState, useEffect } from 'react';
import MicRecorder from 'mic-recorder-to-mp3';
import axios from 'axios';

const Mp3Recorder = new MicRecorder({ bitRate: 128});
const SongFinder: React.FC = () => {

  const [isRecording, setIsRecording] = useState(false);
  const [isBlocked, setIsBlocked] = useState(false);
  const [previewSource, setPreviewSource] = useState();
  const [song, setSong] = useState('');

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({audio: true}, 
      () => {
        // console.log('Permission Granted');
        setIsBlocked(true);
      },
      () => {
        // console.log("Permission Denied");
        setIsBlocked(false);
      });


    if (!song.length) {
      axios.post('/songs', {
        data: previewSource,
      })
        .then((results) => {
          setSong(results.data.title);
          console.log('SUCCESS', results)
        })
        .catch((err) => console.error(err));
    }

  });

  const start = () => {
    if (isBlocked) {
      console.log('Permission Denied');
    } else {
      Mp3Recorder.start()
        .then(() => {

          setIsRecording(true);
        })
        .catch((e) => console.error(e));
    }
  };

  const stop = () => {
    Mp3Recorder.stop().getMp3()
      .then(([buffer, blob]) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = async () => {
          setPreviewSource(reader.result);

        };
        setIsRecording(false);
        setSong('');
      })
      .catch((e) => console.log(e));
  };






  return (
    <div>
      <div>Hello SongFinder</div>
      <div>{song}</div>
      <button onClick={start} disabled={isRecording}>RECORD</button>
      <button onClick={stop} disabled={!isRecording}>STOP</button>
      <audio src={previewSource} controls="controls"/>
    </div>
  );
};

export default SongFinder;
