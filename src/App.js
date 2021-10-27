import React, { useState,useRef,useEffect } from 'react';
import './App.css';
import Colors from './Colors';
import { Card, Button } from 'react-bootstrap'

/*
  1. Display initial page with capture mood - captureImagePage is true
  2. Receive Emotions from backend, set capureImagePage to false, set emotionPage to True and render that page
*/

let emo = null;
let picture = null;

function App() {
  const [state1,setState1] = useState(true);

  const [hasPhoto, setHasPhoto] = useState(false);
  const videoRef = useRef(null);
  const photoRef = useRef(null);

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
    setHasPhoto(true);

    const formData = new FormData();
    formData.append('img',photoRef.current.toDataURL('image/png'));
    picture = new Image();
    picture.src = photoRef.current.toDataURL('image/png');
    console.log(picture);

    /*const requestOptions = {
      method: 'POST',
      body: formData,
    };

    fetch('http://abfa-162-242-91-65.ngrok.io/pic', requestOptions)
        .then(response => response.json())
        .then(data => {
          emo = JSON.stringify(data['emotion']);
          setState2(true);
          setState1(false);
    });*/
  }

  useEffect(() => {
    if(state1 === true){
      getVideo();
    }
  },[videoRef]);

    return (
      <div className="App">
        {!hasPhoto ? 
          <div>
            <div className = "camera">
                <video ref={videoRef}></video>
                <Button size="lg" onClick={takePhoto}> SNAP!</Button>
            </div> 
            <div className={"result" + (hasPhoto ? 'hasPhoto' :'')}>
              <canvas ref={photoRef}></canvas>
            </div>
          </div>
        : 
          <div>
            <img src = {picture.src} /> 
            <p>Your emotions are</p>
            <div>{emo}</div>
          </div>
        }
      </div>
    );
}


export default App;
