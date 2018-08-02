import React, { Component } from 'react';
import logo from './logo.svg';
import Clock from './clock'
import Toggle from './toggle'
import LoginControl from './conditionRender2'
import Page from './conditionRender3'
import NumberList from './listAndKyes2'
import NameForm from './form1'
import EssayForm from './form2'
import FlavorForm from './form3'
import Reservation from './form5'
import Calculator from './stateLifting1'
import Calculator2 from './stateLifting2'
import WelcomeDialog from './combinationAndInherits1'
import Contacts from './Contacts'
import Chat from './Chat'
import SplitPane from './combinationAndInhreits2'
import SignUpDialog from './combinationAndInherits3'
import ButtonWithTheme from './context2'
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
        <div>
          <ul>
            <NumberList numbers={[1, 2, 3, 4, 5]}/>
          </ul>
        </div>
        <div>
          <NameForm />
        </div>
        <hr/>
        <div>
          <EssayForm />
        </div>
        <div>
          <FlavorForm />
        </div>
        <hr/>
        <div>
          <Reservation />
        </div>
        <hr/>

        <div>
          <Calculator />
        </div>
        <div>
          <Calculator2 />
        </div>
        <div>
          <WelcomeDialog />
        </div>
        <hr/>
        <div>
          <SplitPane left={<Contacts />}  right={<Chat />} />
        </div>
        <div>
          <SignUpDialog />
        </div>
        <div>
          <ButtonWithTheme theme="heieheei" />
        </div>
      </div>
    );
  }
}

export default App;
