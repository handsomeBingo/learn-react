import React, { Component } from 'react'

// 特殊示例

// 有时我们会认为组件是其他组件的特殊实例。例如，我们会说WelcomeDialog是Dialog的特殊实例
// 在 React中，这也是通过组合实现的，通过配置属性用较特殊的组件来渲染较通用的组件。

class FancyBorder extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    return (
      <div className={'FancyBorder-FancyBorder-' + this.props.color}>
        {this.props.children}
      </div>
    )
  }
}

class Dialog extends Component {
  constructor (props) {
      super(props)
  }
  render() {
    return (
      <FancyBorder color="blue">
        <h1 className="Dialog-title">
          {this.props.title}
        </h1>
        <p className="Dialog-message">
          {this.props.message}
        </p>
        {this.props.children}
      </FancyBorder>
    )
  }
}

class WelcomeDialog extends Component {
  render() {
    return <Dialog title="Welcome" message="Thank you for visiting our spacecraft!" />
  }
}

class SignUpDialog extends Component {
  constructor (props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = {login: ''};
  }

  handleChange(e) {
    this.setState({
      login: e.target.value
    })
  }

  handleSignUp(e) {
    alert(`Welcome aboard, ${this.state.login}!`)
  }

  render() {
    return (
      <Dialog title="Mars Exploration Program">
        <input type="text" value={this.state.login} onChange={this.handleChange}/>
        <button onClick={this.handleSignUp}>SignUp</button>
      </Dialog>
    )
  }
}

export default SignUpDialog