import React, { Component } from 'react';
import logo from './logo.svg';
import Clock from './clock'
import Toggle from './toggle'
import LoginControl from './conditionRender2'
import Page from './conditionRender3'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Clock />
        <p>
          <Toggle />
        </p>
        <div>
         <Page />
        </div>
        <div>
          <LoginControl />
        </div>
      </div>
    );
  }
}

export default App;
