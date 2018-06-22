import React, { Component } from 'react'

class Clock extends Component {
  render () {
    return (<div>
      <h1>Hello, world!</h1>
      <h2>it is {this.props.date.toLocaleDateString()}</h2>
    </div>)
  }
}

export default Clock;

/*
* 把函数式组件转化为类组件
*
* 你可以遵从以下5步，把一个Clock这样的函数式组件转化为类组件：
* 1. 创建一个继承自React.Component类的ES5 class同类名。
* 2. 添加一个名为render()的空方法。
* 3. 把原函数中的所有内容移至render()中。
* 3. 在render()方法中 使用this.props代替props
* 5. 删除保留的空函数声明
*
*
*
* */

/*
* 类允许我们在其中添加本地状态（state）和声明周期钩子。
*
* */

