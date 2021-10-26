import React, { useState,useRef,useEffect } from 'react';
import './App.css';
import Colors from './Colors';
import { Card, Button } from 'react-bootstrap'

/*
  1. Display initial page with capture mood - captureImagePage is true
  2. Receive Emotions from backend, set capureImagePage to false, set emotionPage to True and render that page
*/

function App() {
  const [picture,setPicture] = useState(null);
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const [hasPhoto, setHasPhoto] = useState(false);
  const getVideo = () => {
    navigator.mediaDevices
    .getUserMedia({
      video: {width: 1920, height: 1080}
    })
    .then(stream => {
      let video = videoRef.current;
      video.srcObject = stream;
      video.play();
    })
    .catch(err => {
      console.error(err);
    })
    ;
  }

  const takePhoto = () => {
    const width = 414;
    const height = width / (16/9);
    let video = videoRef.current;
    let photo = photoRef.current;
    photo.width = width;
    photo.height = height;
    let ctx = photo.getContext('2d');
    ctx.drawImage(video, 0,0,width,height);
    setPicture(photoRef.current.toDataURL('image/png'));
    setHasPhoto(true);
    const data = new FormData();
    data.append('img',photoRef.current.toDataURL('image/png'));

    const requestOptions = {
      method: 'POST',
      body: data,
    };

    fetch('http://f9ec-162-242-91-65.ngrok.io/pic', requestOptions)
        .then(response => response.json())
        .then(data => {
          console.log(data);
    });
  }

  useEffect(() => {
    getVideo();
  },[videoRef]);

  return (
    <div className="App">
        <div className = "camera">
          <video ref={videoRef}></video>
          <Button size="lg" onClick={takePhoto}> SNAP!</Button> {' '}
        </div>
        <div className={"result" + (hasPhoto ? 'hasPhoto' :'')}>
          <canvas ref={photoRef}></canvas>
        </div>
    </div>
  );
}


export default App;
