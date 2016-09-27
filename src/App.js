import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  componentDidMount() {
    var options = {
     // mode:"no-cors", 
      method:"GET",
      headers: new Headers(
          //{"Content-Type": "application/zip"}
      )
    }
    var url = "http://www.caltrain.com/Assets/GTFS/caltrain/Caltrain-GTFS.zip"
    url = "https://github.com"
    fetch(url, options)
    .then((data)=>{
      console.log(data)
    })     
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
