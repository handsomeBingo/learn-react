import React, {Component} from 'react'

// 在生命周期方法中访问Context

// 在生命周期房中访问 context 值是一种相对常见的用例。不是将context添加到每个生命周期方法中，你只需要将它作为props，然后像使用props一样使用它即可。

class Button extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // ThemeContext value is this.props.theme
  }

  componentDidUpdate(prevProps, prevState) {
    // Previous ThemeContext value is prevProps.theme
    // New ThemeContext value is this.props.theme
  }

  render () {
    const {theme, children} = this.props;
    return (
      <button className={theme ? 'dark' : 'light'}>
        {children}
      </button>
    )
  }
}

/* 应用 */
// 就是说以后如果想在生命周期的钩子里使用这些context的值，组件就要在导出的时候包装一层函数？这和引用的时候调用Consumer有啥区别呢？难道以后引用这个玩意儿要这么写？其实这是个误解，下面那个 export
/*import Button from 'button'

class SthApp extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    const ThemedButton = Button(this.props)

    return (
      <ThemeContext.Provider value={this.state.theme}>
        <ThemedButton />
      </ThemeContext.Provider>
    )
  }
}*/

export default props => {
  <ThemeContext.Consumer>
    {
      theme => <Button {...props} theme={theme}>SomeText</Button>
    }
  </ThemeContext.Consumer>
}