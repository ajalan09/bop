import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function App() {
  const [picture,setPicture] = useState('');
  let fileSelectedHandler = (event) => {
    setPicture(event.target.files[0]);
    // picture = event.target.files[0]
  }

  let sendPictureToBackend = (e) => {
    /*if(picture === ''){
    }*/
    e.preventDefault();
    /*const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(picture)
    };
    fetch('https://localhost3000/bop', requestOptions)
        .then(response => response.json())
        .then(data => setPostId(data.id));*/
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input type="file" onChange={fileSelectedHandler}/>
        <button onClick={sendPictureToBackend}> Upload Picture </button>
      </header>
    </div>
  );
}

export default App;
