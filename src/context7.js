import React, {Component} from 'react'

// 高阶组件中的Context
// 某些类型的context被许多组件（例如theme或localization）使用。使用 <Context.Consumer>标签显示的封装每个依赖项是冗余的。这里高阶组件 可以帮我们解决

// 例如，按钮可能会使用一个 主题 （theme） context，如下

const ThemeContext = React.createContext('light');

class ThemedButton extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <ThemeContext.Consumer>
        {
          theme => <button className={theme} {...this.props}>someText</button>
        }
      </ThemeContext.Consumer>
    )
  }
}

// 对于少量的组件来说，我们是可以这样的，但是如果我们想在很多地方使用 theme context呢？
// 我们可以创建一个withTheme的高阶组件：

const ThemeContext = React.createContext('light');

// this function takes a component ..

export function withTheme (Component) {
  // ... and returns another component ...

  return function ThemedComponent(props) {
    // and renders the wrapped component with the context theme！
    // Notice that we pass through any additional props as well
    return (
      <ThemeContext.Consumer>
        {
          theme => <Component {...props} theme={theme}></Component>
        }
      </ThemeContext.Consumer>
    )
  }
}

// 现在，任何依赖 theme context的组件都可以使用我们创建的 withTheme 函数轻松订阅它：（柯里化函数）
function Button({theme, ...rest}) {
  return <button className={theme} {...rest}>someText</button>
}

const ThemedButton = withTheme(Button)


// 转发Refs给context Consumer
// 渲染prop（属性）API 的一个问题是refs不会自动传递给封装元素。为了解决这个问题，使用React.forwardRef:

// fancy-button.js
class FancyButton extends Component {
  focus () {
    // ...
  }

  // ...

  //
}

export default React.forwardRef((props, ref) => (
  <ThemeContext.Consumer>
    {
      theme => (
        <FancyButton {...props} theme={theme} ref={ref}></FancyButton>
      )
    }
  </ThemeContext.Consumer>
))

// app.js(引用)

// import FancyButton from './fancy-button'

const ref = React.createRef();

// Our ref will point to the FancyButton component,
// And not the ThemeContext.Consumer that wraps it,
/// This means we can call FancyButton methods lit ref.current.focus()
// 我们的ref将会指向FancyButton组件而非包裹它的 ThemeContext.Consumer，这意味着我们可以调用FancyButton的方法
<FancyButton ref={ref} onClick={handleClick}>
  ClickMe
</FancyButton>

// 告诫

// 因为context使用引用标识来确定何时重新渲染，当Provider的父节点重新渲染时，有一些陷阱可能触发Consumer无意渲染。例如，下面的代码将在每次Provider重新渲染时，会重新渲染所有Consumer，因为总是为value创建一个新对象？？？为啥创建一个新对象？

class App3 extends Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
      <Provider value={{something: 'something'}}>
        <Toolbar />
      </Provider>
    )
  }
}

// 为了防止这样，提升value到父节点的state中：

class App4 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: {something: 'something'}
    }
  }

  render () {
    return (
      <Provider value={this.state.value}>
        <Toolbar />
      </Provider>
    )
  }

}