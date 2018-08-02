import React, {Component} from 'react'
// 上下文 Context


// 为当前theme创建一个context 默认值light

const ThemeContext = React.createContext('light');

class ButtonWithTheme extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    // 用一个Provider 将当前的theme传递给下面的树
    // 任何组件，无论多深都能读到这个这个值
    // 本例中，我们将 'dark'作为当前值传递过去
    return (
      <ThemeContext.Provider value={this.props.theme}>
        <Toolbar />
      </ThemeContext.Provider>
    )
  }
}

// 如此一来，在中部的组件无须将theme显式的传递
class Toolbar extends Component {
  render () {
    return (
      <div>
        <ThemeContext.Consumer>
          {
            theme => <h1>{theme}</h1>
          }
        </ThemeContext.Consumer>
        <ThemeButton he="hello"  wo="world" />
      </div>
    )
  }
}

// 使用Consumer读取当前的 theme context；
// React将会查找最近的theme Provider并使用它的值；
// 在本例中，当前theme 值是dark

class ThemeButton extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <ThemeContext.Consumer>
        {
          theme => <button {...this.props}>{theme}</button>
        }
      </ThemeContext.Consumer>
    )
  }
}

export default ButtonWithTheme