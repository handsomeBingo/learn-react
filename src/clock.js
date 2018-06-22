/*
* 在类中添加生命周期方法
* 在一个具有许多组件的应用程序中，在组件被销毁时释放所占用的资源是非常重要。
* 当Clock第一次渲染到DOM时，我们要设置一个定时器。这在React中被称为 挂载 （mounting）
*
* 当Clock产生的DOM被销毁时，我们也想清除该定时器。这在React 中被称为 卸载 （unmounting）
*
* 当组件挂载和卸载时，我们可以在组件类上声明特殊的方法，这些方法被称为生命周期钩子。
* componentDidMount 钩子在组件输出被渲染到DOM之后运行（相当于vue的mounted）
*
*
*
* */


/*
* 正确的使用state
* 关于state有三件事你应该知道
*
* 1. 不要直接修改state   // 唯一可以分配 this.state 的地方是构造函数
* this.state.comment = 'hello' // 这样做将不会重新渲染一个组件
*
* 2. state更新可能是异步的
* react 为了优化性能，有可能会将多个setState() 调用合并为一次更新。因为this.props 和this.state可能是异步更新的，你不能依赖他们的值计算下一个state
*  this.setState
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
  componentDidMount() {
    this.timerId = setInterval(() => this.tick(), 1000)
  }
  componentWillUnMount() {
    clearInterval(this.timerId)
  }
  tick() {
    this.setState({
      date: new Date()
    })
  }
  render() {
    return (<div>
      <h1>Hello, world!</h1>
      <h2>it is {this.state.date.toString()}</h2>
    </div>)
  }
}

export default Clock;
