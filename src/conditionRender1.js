import React, {Component} from 'react'

class UserGreeting extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return <h1>Welcome back!</h1>
  }
}

class GuestGreetings extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return <h1>Please sign up</h1>
  }
}

class Greeting extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let isLoggin = this.props.isLoggedIn;
    let result;
    if (isLoggin) {
      result = <UserGreeting />;
    } else {
      result = <GuestGreetings />;
    }
    return result
  }
}

 export default Greeting
