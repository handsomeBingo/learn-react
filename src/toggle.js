import React, { Component } from 'react'

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isToggleOn: true
    };

    // 这个绑定是必要的，使this在回调中起作用
    //this.handleClick = this.handleClick.bind(this);
  }

  handleClick(id, e) {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn
    }))
    console.log(e)
  }

  render() {
    return <button onClick = {this.handleClick.bind(this, 1)}>
      {this.state.isToggleOn ? 'ON' : 'OFF'}
    </button>
  }
}

export default Toggle;

// 在jsx回调中你必须注意this的指向。在JavaScript中，类的方法默认是没有绑定的。如果你忘记绑定this.handleClick并将其传递给onClick，那么在直接调用该函数时，this会是undefined。此外，你还可以以下两种方式解决这个问题

// 使用属性初始值来正确地绑定（bind）回调

class LoggingButton extends Component {
  constructor(props) {
    super(props);
  }
  handleClick = () => {
    console.log(`this is ${this}`);
  }

  render() {
    return (
      <button onClick={this.handleClick}>
        Click me!
      </button>
    )
  }
}

// 如果没有使用属性初始化语法，可以在事件监听器回调中使用一个箭头函数

class logoutButton extends Component {
  constructor(props) {
    super(props)
  }
  handleClick() {
    console.log(`this is ${this}`);
  }

  render() {
    // 这个语法对的问题是，每次LogoutButton渲染时都创建一个不同的回调函数。在多数情况下，没什么问题。然而，如果这个回调被作为prop属性传递给下级组件，这些组件可能需要额外的重复渲染，我们通常建议在构造函数中进行绑定，以避免这类性能问题。
    return (
      <button onclick={(e) => {this.handleClick(e)}}> Click to logout</button>
    )
  }
}

// 将参数传递给事件处理程序

// 在循环内部，通常要将一个额外的参数传递给事件处理程序。例如，id是一个内联id，则以下任意一个方式都可以正常工作：

class DeleteButton extends Component {
  constructor(props) {
    super(props)
  }

  deleteRow(id) {
    console.log(id)
  }

  render() {
    return (
      <div>
        <button onClick={(e) => this.deleteRow(this.props.id, e)}>删除</button>
        <button onClick={this.deleteRow.bind(this, this.props.id)}>删除</button>
      </div>
    )

  }


}