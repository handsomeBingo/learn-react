import React, {Component} from 'react'

// 转发 Refs
// Ref转发是一种自动将ref通过组件传递给子组件的技术。对于应用程序中的大多数组件，这通常是不是必需的。但是，它对于某些组件很有用，特别是在可重用的组件库中。最常见的情况如下所述

// 转发refs给dom组件

// 考虑一个渲染原生button DOM元素的FancyButton组件：

function FancyButton(props) {
  return (
    <button className="FancyButton">
      {
        props.children
      }
    </button>
  )
}
