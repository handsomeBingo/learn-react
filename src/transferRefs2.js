import React, {Component} from 'react'

// 该技术对于高阶组件也被成为HOC 也特别有用。让我们从一个HOC示例开始，将左键props记录到控制台：

function logProps(wrappedComponent) {
  class LogProps extends Component {
    componentDidUpdate (prevProps) {
      console.log(`old props:  ${prevProps}`);
      console.log(`new props: ${this.props}`);
    }

    render () {
      return (
        <WrappedComponent {...this.props} />
      )
    }
  }

  return LogProps
}

/*________________________________________________________*/

class FancyButton extends Component {
  focus() {
    // ...
  }
  // ...
}

export default logProps(FancyButton)

// 上面的例子有一个警告：refs不会通过。那是因为refs不会通过。那是因为ref不是props（属性）。像key一样它的处理方式与React不同。如果你添加一个ref到hoc，这个ref将引用最外面的容器组件，而不是包裹的组件。这意味着打算给FancyButton组件的refs实际上被附加到LogProps组件：

/*_____________________________________________________*/

import FancyButton from './FancyButton'

const ref = React.createRef()

// the FancyButton component we imported is the LogProps HOC.
// Even though the rendered output will be the same,
// Our ref will point to LogProps instead of the inner FancyButton component
// This means we can't call e.g. ref.current.focus()

let b = <FancyButton label = "Click me"
                     handleClick = {() => {}}
                     ref = {ref}/>

// 幸运的是，我们可以使用React.forwardRef() API 明确地将ref转发到内部的FancyButton组件。 React.forwardRef 接受一个渲染函数，该函数接收props和ref参数，并返回一个React节点。例如：

function logProps(Component) {
  class LogProps extends React.Component {
    componentDidUpdate(prevProps) {
      console.log(prevProps)
      console.log(this.props)
    }

    render () {
      const {forwardRef, ...rest} = this.props;
      return <Component ref={forwardRef} {...rest}></Component>
    }
  }

  return React.forwardRef((props, ref) => {
    return <LogProps {...props} forwardRef={ref} />
  })
}

// 在DevTool中显示一个自定义名称
// React.forwardRef接受渲染函数。React DevTools使用此函数来确定要为ref转发组件显示什么内容。

// 例如，以下组件将在DevTool显示为ForwardRef：

const WrappedComponent = React.forwardRef((props, ref) => {
  return <LogProps {...props} forwardRef = {ref}></LogProps>
})

// 如果你想要命名渲染函数，DevTools也将包含其名称（例如：“ForwardRef(myFunction)”）:

const WrappedComponent = React.forwardRef(
  function myFunction(props, ref) {
    return <LogProps {...props} forwardRef={ref}></LogProps>
  }
)

// 你甚至可以设置函数订的displayName 属性来包含你的包裹的组件。

function logProps(Component) {
  class LogProps extends React.Component {
    // ...
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardRef = {ref}></LogProps>
  }

  // Give this component a more helpful display name in DevTools.
  // e.g. "forwardRef(logProps(MyComponent))"
  const name = Component.displayName || Component.name
  forwardRef.displayName = `logProps${name}`
  return React.forwardRef(forwardRef);

}
