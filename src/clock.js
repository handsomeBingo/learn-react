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
* // 错误
*  this.setState({
*    counter: this.state.counter + this.props.increment;
*  })
*
*  // 正确
*  this.setState(function (prevState, props) {
*   return {
*     counter: prevState + props.increment
*   }
*  })
*  要弥补这个问题，使用setState()的形式，它接受一个函数而不是一个对象。这个函数将接受前一个状态作为第一个参数，并将更新后的值作为第21个参数？
*
* 3. state更新会被合并
* 当你调用setState() React 将会合并你提供的对象到当前的状态中。
*
* 例如，你的状态可能包含几个独立的变量：
* constructor(props) {
  super(props)
  this.state = {
    posts: [],
    comments: []
    }
  }
* 然后通过调用独立的setState() 分别更新他们
* componentDisMount() {
*   fetchPost().then(response => {
*     this.setState({
*       posts: response.posts
*     })
*   })
*
*   fetchComment().then(response => {
*     this.setState({
*       comments: response.comments
*     })
*   })
* }
*
* 这个例子是再说，我们传递给setState()的对象是将其中的key:value合并进原来state对象。合并时浅合并，所以this.setState({comments})不会改变this.state.posts的值，但会完全替换this.state.comments的值
*
* 数据向下流动
*
* 无论作为父组件还是子组件，它都无法获悉，一个组件是否有状态，同时也不需要关心另一个组件是定义为函数组件还是类组件。所以state被称为本地状态或封装状态。他不能被拥有并且设置它的组件以外的任何组件访问。
*
* 一个组件可以选择将state向下传递，作为其子组件的props
*
* <h2>It is {this.state.date.toLocaleTimeString()}</h2>
*
* 同样适用于用户自定义的组件
*
* <FormattedDate data={this.state.dat} />
*
* FormattedDate 组件通过props接受了date的值，但它仍然不能获知该值是来自于Clock的state还是Clock的props，或者是手动创建的
*
* 这通常被称为一个“从上到下”，或者“单向”的数据流。任何state始终由某个特定的组件所有，并且从该state导出的任何数据或者UI只能影响树 “下方”的组件。
*
* 其实这里的state就是vue的data，不同的是，vue的data属性可以直接修改，而react则不可以。
*
* 如果把组件树想象为一个 props 瀑布，所有的组件state 就如同一个额外的水源汇入主流 ，且只能随着主流的方向向下流动。
*
*
*
*
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
      <p>it is {this.state.date.toLocaleTimeString()}</p>
    </div>)
  }
}

export default Clock;
