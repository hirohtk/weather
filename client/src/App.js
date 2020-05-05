import React from 'react';
import logo from './logo.svg';
import Animation from "./components/animation"
import Nav from "./components/nav"
import CurrentWeather from "./components/currentWeather"
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <div className="container">
          <div className="row">
            <Animation></Animation>
            <div className="boxForEverything">
            <CurrentWeather></CurrentWeather>
            </div>
          </div>
        </div>
    </div>
  );
}

export default App;
