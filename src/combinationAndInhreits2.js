import React, {Component} from 'react'

// React 具有强大的组合模型，我们建议使用组合而不是继承来复用组件之间的代码。

// 包含关系

// 一些组件不能提前知道它的子组件时什么。这对于Sidebar和Dialog 这类通用容器尤其常见。
// 我们建议这些组件使用children属性姜子元素直接传递到输出。
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

// 这样做还匀速其他组件通过嵌套jsx来传递子组件

class WelcomeDialog extends Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <FancyBorder color="blue">
                <h1 className="Dialog-title">
                    Welcome
                </h1>
                <p className="Dialog-message">
                    Thank you for visiting our spacecraft!
                </p>
            </FancyBorder>
        )
    }
}

//export default WelcomeDialog

// <FancyBorder> jsx标签内的任何内容都将通过children属性传入FancyBorder。由于FancyBorder在一个<div>内渲染了{this.props.children},所以被传递的所有元素都会出现在最终输出中。
// 虽然不太常见，但有时候你可能需要在组件中有多个入口，这种情况下呢可以使用过自己约定的属性而不是children：


class SplitPane extends Component {
  constructor (props) {
      super(props)
  }

  render () {
    return (
      <div className="SplitPane">
        <div className="SplitPane-left">
          {this.props.left}
        </div>
        <div className="SplitPane-right">
          {this.props.right}
        </div>
      </div>
    )
  }
}

export default SplitPane
