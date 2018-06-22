/*
 * 在类组件中添加本地状态（state）和生命周期钩子
 * 1. 替换render()方法中的this.props.date为this.state.date
 * 2. 添加一个类构造函数 class constructor 初始化 this.state
 * 3. 注意我们如何将 props 传递给基础构造函数？？？？ 类组件始终使用 props调用基础构造函数。super()??
 *
 * */


import React, { Component } from 'react'

class Clock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    }
  }
  render() {
    return (<div>
      <h1>Hello, world!</h1>
      <h2>it is {this.state.date.toLocaleDateString()}</h2>
    </div>)
  }
}

export default Clock;
