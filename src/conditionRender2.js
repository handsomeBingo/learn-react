import React, {Component} from 'react'
import Greeting from './conditionRender1'
class LogginButton extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <button onClick={this.props.onClick}>Login</button>
    )
  }
}

class LogoutButton extends Component {
  constructor(props) {
    super(props)
  }
  render () {
    return (
      <button onClick={this.props.onClick}>Logout</button>
    )
  }
}

class LoginControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
    this.handleLoginClick = this.handleLoginClick.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleLoginClick() {
    this.setState({
      isLoggedIn: true
    })
  }
  handleLogoutClick() {
    this.setState({
      isLoggedIn: false
    })
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;

    let button = null;
    if (isLoggedIn) {
      button = <LogoutButton onClick={this.handleLogoutClick} />;
    } else {
      button = <LogginButton onClick={this.handleLoginClick} />;
    }

    return (
      <div>
        <Greeting isLoggedIn={isLoggedIn} />
        {button}
      </div>
    )
  }
}

export default LoginControl