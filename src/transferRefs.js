import React, {Component} from 'react'

// 转发Refs
// ref转发是一种自动将ref通过组件传递给子组件的技术。对于应用程序中的大多数组件，这通常不是必需的。但是它对某些组件很有用，特别是在可重用的组件库中

// 转发refs给DOM组件

// 考虑一个渲染原生button DOM元素的FancyButton组件：

function FancyButton(props) {
  return (
    <button className="FancyButton">
      {props.children}
    </button>
  )
}

// React 组件隐藏他们的实现细节，包括他们的渲染输出。使用FancyButton的其他组件通常不需要获得ref到内部button DOM元素。这很好，因为它可以防止组件过多依赖彼此的DOM结构。

// Ref转发是一种选择性加入的功能，可让某些组件接受他们收到的ref，并将向下传递给孩子。

// 在下面的例子中，FancyButton使用React.forwardRef来获取传递给它的ref，然后将其转发给它渲染的DOM button：

const FancyButton2 = React.forwardRef((props, ref) => (
  <button ref={ref} className="FancyButton">{props.children}</button>
));

// you can now get a ref directly to the DOM button

const ref = React.createRef();

<FancyButton2 ref={ref}>ClickMe!</FancyButton2>

// 通过这种方式，使用FancyButton的组件可以获得底层button DOM节点的引用并在必要时访问它-就像他们直接使用DOM button 一样。

// 一下是对上述示例中发生情况逐步的说明：

// 1. 我们通过调用React.createRef 创建一个React ref并将其分配给ref变量。
// 2. 通过将ref变量传递给指定ref为jsx属性的 <FancyButton ref={ref}>。
// 3. React 将ref传递给forwardRef中的 (props, ref) => ... 作为第二个参数。
// 4. 我们将这个ref参数转发到指定ref为jsx属性的 <button ref={ref}>。
// 5. 当附加ref时，ref.current 将指向 <button > DOM节点

// 注意：
// 第二个ref参数仅在使用React.forwardRef()调用定义组件时才存在。常规函数或类组件不接收ref参数，而且props也不提供ref
// ref 转发不限于DOM组件。您也可以将refs转发给类组件实例。

// 在高阶组件中转发refs

// 该技术对于 高阶组件 也特别有用