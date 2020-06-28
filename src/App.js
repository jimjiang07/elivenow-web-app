import React from 'react';
import logo from './logo.svg';
import Button from "./components/Button";
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>
          <Button>Hello, Storybook!</Button>
        </p>
      </header>
    </div>
  );
}

export default App;
