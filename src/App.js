import React from 'react';
import logo from './logo.svg';
import Animation from "./components/animation"
import Nav from "./components/nav"
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Nav></Nav>
        <div className="container">
          <div className="row">
            <Animation></Animation>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
