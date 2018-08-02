import React, {Component} from 'react'
// 上下文 Context

// 在典型的React应用程序中，数据通过props自上而下（父到子）传递，但对于应用程序中许多组件所需的某些类型的props（例如环境偏好，UI主题），这可能很麻烦。上下文（Context）提供了在组件之间共享这些值得方法，而不必在树的每个层级显示的传递一个prop。

// 1.何时使用Context

// Context 旨在共享一个组件树内可被视为“全局”的数据，例如当前经过身份验证的用户，主题或首选语言等。例如，在下面的代码中，我们通过一个“theme”属性（prop）来手动创建Button组件的样式：

class Button extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <button style="background: {this.props.theme}"></button>
    )
  }
}

class ThemeButton extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <Button theme={this.props.theme}></Button>
    )
  }
}

class Toolbar extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <ThemeButton theme={this.props.theme} />
    )
  }
}

class App extends Component {
  render () {
    return (
      <Toolbar theme="black"></Toolbar>
    )
  }
}
// 例如上面这样，Toolbar组件必须获得一个额外的theme prop，并且将其传递给 ThemeButton。如果每个按钮都需要这样一个theme的话，我们不得不传遍整个组件树。

// 这种情况下我们就该使用context了，避免通过中间元素props
// context 赋予了我们将数据传遍整个组件树的能力，而不用显示的通过每个组件传递。

