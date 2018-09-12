import React, {Component} from 'react'

// Refs提供了一种访问在render方法中创建DOM节点或React元素的方式。
// 在常规的React数据流中，props是父组件与子组件交互的唯一方式。要修改子元素，你需要用新的props去重新渲染子元素。然而，在少数情况下，你需要在常规数据流外轻质修改子元素。被修改的子元素可以是React组件实例，或者是一个DOM元素。在这种情况下，React提供了解决办法。说白了就是React提供的操作dom的方法了

// 何时使用Refs

// 1 处理focus、文本选择或者媒体播放
// 2 触发强制动画
// 3 集成第三方DOM库

// 如果可以通过声明式实现，就要避免使用refs。例如，相比于在Dialog组件中暴露open()和close()方法，最好传递isOpen属性。

// 创建refs

//使用 React.createRef()创建refs，通过ref属性来获得React元素。当构造组件时，refs通常被赋值给实例的一个属性，这样你可以在组件中任意一处使用它们

class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render () {
    return (
      <div ref={this.myRef} />
    )
  }
}

// 访问refs

// 当一个ref属性被传递给一个render函数中的元素时，可以使用ref中的current属性对节点的引用进行访问。
const node = this.myRef.current;

// ref 的值取决于节点类型：
// 1. 当ref属性被用于一个普通HTML元素时，React.createRef()将接受底层DOM元素作为它的current属性以创建ref。
// 2. 当ref属性被用于一个自定义类的组件时，ref对象将接收该组件已挂载的实例作为他的current ??? 这是什么意思？
// 3. 你不能在函数式组件上使用ref属性，因为他没有实例。

// 示例： 在dom元素上添加ref

class CustomTextInput extends Component {
  constructor(props) {
    super(props);
    // create a ref to store the textInput DOM element
    this.textInput = React.createRef();
    this.focusTextInput = this.focusTextInput.bind(this);
  }

  focusTextInput () {
    // explicitly focus the text input using the raw DOM API
    // Note: we're accessing "current" to get the DOM node
    this.textInput.current.focus();
  }

  render () {
    // tell React that we want to associate the <input> ref
    // with the 'textInput' that we create in the constructor
    return (
      <div>
        <input type="text"
               ref={this.textInput}/>

        <input type="button" value="Focus the text input" onClick={this.focusTextInput} />
      </div>
    )
  }
}

// React 组件在加载时将DOM元素传入ref的回调函数，在卸载时会传入null。在componentDidMount 或 componentDidUpdate 这些生命周期回调之前执行ref回调

// 为类组件添加ref

// 如果我们想要包装上面的CustomTextInput，来模拟挂载之后立即被点击的话，我们可以使用ref来访问自定义输入，并手动调用它的 focusTextInput 方法

class AutoFocusTextInput extends Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount () {
    this.textInput.current.focusTextInput();
  }

  render () {
    return (
      <CustomTextInput ref={this.textInput} />
    )
  }
}

// Refs与函数式组件
// 如果你需要使用ref，你需要将组件转化成 class 组件，就像需要声明周期方法或者state一样

// 然而你可以在函数式组件内部使用ref来引用一个DOM元素或者类组件：

function CustomTextInput2(props) {
  // textInput 必须在这里声明，所以ref回调可以引用它
  let textInput = null;

  function handleClick() {
    textInput.focus();
  }

  return (
    <div>
      <input type="text"
             ref={ (input) => {textInput = input} }/>

      <input type="button"
             value="Focus the text input"
             onClick={handleClick}
      />
    </div>
  )
}

// 上面两个例子说的是两件事情，一个是是在函数式组件上使用ref来引用这个函数式组件，这是不可行的了。另一个是在函数式内部使用ref来引用某一个元素或者其他的类组件。

// 对父组件暴露DOM节点

// 在极少数情况下，你可能希望从父组件访问子节点的DOM节点。通常不建议这样做，因为它会破坏组件的封装，但偶尔也可以用于触发焦点或测量子DOM节点的大小或位置。
// 虽然你可以向子组件添加ref，但这不是一个理想的方案，因为你只能或者组件实例而非DOM节点。并且，它还在函数式组件上无效。

// 如果你使用React 16.3 或更高，这种情况下我们推荐使用ref转发。ref转发使组件可以像暴露自己的ref一样暴露子组件的ref。关于怎样暴露子组件的DOM节点，

// 如果你使用React 16.2 或更低，或者你需要比ref转发更高的灵活性，你可以使用替代方案，将ref作为特殊名字将prop直接传递。

// 可能的话，我们不建议暴露DOM节点，但有时候它会成为救命稻草。注意这些方案需要你在子组件中增加一些代码。如果你对子组件的实现没有控制权的话，你剩下的选择是使用findDOMNode()，但不推荐

// 回调Refs

// react 也支持另一种设置ref的方式，成为 “回调ref”，更加细致的控制何为ref被设置和解除。
// 不用于传递 createRef() 创建的ref属性，你会传递一个函数。这个函数接收React组件的实例或HTML DOM元素作为参数，以存储它们并使它们能被其他地方访问。

class CustomTextInput3 extends Component {
  constructor(props) {
    super(props);
    this.textInput = null;

    this.setTextInputRef = element => {
      this.textInput = element
    };

    this.focusTextInput = () => {
      // 直接使用原生Api 使text输入框获得焦点
      if (this.textInput) this.textInput.focus()
    };
  }

  componentDidMount() {
    this.focusTextInput()
  }

  render () {
    // 使用ref的回调将text输入框的DOM节点存储到React 实例上 this.textInput
    // 这里在访问的时候不用像上面似的需要使用current
    return (
      <div>
        <input type="text"
               ref={this.setTextInputRef}/>
        <input type="button" value="Focus the text input" onClic={this.focusTextInput} />
      </div>
    )
  }
}

// React 将在组件挂载时将DOM元素传入ref回调并调用，当卸载时传入null并调用它。ref回调函数会在componentDidMount和componentDidUpdate生命周期函数前被调用

// 你可以在组件间传递回调形式的refs，就像你可以通过React.createRef() 创建的对象refs一样。

function CustomTextInput4(props) {
  return (
    <input type="text" ref={props.inputRef} />
  )
}

class Parent extends Component {
  render() {
    return <CustomTextInput4 inputRef={ el => this.inputElement = el }/>
  }
}